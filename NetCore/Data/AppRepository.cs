using IhalemApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Data
{
    public class AppRepository : IAppRepository
    {
        private DataContext _context;

        public AppRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public Bids GetBidById(int BidId)
        {
            var bid = _context.Bids.Include(b => b.Photos).FirstOrDefault(b => b.Id == BidId);
            return bid;
        }

        public Offers GetOfferById(int id)
        {
            var offer = _context.Offers.FirstOrDefault(o => o.Id == id);
            return offer;
        }

        public List<Bids> GetBids()
        {
            var bids = _context.Bids.Include(b => b.Photos).ToList();
            return bids;
        }

        public List<Offers> GetOffers()
        {
            var offers = _context.Offers.ToList();
            return offers;
        }

        public Photos GetPhoto(int id)
        {
            var photo = _context.Photos.FirstOrDefault(p => p.Id == id);
            return photo;
        }

        public List<Photos> GetPhotosByBid(int BidId)
        {
            var photos = _context.Photos.Where(p => p.BidId == BidId).ToList();
            return photos;
        }

        public Offers GetWinnerUserById(int BidId)
        {
            var winnerUser = _context.Offers.Where(o => o.BidId == BidId).OrderByDescending(o => o.BidPrice).FirstOrDefault();
            return winnerUser;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}