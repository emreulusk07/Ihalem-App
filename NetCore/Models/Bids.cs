using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Models
{
    public class Bids
    {
        public Bids()
        {
            Photos = new List<Photos>();
            Offers = new List<Offers>();
            BidTypes = new List<BidTypes>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int BidTypeId { get; set; }
        public int StartPrice { get; set; }
        public string BidCity { get; set; }

        // int, datetime, bool gibi değişkenler için; public int? StartPrice { get; set; }
        // string gibi değişkenler için; public Nullable<DateTime> StartDate { get; set; }
        public Nullable<DateTime> StartDate { get; set; }
        public Nullable<DateTime> EndDate { get; set; }

        [ForeignKey("User")]
        public int WinnerUserId { get; set; }

        public Users User { get; set; }
        public List<Offers> Offers { get; set; }
        public List<Photos> Photos { get; set; }
        public List<BidTypes> BidTypes { get; set; }
    }
}
