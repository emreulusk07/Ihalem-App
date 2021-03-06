using IhalemApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Dtos
{
    public class BidForDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BidTypeId { get; set; }
        public int StartPrice { get; set; }
        public string BidCity { get; set; }
        public int WinnerUserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<Photos> Photos { get; set; }
    }
}
