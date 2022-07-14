using IhalemApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Bids> Bids { get; set; }
        public DbSet<Offers> Offers { get; set; }
        public DbSet<Photos> Photos { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
