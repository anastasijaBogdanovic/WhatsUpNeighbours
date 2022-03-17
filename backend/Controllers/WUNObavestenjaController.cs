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
using backend.Helpers;
using backend.Hubs.Clients;
using backend.Hubs;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.SignalR;

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

    public class WUNObavestenjaController:ControllerBase
    {
         public WUNContext Context { get; set; }
         private readonly JwtService _jwtService;
          private readonly IHubContext<NotificationHub,INotificationClient> _notificationHub;
        

         public WUNObavestenjaController(WUNContext context, JwtService jwtService,
          IHubContext<ChatHub,IChatClient> messageHub,IHubContext<NotificationHub,INotificationClient> notificationHub)
         {
             this.Context=context;
             this._jwtService=jwtService;
             this._notificationHub=notificationHub;
         }

         [HttpPost]
         [Route("KreirajObavestenje")]
         public async Task<IActionResult> KreirajObavestenje([FromBody]Obavestenje o)
         {
             try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
           
            var stanar=await Context.Stanari.FindAsync(userId);
            if(stanar.Status=="upravnik" || stanar.Status=="admin" || stanar.Status=="blagajnik")
            {
             var zgrada=await Context.Zgrade.FindAsync(1);
             o.ZgradaRef=zgrada;
             o.Autor=stanar;
             Context.Obavestenja.Add(o);
             var not=new NotificationDto();
             not.Tekst="Postavljeno na obavestenje,postavio: "+o.Autor.Status +" "+o.Autor.Ime +" "+ o.Autor.Prezime;
             
             not.Tip="obavestenja";
              await _notificationHub.Clients.All.ReceiveNotification(not);
              var notifikacijeLista=await Context.NotifikacijeStanara.ToListAsync();
              notifikacijeLista.ForEach(notifikacije=>{
                  notifikacije.NotifikacijaObavestenja=true;
              });
             await Context.SaveChangesAsync();

             return Ok(o);
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
         [Route("VratiObavestenja")]
         public async Task<List<ObavestenjeDto>> VratiObavestenja()
         {
             var obavestenja= await Context.Obavestenja.Include(o=>o.Autor).ToListAsync();
             List<ObavestenjeDto> obavestenjaRez=new List<ObavestenjeDto>();
            obavestenja.ForEach( obavestenje=>{
                 var novoObavestenje=new ObavestenjeDto();
                novoObavestenje.ID=obavestenje.ID;
                novoObavestenje.Naslov=obavestenje.Naslov;
                novoObavestenje.Tekst=obavestenje.Tekst;
                 
                novoObavestenje.Vreme=obavestenje.Vreme;
                
                novoObavestenje.ImeAutora=obavestenje.Autor.Ime+" "+obavestenje.Autor.Prezime;
                novoObavestenje.StatusAutora=obavestenje.Autor.Status;
                 obavestenjaRez.Add(novoObavestenje);

             });
             return obavestenjaRez;
         }




    }

     
}