using AutoMapper;
using IhalemApp.Dtos;
using IhalemApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Bids, BidForListDto>().ForMember(dest => dest.Url, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });

            CreateMap<Bids, BidForDetailDto>();
            CreateMap<Offers, OfferForListDto>();
            CreateMap<Offers, OfferForDetailDto>();
            CreateMap<Photos, PhotoForCreationDto>();
            CreateMap<PhotoForReturnDto, Photos>();
        }
    }
}
