using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Models
{
    public class Photos
    {
        public int Id { get; set; }
        public int BidId { get; set; }
        public bool IsMain { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }

        public Bids Bid { get; set; }
    }
}
