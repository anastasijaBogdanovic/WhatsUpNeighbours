using System;

namespace backend.dtos
{
    public class ObavestenjeDto
    {
        public int ID { get; set; }

        public string Naslov { get; set; }

        public string Tekst { get; set; }

        
        public DateTime Vreme { get; set; }

        public string ImeAutora { get; set; }

        public string StatusAutora {get; set;}

        
    }
}