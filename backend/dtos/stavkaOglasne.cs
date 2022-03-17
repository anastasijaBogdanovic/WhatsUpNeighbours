using System;


namespace backend.dtos
{
    public class StavkaOglasneCreate
    {
        public int idAutora { get; set; }
          public string Tekst { get; set; }

        public DateTime Vreme { get; set; }

    }
}