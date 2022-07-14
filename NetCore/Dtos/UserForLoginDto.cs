using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Dtos
{
    public class UserForLoginDto
    {
        public int Id { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
    }
}
