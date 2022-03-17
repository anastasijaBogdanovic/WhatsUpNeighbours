using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.dtos;

using BCrypt.Net;
using BCrypt;
using backend.Helpers;
using backend.Hubs.Clients;
using backend.Hubs;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WUNNotifikacijeController : ControllerBase
    {
         public WUNContext Context { get; set; }
         private readonly JwtService _jwtService;
         
        

         public WUNNotifikacijeController(WUNContext context, JwtService jwtService)
         {
             this.Context=context;
             this._jwtService=jwtService;
         }

         [HttpGet]
         [Route("PokupiNotifikacije")]
         public async Task<IActionResult> PokupiNotifikacije()
         {
                  try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var notifikacije=await Context.NotifikacijeStanara.Where(not=>not.IdStanara==userId).FirstOrDefaultAsync();
            if(notifikacije==null)
            {
             notifikacije=new NotifikacijeStanara();
            notifikacije.NotifikacijaOglasna=true;
            notifikacije.NotifikacijaPredlozi=true;
            notifikacije.NotifikacijaObavestenja=true;
            notifikacije.NotifikacijaSastanci=true;
            notifikacije.NotifikacijaTroskovi=true;
            notifikacije.NotifikacijaCet=true;
           notifikacije.IdStanara=userId;
           this.Context.NotifikacijeStanara.Add(notifikacije);
            await Context.SaveChangesAsync();
            }
            return Ok(notifikacije);


               }
               catch(Exception e)
               {
                    return Unauthorized();

               }

         }

         [HttpPut]
         [Route("UkloniNotifikaciju/{tipNotifikacije}")]
         public async Task<IActionResult> UkloniNotifikaciju(string tipNotifikacije)
         {
               try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            var notifikacije=await Context.NotifikacijeStanara.Where(not=>not.IdStanara==userId).FirstOrDefaultAsync();
          
            switch (tipNotifikacije)
            {
                case "oglasna":
                notifikacije.NotifikacijaOglasna=false;
                break;
                case "obavestenja":
                notifikacije.NotifikacijaObavestenja=false;
                break;
                case "cet":
                notifikacije.NotifikacijaCet=false;
                break;
                case "sastanci":
                notifikacije.NotifikacijaSastanci=false;
                break;
                case "predlozi":
                notifikacije.NotifikacijaPredlozi=false;
                break;
                case "troskovi":
                notifikacije.NotifikacijaTroskovi=false;
                break;

               
             
           
            }
            Context.NotifikacijeStanara.Update(notifikacije);
            await Context.SaveChangesAsync();
             return Ok(notifikacije);


               }
               catch(Exception e)
               {
                    return Unauthorized();

               }

         }


    }
}