/*za troskove treba da:
stanar:
-cita placene racune
-cita neplacene racune
-cita ukupan dug
blagajnik:
-dodaje svim stanarima(stanovima) dug za tekuci mesec(dodaje po jedan neplacen racun)
-uklanja stanu dug za pojedin mesec(oznacava odg racun kao placen)
-cita dugovanja svih stanara(stanova)*/
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
using BCrypt.Net;
using BCrypt;

using backend.Hubs.Clients;
using backend.Hubs;


using Microsoft.AspNetCore.SignalR;



namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class WUNTroskoviController:ControllerBase
    {
         public WUNContext Context { get; set; }
         private readonly JwtService _jwtService;
         private readonly IHubContext<NotificationHub,INotificationClient> _notificationHub;
        
        public WUNTroskoviController(WUNContext context, JwtService jwtService
        ,IHubContext<NotificationHub,INotificationClient> notificationHub)
        {
            this.Context=context;
            this._jwtService=jwtService;
            this._notificationHub=notificationHub;
         
        }

        [HttpGet]
        [Route("PreuzmiSvojePlaceneRacune")]
        public async Task<IActionResult> PreuzmiPlacene()
        {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var stanar=await this.Context.Stanari.FindAsync(userId);
            var stan=await this.Context.Stanovi.Include(s=>s.RacuniRef).Where(s=>s.BrStana==stanar.BrStana).FirstOrDefaultAsync();
           
           // var stanar=await this.Context.Stanari.Include(s=>s.StanRef).ThenInclude(stan=>stan.RacuniRef).FindAsync(userId).;
            return Ok(stan.RacuniRef.Where(r =>r.Status=="placen").ToList());
             }
             catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }
        }

         [HttpGet]
        [Route("PreuzmiSvojeNeplaceneRacune")]
        public async Task<IActionResult> PreuzmiNeplacene()
        {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var stanar=await this.Context.Stanari.FindAsync(userId);
            var stan=await this.Context.Stanovi.Include(s=>s.RacuniRef).Where(s=>s.BrStana==stanar.BrStana).FirstOrDefaultAsync();
           
        
            return Ok(stan.RacuniRef.Where(r =>r.Status=="neplacen").ToList());
             }
             catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }
        }

        [HttpGet]
        [Route("UkupanDug")]
        public async Task<IActionResult> VratiUkupanDug()
        {
              try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
             var stanar=await this.Context.Stanari.FindAsync(userId);
            var stan=await this.Context.Stanovi.Include(s=>s.RacuniRef).Where(s=>s.BrStana==stanar.BrStana).FirstOrDefaultAsync();
           int iznos= stan.IznosDugovanja;
           return Ok(new{
                message =iznos
            });

              }
                 catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }

        }

        [HttpPost]
        [Route("DodajDugZaMesec")]
        public async Task<IActionResult> DodajDugZaMesec([FromBody]MesecniDug m)
        {
              try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
             var stanar=await this.Context.Stanari.FindAsync(userId);
            if(stanar.Status=="blagajnik" || stanar.Status=="admin"){
            var stanovi=await this.Context.Stanovi.Include(s=>s.RacuniRef).ToListAsync();
            stanovi.ForEach(async stan =>{
                var noviRacun=new Racun();
                noviRacun.Iznos=m.Iznos;
                noviRacun.Mesec=m.Mesec;
                noviRacun.Godina=m.Godina;
                noviRacun.Status="neplacen";
                noviRacun.StanRef=stan;
                stan.RacuniRef.Add(noviRacun);
                stan.IznosDugovanja=stan.IznosDugovanja+m.Iznos;
               
            });
             await Context.SaveChangesAsync();
            return Ok();
            }
            else return BadRequest(error: new {message= "Niste blagajnik ili admin"});
              }
              catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }

        }

        [HttpPut]
        [Route("PlatiMesec/{idStana}/{mesec}/{godina}")]

        public async Task<IActionResult> OznaciRacunKaoPlacen(int idStana,string mesec,int godina)
        {

               try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
             var stanar=await this.Context.Stanari.FindAsync(userId);
            if(stanar.Status=="blagajnik" || stanar.Status=="admin"){

                var stan=await this.Context.Stanovi.FindAsync(idStana);
                var racun=await this.Context.Racuni.Where(r=>r.StanRef==stan && r.Mesec==mesec && r.Godina==godina).FirstOrDefaultAsync();
                racun.Status="placen";
                racun.DatumPlacanja=DateTime.Now;
                stan.IznosDugovanja=stan.IznosDugovanja-racun.Iznos;
                await Context.SaveChangesAsync();
                return Ok(racun);


                  }
            else return BadRequest(error: new {message= "Niste blagajnik ili admin"});
              }
              catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }


        }

        [HttpGet]
        [Route("VratiStanSaDugovima/{brStana}")]
        public async Task<IActionResult> VratiStanSaDugovima(int brStana)
        {
            var stan=await this.Context.Stanovi.Include(stan=>stan.RacuniRef).Where(stan=>stan.BrStana==brStana).FirstOrDefaultAsync();
            return Ok(stan);


        }

        [HttpDelete]
        [Route("ObrisiRacune")]
        public async Task<IActionResult> Obrisi()
        {
             var racuni=await this.Context.Racuni.ToListAsync();
             racuni.ForEach(racun=>{
                  this.Context.Racuni.Remove(racun);
             });
              var stanovi=await this.Context.Stanovi.Include(s=>s.RacuniRef).ToListAsync();
            stanovi.ForEach(async stan =>{
              
                stan.IznosDugovanja=0;
               
            });
             await Context.SaveChangesAsync();
            return Ok();

        }


    }
}