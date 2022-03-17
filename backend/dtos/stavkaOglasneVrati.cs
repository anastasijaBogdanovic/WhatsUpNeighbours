using System;


namespace backend.dtos
{
    public class StavkaOglasneVrati
    {
        public string Tekst { get; set; }
        public string Autor { get; set; }

        public DateTime Vreme { get; set; }
    }
}