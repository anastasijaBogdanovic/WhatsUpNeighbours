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
    public class WUNController : ControllerBase
    {
        public WUNContext Context { get; set; }
        private readonly JwtService _jwtService;
        private readonly IHubContext<ChatHub,IChatClient> _messageHub;
        private readonly IHubContext<NotificationHub,INotificationClient> _notificationHub;
        
        public WUNController(WUNContext context, JwtService jwtService,
        IHubContext<ChatHub,IChatClient> messageHub,IHubContext<NotificationHub,INotificationClient> notificationHub)
        {
            this.Context=context;
            this._jwtService=jwtService;
            this._messageHub=messageHub;
            this._notificationHub=notificationHub;
         
        }

        [Route("PreuzmiStanare")]
        [HttpGet]
        public async Task<List<Stanar>> PreuzmiStanare()
        {
            return await this.Context.Stanari.ToListAsync();
        }

        [Route("KreirajZgradu")]
        [HttpPost]
        public async Task KreirajZgradu([FromBody] Zgrada z)
        {
            Context.Zgrade.Add(z);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiZgrade")]
        [HttpGet]
        public async Task<List<Zgrada>> PreuzmiZgrade()
        {
            return await this.Context.Zgrade.ToListAsync();
        }
        
        [Route("Preuzmi stanove")]
        [HttpGet]
        public async Task<List<Stan>> PreuzmiStanove()
        {
            return await this.Context.Stanovi.ToListAsync();
        }


        [Route("RegistrujStanara")]
        [HttpPost]
        public async Task<IActionResult> RegistrujStanara([FromBody] RegisterAttributes s)
        {
             var zgrada=await this.Context.Zgrade.FindAsync(1);
             if(zgrada.SifraZgrade==s.SifraZgrade){
                 Stanar noviStanar=new Stanar();


            string pass=BCrypt.Net.BCrypt.HashPassword(s.Password);
            noviStanar.Password=pass;
            noviStanar.BrSprata=s.BrSprata;
            noviStanar.BrStana=s.BrStana;
            noviStanar.Email=s.Email;
            noviStanar.Status=s.Status;
            noviStanar.Jmbg=s.Jmbg;
            noviStanar.BrojTelefona=s.BrojTelefona;
            noviStanar.Ime=s.Ime;
            noviStanar.Prezime=s.Prezime;

            noviStanar.ZgradaRef=zgrada;
            Context.Stanari.Add(noviStanar);
            await Context.SaveChangesAsync();
            var stan=await Context.Stanovi.Where(st => st.BrStana==s.BrStana).FirstOrDefaultAsync();
            if(stan==null)
            {
                stan=new Stan();
                stan.BrStana=s.BrStana;
                stan.IznosDugovanja=0;
                Context.Stanovi.Add(stan);
                await Context.SaveChangesAsync();
            }
            noviStanar.StanRef=stan;
            NotifikacijeStanara notifikacije=new NotifikacijeStanara();
            notifikacije.NotifikacijaOglasna=true;
            notifikacije.NotifikacijaPredlozi=true;
            notifikacije.NotifikacijaPredlozi=true;
            notifikacije.NotifikacijaSastanci=true;
            notifikacije.NotifikacijaTroskovi=true;
            notifikacije.NotifikacijaCet=true;
           notifikacije.IdStanara=noviStanar.ID;
            await Context.SaveChangesAsync();
            return Ok(s);
             }
             else return BadRequest(error: new {message= "Pogresna lozinka zgrade!"});
        }

        [Route("Login")]
        [HttpPost]

        public async Task<IActionResult> Login([FromBody] loginAttributes l)
        {
            Stanar stanar=await Context.Stanari.Where(s=>s.Email==l.Email).FirstOrDefaultAsync();

            if(stanar==null)
            {
                return BadRequest(error: new {message= "Invalid Credentials"});
            }

            if(!BCrypt.Net.BCrypt.Verify(l.Password,stanar.Password))
            {
                 return BadRequest(error: new {message= "Invalid Credentials"});

            }

            var jwt=_jwtService.Generate(stanar.ID);

            Response.Cookies.Append("jwt",jwt, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly=true,
                
            });


            return Ok(new{
                message="success"
            });

        }
        [Route("stanarValidation")]
        [HttpGet]
        public async Task<IActionResult> Stanar()
        {
            try{
            var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);

            var stanar=await Context.Stanari.FindAsync(userId);
            return Ok(stanar);
            }
            catch(Exception e)
            {
                return Unauthorized();
            }
            
        }

        [Route("Logout")]
        [HttpPost]

        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new{
                message ="success"
            });

        }

        [HttpPost]
        [Route("Chat")]
        public async Task<IActionResult> Post([FromBody]Message poruka)
        {
            await _messageHub.Clients.All.ReceiveMessage(poruka);
            var novaPoruka=new Poruka();
            novaPoruka.Vreme=poruka.Vreme;
            novaPoruka.Tekst=poruka.Tekst;
            var autor=await Context.Stanari.FindAsync(poruka.AutorId);
            novaPoruka.Autor=autor;
            var zgrada=await Context.Zgrade.FindAsync(1);
            Context.Cet.Add(novaPoruka);
            await Context.SaveChangesAsync();



            return Ok(novaPoruka);
        }

        [HttpGet]
        [Route("VratiCet")]

        public async Task<List<Message>> VratiCet()
        {
            List<Message> poruke=new List<Message>();
            List<Poruka> porukeBaza=await Context.Cet.Include(p=>p.Autor).ToListAsync();
            porukeBaza.ForEach(p =>{
                Message message=new Message();
                if(p.Autor!=null){
                message.Autor=p.Autor.Ime+" "+p.Autor.Prezime;
                message.AutorId=p.Autor.ID;
                }
                message.Vreme=p.Vreme;
                message.Tekst=p.Tekst;
                poruke.Add(message);

            });
            return poruke;

        }

        [HttpPut]
        [Route("AzurirajProfil")]
        public async Task<IActionResult> azurirajProfil([FromBody] Stanar s)
        {
            try{
                 var jwt=Request.Cookies["jwt"];
            var token=_jwtService.Verify(jwt);
            int userId=int.Parse(token.Issuer);
            

            var stariStanar=await this.Context.Stanari.FindAsync(userId);
             if(stariStanar==null)
             return BadRequest(error: new {message= "Invalid Credentials"});
           if(s.Password!=stariStanar.Password)
                   s.Password=BCrypt.Net.BCrypt.HashPassword(s.Password);
            stariStanar.Ime=s.Ime;
            stariStanar.Prezime=s.Prezime;
            stariStanar.Jmbg=s.Jmbg;
            stariStanar.Password=s.Password;
            stariStanar.Email=s.Email;
            stariStanar.BrojTelefona=s.BrojTelefona;
            stariStanar.BrSprata=s.BrSprata;
            stariStanar.BrStana=s.BrStana;
            
            //Context.Stanari.Update(s);
            await Context.SaveChangesAsync();
            return Ok(s);
            }
            catch(Exception e)
            {
                return Unauthorized();

            }
        }

        [HttpPost]
        [Route("ObjaviNaOglasnojTabli")]
        public async Task<IActionResult> PostaviNaOglasnu([FromBody] StavkaOglasneCreate sot)
        {
            try{
            StavkaOglasneTable novaStavka=new StavkaOglasneTable();
            novaStavka.Vreme=sot.Vreme;
            novaStavka.Tekst=sot.Tekst;
             var zgrada=await this.Context.Zgrade.FindAsync(1);
             novaStavka.ZgradaRef=zgrada;
             var autor=await this.Context.Stanari.FindAsync(sot.idAutora);
             novaStavka.Autor=autor;
             Context.OglasnaTabla.Add(novaStavka);
             await Context.SaveChangesAsync();
             var not=new NotificationDto();
             not.Tekst="Postavljeno na oglasnu tablu,postavio stanar: "+autor.Ime +" "+ autor.Prezime;
             
             not.Tip="oglasna";
              await _notificationHub.Clients.All.ReceiveNotification(not);
              var notifikacijeLista=await Context.NotifikacijeStanara.ToListAsync();
              notifikacijeLista.ForEach(notifikacije=>{
                  notifikacije.NotifikacijaOglasna=true;
              });
              await Context.SaveChangesAsync();
             return Ok();
            }
            catch(Exception e)
            {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("PreuzmiOglasnuTablu")]
        public async Task<List<StavkaOglasneVrati>> vratiOglasnu()
        {
            List<StavkaOglasneVrati> lista=new List<StavkaOglasneVrati>();
            List<StavkaOglasneTable> l=await Context.OglasnaTabla.Include(s=>s.Autor).ToListAsync();
            l.ForEach(s=>{
                StavkaOglasneVrati novaStavka=new StavkaOglasneVrati();
                novaStavka.Autor=s.Autor.Ime+" "+s.Autor.Prezime;
                novaStavka.Tekst=s.Tekst;
                novaStavka.Vreme=s.Vreme;
                lista.Add(novaStavka);
            });

            return lista;

        }



      
      
    
       


    

        
    }
}
