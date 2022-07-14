using AutoMapper;
using IhalemApp.Data;
using IhalemApp.Dtos;
using IhalemApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IhalemApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : Controller
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;

        public OffersController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        // GET api/offers
        [HttpGet]
        public ActionResult GetOffers()
        {
            try
            {
                var offers = _appRepository.GetOffers(); // Tüm alanlar döndürülür.
                // Offers'lerin detay kısmında hangi veriler isteniyorsa o kısımları döndürülür.
                var offersToReturn = _mapper.Map<List<OfferForListDto>>(offers);
                return Ok(offersToReturn);
            }
            catch (Exception)
            {
                return BadRequest();
            }
            }

        // GET api/offers/detail/?id=5
        [HttpGet]
        [Route("detail")]
        public ActionResult GetOfferById(int id)
        {

            var offer = _appRepository.GetOfferById(id);
            var offerToReturn = _mapper.Map<OfferForDetailDto>(offer);
            return Ok(offerToReturn);
        }

        // GET api/offers/photos/?BidId=5
        [HttpGet]
        [Route("photos")]
        public ActionResult GetPhotosByBid(int Bidid)
        {

            var photos = _appRepository.GetPhotosByBid(Bidid);
            return Ok(photos);
        }

        // POST api/offers/offeradd
        [HttpPost]
        [Route("offeradd")]
        public ActionResult Add([FromBody] Offers offer)
        {
            try
            {
                _appRepository.Add(offer);
                _appRepository.SaveAll();
                return Ok(offer);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
