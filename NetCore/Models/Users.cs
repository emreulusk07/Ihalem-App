using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Models
{
    public class Users
    {
        public Users()
        {
            Offers = new List<Offers>();
            Bids = new List<Bids>();
        }
        public int Id { get; set; }
        public string IdentificationNumber { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string PhoneNumber { get; set; }

        public List<Bids> Bids { get; set; }
        public List<Offers> Offers { get; set; }
    }
}
