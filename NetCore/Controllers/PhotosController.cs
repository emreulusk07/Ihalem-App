using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using IhalemApp.Data;
using IhalemApp.Dtos;
using IhalemApp.Helpers;
using IhalemApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IhalemApp.Controllers
{
    [Route("api/bids/{bidId}/[controller]")]
    [ApiController]
    public class PhotosController : Controller
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;
        private Cloudinary _cloudinary;
        IOptions<CloudinarySettings> _cloudinaryConfig;

        public PhotosController(IAppRepository appRepository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _appRepository = appRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.ApiKey, _cloudinaryConfig.Value.ApiSecret);
            // cloudinary'de yapılan her iş verilen account için gerçekleştirilir.
            _cloudinary = new Cloudinary(account);
        }

        [HttpPost]
        public ActionResult AddPhotoForBids(int bidId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            // gerekli şehir veritabanından çekilir.
            var bid = _appRepository.GetBidById(bidId);
            if(bid == null)
            {
                return BadRequest("Couldn't fing the bid");
            }

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(currentUserId != bid.User.Id)
            {
                return Unauthorized();
            }

            // cloudinary'e kayıt işlemi gerçekleştirilir.
            var file = photoForCreationDto.File;
            var uploadResult = new ImageUploadResult();
            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream)
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            // cloudinary'den uri ve public id alınır.
            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            // veritabanına fotoğraf olarak kayıt işlemi gerçekleştirilir.
            // fotoğraf olarak kaydedilebilmesi icin automapper classında createmap yapılır.
            var photo = _mapper.Map<Photos>(photoForCreationDto); // photoForCreationDto Photos'a map edilir.
            photo.Bid = bid;

            // eklenen fotoğraf ile fotoğraf ise isMain(ana fotoğraf) olarak belirlenir.
            if(!bid.Photos.Any(p => p.IsMain))
            {
                photo.IsMain = true;
            }
            bid.Photos.Add(photo);

            // veritabanının kaydedilme işlemi başarıyla gerçekleşirse; fotoğraf döndürülür.
            if(_appRepository.SaveAll())
            {
                // PhotoForReturnDto olarak kaydedilebilmesi icin automapper classında createmap yapılır.
                // Photos photoForReturnDto'a map edilir.
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }
            return BadRequest("Couldn't add the photo");
        }

        [HttpGet("{photoId}", Name = "GetPhoto")]
        public ActionResult GetPhoto(int photoId)
        {
            var photoFromDb = _appRepository.GetPhoto(photoId);
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromDb);

            return Ok(photo);
        }
    }
}
