using System;
namespace backend.dtos
{
    public class Message
    {
         public string Tekst { get; set; }
        public string Autor { get; set; }
        public int AutorId { get; set; }
       

        public DateTime Vreme { get; set; }

    }

}