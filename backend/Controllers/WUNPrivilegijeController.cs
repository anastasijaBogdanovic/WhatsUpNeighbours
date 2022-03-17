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

    public class WUNPrivilegijeController:ControllerBase
    {
         public WUNContext Context { get; set; }
         private readonly JwtService _jwtService;
         private readonly IHubContext<NotificationHub,INotificationClient> _notificationHub;
        
        public WUNPrivilegijeController(WUNContext context, JwtService jwtService
        ,IHubContext<NotificationHub,INotificationClient> notificationHub)
        {
            this.Context=context;
            this._jwtService=jwtService;
            this._notificationHub=notificationHub;
         
        }

        [HttpDelete]
        [Route("ObrisiStanara/{idStanara}")]
        public async Task<IActionResult> ObrisiStanara(int idStanara)
        {
             try
            {
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
             var stanar=await this.Context.Stanari.FindAsync(userId);
            if(stanar.Status=="upravnik" || stanar.Status=="admin")
                      {
                          var stanarZaBrisanje=await Context.Stanari.FindAsync(idStanara);
                          Context.Stanari.Remove(stanarZaBrisanje);
                          await Context.SaveChangesAsync();
                          return Ok();

                       }
            else return BadRequest(error: new {message= "Niste upravnik ili admin"});
              }
              catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }
        }

        [HttpPut]
        [Route("PromeniStatus/{jmbgNovog}")]
        public async Task<IActionResult> PromeniStatus(string jmbgNovog)
        {
            try
             {
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
             var stanar=await this.Context.Stanari.FindAsync(userId);
            if(stanar.Status=="upravnik" || stanar.Status=="admin" || stanar.Status=="blagajnik")
            {
                var novi=await Context.Stanari.Where(stanar=>stanar.Jmbg==jmbgNovog).FirstOrDefaultAsync();
                if(novi!=null){
                novi.Status=stanar.Status;
                stanar.Status="stanar";
                await Context.SaveChangesAsync();
                return Ok(stanar);
                }
                 else return BadRequest(error: new {message= "Ne postoji stanar sa ovim maticnim brojem!"});
             }
            else return BadRequest(error: new {message= "Niste upravnik ili admin ili blagajnik"});
              }
              catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }

        }

        [HttpPut]
        [Route("PromeniSifruZgrade")]
        public async Task<IActionResult> PromeniSifruZgrade(PromenaSifreZgrade p)
        {

                try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
             var stanar=await this.Context.Stanari.FindAsync(userId);
            if(stanar.Status=="upravnik" || stanar.Status=="admin"){
                   var zgrada= await this.Context.Zgrade.FindAsync(1);
                   string trenutnaSifra=zgrada.SifraZgrade;
                   if(trenutnaSifra==p.StaraSifra)
                   {
                       zgrada.SifraZgrade=p.NovaSifra;
                       await Context.SaveChangesAsync();
                       return Ok();

                   }
                    else return BadRequest(error: new {message= "Pogresna stara sifra"});

                       }
            else return BadRequest(error: new {message= "Niste upravnik ili admin"});
              }
              catch(Exception e)
             {
                  return BadRequest(error: new {message= "Invalid Credentials"});

             }

            
        }

    }
}