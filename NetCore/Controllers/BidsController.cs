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
    public class BidsController : Controller
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;

        public BidsController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        // GET api/bids
        [HttpGet]
        public ActionResult GetBids()
        {
            try
            {
                var bids = _appRepository.GetBids(); // Tüm alanlar döndürülür.
                // Bids'lerin detay kısmında hangi veriler isteniyorsa o kısımları döndürülür.
                var bidsToReturn = _mapper.Map<List<BidForListDto>>(bids);
                return Ok(bidsToReturn);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET api/bids/detail/?id=5
        [HttpGet]
        [Route("detail")]
        public ActionResult GetBidById(int id)
        {
            
            var bid = _appRepository.GetBidById(id);
            var bidToReturn = _mapper.Map<BidForDetailDto>(bid);
            return Ok(bidToReturn);
        }

        // GET api/bids/photos/?BidId=5
        [HttpGet]
        [Route("photos")]
        public ActionResult GetPhotosByBid(int Bidid)
        {

            var photos = _appRepository.GetPhotosByBid(Bidid);
            return Ok(photos);
        }

        // POST api/bids/add
        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody] Bids bid)
        {
            try
            {
                _appRepository.Add(bid);
                _appRepository.SaveAll();
                return Ok(bid);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("winneruser")]
        public ActionResult GetWinnerUserById(int BidId)
        {
            var WinnerUserId = _appRepository.GetWinnerUserById(BidId);
            //var winnerUserToReturn = _mapper.Map<BidForDetailDto>(WinnerUserId);
            return Ok(WinnerUserId);
        }
    }
}
