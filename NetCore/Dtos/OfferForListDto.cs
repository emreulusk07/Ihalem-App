using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Dtos
{
    public class OfferForListDto
    {
        public int Id { get; set; }
        public int BidId { get; set; }
        public int UserId { get; set; }
        public int BidPrice { get; set; }
        public Nullable<DateTime> BidTime { get; set; }
    }
}
