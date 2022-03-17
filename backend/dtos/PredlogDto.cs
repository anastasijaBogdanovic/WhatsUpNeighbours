using System;

namespace backend.dtos
{
    public class PredlogDto
    {
        public int ID { get; set; }

        public string Naslov { get; set; }

        public string Opis { get; set; }

        public int BrZa { get; set; }

        public int BrProtiv { get; set; }

        public DateTime DatumObjave { get; set; }

        public string ImeAutora { get; set; }

        
    }
}