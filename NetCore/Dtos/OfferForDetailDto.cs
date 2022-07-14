using IhalemApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Dtos
{
    public class OfferForDetailDto
    {
        public int Id { get; set; }
        public int BidId { get; set; }
        public int UserId { get; set; }
        public int BidPrice { get; set; }
        public Nullable<DateTime> BidTime { get; set; }

        public Bids Bid { get; set; }
        public Users User { get; set; }

    }
}
