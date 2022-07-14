using IhalemApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Data
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        bool SaveAll();

        List<Bids> GetBids();
        List<Photos> GetPhotosByBid(int BidId);
        List<Offers> GetOffers();
        Bids GetBidById(int BidId); // belli bir ihalenin detayına gidebilmek icin
        Offers GetOfferById(int id);
        Photos GetPhoto(int id);
        Offers GetWinnerUserById(int BidId);
    }
}
