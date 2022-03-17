using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.dtos;
using backend.Helpers;


namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class WUNPredloziController:ControllerBase
    {
        public WUNContext Context { get; set; }
        private readonly JwtService _jwtService;
        

         public WUNPredloziController(WUNContext context, JwtService jwtService)
         {
             this.Context=context;
             this._jwtService=jwtService;
         }


         [HttpPost]
         [Route("KreirajPredlog")]
         public async Task<Predlog> KreirajPredlog([FromBody] Predlog p)
         {
             var zgrada=await Context.Zgrade.FindAsync(1);
             p.ZgradaRef=zgrada;
             Context.Predlozi.Add(p);
             await Context.SaveChangesAsync();
             return p;

         }

         [HttpGet]
         [Route("VratiPredloge")]
         public async Task<List<PredlogDto>> VratiPredloge()
         {
             var predlozi= await Context.Predlozi.ToListAsync();
             List<PredlogDto> predloziRez=new List<PredlogDto>();
             predlozi.ForEach( predlog=>{
                 var noviPredlog=new PredlogDto();
                 noviPredlog.ID=predlog.ID;
                 noviPredlog.Naslov=predlog.Naslov;
                 noviPredlog.Opis=predlog.Opis;
                 noviPredlog.BrZa=predlog.BrZa;
                 noviPredlog.BrProtiv=predlog.BrProtiv;
                 noviPredlog.DatumObjave=predlog.DatumObjave;
                 Stanar s= Context.Stanari.Find(predlog.idAutora);
                // if(s!=null)
                 noviPredlog.ImeAutora=s.Ime+" "+s.Prezime;
                 predloziRez.Add(noviPredlog);

             });
             return predloziRez;
         }

         [HttpDelete]
         [Route("ObrisiPredlog/{id}")]
         public async Task<IActionResult> ObrisiPredlog(int id)
         {
              try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
           
            var stanar=await Context.Stanari.FindAsync(userId);
            if(stanar.Status=="upravnik" || stanar.Status=="admin")
            {
             var predlog=await Context.Predlozi.FindAsync(id);
             Context.Remove(predlog);
             await Context.SaveChangesAsync();
             return Ok();
            }
            else return BadRequest(error: new {message= "Niste upravnik ili admin"});
              }
              catch(Exception e){
                   return BadRequest(error: new {message= "Invalid Credentials"});

              }
         }

         [HttpPut]
         [Route("GlasajZaPredlog/{idPredloga}")]
         public async Task<IActionResult> GlasajZaPredlog(int idPredloga)
         {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var daLiJeGlasao=await Context.StanariZaPredloge.Where(x=>x.StanarId==userId&&x.PredlogId==idPredloga).FirstOrDefaultAsync();
            if(daLiJeGlasao!=null)
                 return BadRequest(error: new {message= "Vec ste glasali za ovaj predlog"});
                 else{ 
                     var predlog=await Context.Predlozi.FindAsync(idPredloga);
                     predlog.BrZa=predlog.BrZa+1;
                     var noviGlas=new StanarGlasaoZaPredlog();
                     noviGlas.PredlogId=idPredloga;
                     noviGlas.StanarId=userId;
                     Context.StanariZaPredloge.Add(noviGlas);
              
                     await Context.SaveChangesAsync();
                     return Ok();
                }
         
           

            
            }
            
            catch(Exception e)
            {
                return Unauthorized();
            }


         }
          [HttpPut]
         [Route("GlasajProtivPredloga/{idPredloga}")]
         public async Task<IActionResult> GlasajProtivPredloga(int idPredloga)
         {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var daLiJeGlasao=await Context.StanariProtivPredloga.Where(x=>x.PredlogId==idPredloga && x.StanarId==userId).FirstOrDefaultAsync();
            if(daLiJeGlasao!=null)
            {
                 return BadRequest(error: new {message= "Vec ste glasali protiv ovog predloga"});

            }
            else
            {
                 var predlog=await Context.Predlozi.FindAsync(idPredloga);
                     predlog.BrProtiv=predlog.BrProtiv+1;
                     var noviGlas=new StanarGlasaoProtivPredloga();
                     noviGlas.PredlogId=idPredloga;
                     noviGlas.StanarId=userId;
                     Context.StanariProtivPredloga.Add(noviGlas);
              
                     await Context.SaveChangesAsync();
                     return Ok();

            }
             }
            catch(Exception e)
            {
                return Unauthorized();
            }


         }





    }



    
}