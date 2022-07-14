using IhalemApp.Data;
using IhalemApp.Dtos;
using IhalemApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IhalemApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthRepository _authRepository;
        IConfiguration _configuration;

        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        // POST api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            if(await _authRepository.UserExist(userForRegisterDto.Mail))
            {
                // Böyle bir kullanıcı zaten mevcut.
                ModelState.AddModelError("UserMail", "UserMail already exists.");
            }
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userToCreate = new Users
            {
                Mail = userForRegisterDto.Mail
            };

            var createdUser = await _authRepository.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201); // created
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            var user = await _authRepository.Login(userForLoginDto.Id, userForLoginDto.Mail, userForLoginDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            // Kullanıcıya token yollanır ve kullanıcı bundan sonra hep bu token ile istek yapar.
            // Token geçerli olduğu sürece kullanıcı sistemde login olarak kalır, sonra out olur.
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);

            // Token üretilmeden önce bu token içinde neler tutulacağı belirlenir.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Token içinde tutulmak istenen temel bilgiler tutulur.
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Mail)
                }),
                
                Expires = DateTime.Now.AddDays(1), // Bu token'in geçerlilik süresi belirlenir.
                // Tokeni elde etmek için key ve hangi algoritma kullanıldığı belirtilir.
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            // Artık gerekli şeyler yapıldıktan sonra tokenDescriptor'a göre token create işlemi gerçekleştirilir.
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            JObject jObj = new JObject();
            jObj.Add("token", tokenString);
            jObj.Add("id", user.Id);
            return Ok(jObj);
        }
    }
}
