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

    public class WUNSastanciController:ControllerBase
    {
         public WUNContext Context { get; set; }
         private readonly JwtService _jwtService;
        

         public WUNSastanciController(WUNContext context, JwtService jwtService)
         {
             this.Context=context;
             this._jwtService=jwtService;
         }

         [HttpPost]
         [Route("KreirajSastanak")]
         public async Task<IActionResult> KreirajSastanak([FromBody]Sastanak s)
         {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
           
            var stanar=await Context.Stanari.FindAsync(userId);
            if(stanar.Status=="upravnik" || stanar.Status=="admin")
            {
             var zgrada=await Context.Zgrade.FindAsync(1);
             s.ZgradaRef=zgrada;
             Context.Sastanci.Add(s);
             await Context.SaveChangesAsync();
             return Ok(s);
            }
             else
             {
                  return BadRequest(error: new {message= "Niste upravnik ili admin"});
             }

         }
          catch(Exception e){
                   return BadRequest(error: new {message= "Invalid Credentials"});

              }



    }

         [HttpGet]
         [Route("VratiSastanke")]
         public async Task<List<Sastanak>> VratiSastanke()
         {
             return await Context.Sastanci.ToListAsync();
         }

         [HttpDelete]
         [Route("ObrisiSastanak/{id}")]
         public async Task<IActionResult> ObrisiSastanak(int id)
         {
              try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
           
            var stanar=await Context.Stanari.FindAsync(userId);
            if(stanar.Status=="upravnik" || stanar.Status=="admin")
            {
             var sastanak=await Context.Sastanci.FindAsync(id);
             Context.Remove(sastanak);
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
         [Route("GlasajZaSastanak/{idSastanka}")]
         public async Task<IActionResult> GlasajZaSastanak(int idSastanka)
         {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var daLiJeGlasao=await Context.StanariZaSastanak.Where(x=>x.StanarId==userId&&x.SastanakId==idSastanka).FirstOrDefaultAsync();
            if(daLiJeGlasao!=null)
                 return BadRequest(error: new {message= "Vec ste se izjasnili da ste zainteresovani za ovaj sastanak!"});
                 else{ 
                     var sastanak=await Context.Sastanci.FindAsync(idSastanka);
                     sastanak.BrZainteresovanih=sastanak.BrZainteresovanih+1;
                     var noviGlas=new StanarZaSastanak();
                     noviGlas.SastanakId=idSastanka;
                     noviGlas.StanarId=userId;
                     Context.StanariZaSastanak.Add(noviGlas);
              
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
         [Route("GlasajProtivSastanka/{idSastanka}")]
         public async Task<IActionResult> GlasajProtivSastanka(int idSastanka)
         {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var daLiJeGlasao=await Context.StanariNeZaSastanak.Where(x=>x.StanarId==userId&&x.SastanakId==idSastanka).FirstOrDefaultAsync();
            if(daLiJeGlasao!=null)
                 return BadRequest(error: new {message= "Vec ste se izjasnili da ste nezainteresovani za ovaj sastanak!"});
                 else{ 
                     var sastanak=await Context.Sastanci.FindAsync(idSastanka);
                     sastanak.BrNezainteresovasnih=sastanak.BrNezainteresovasnih+1;
                     var noviGlas=new StanarNeZaSastanak();
                     noviGlas.SastanakId=idSastanka;
                     noviGlas.StanarId=userId;
                     Context.StanariNeZaSastanak.Add(noviGlas);
              
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