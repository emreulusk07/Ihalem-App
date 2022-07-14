import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Photo } from 'src/app/models/photo';
import { AuthService } from 'src/app/services/auth.service';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/app/models/offer';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Bid } from 'src/app/models/bid';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.css'],
  providers: [OfferService]
})
export class OfferAddComponent implements OnInit {

  offer:Offer;
  bid:Bid;
  offerAddForm:FormGroup;
  loginUserId = 0;
  getBidStartPrice:number = 0;
  currentDate = new Date();
  // formun validation kurallarına göre build edilebilmesi için formBuilder servisi eklenmelidir.
  constructor(private bidService:BidService, private activatedRoute:ActivatedRoute, private offerService:OfferService, private formBuilder:FormBuilder, private authService:AuthService, private alertifyService:AlertifyService) {
    //let _photos: Photo[] = [];
    
    this.offer = {
      id: 0,
      bidId: 0,
      userId: parseInt(authService.loginUserId + ""),
      //photos: _photos
    } as Offer;
    this.bid = {
      id: 0,
      //bidId: 0,
      //userId: authService.ID
      
      //photos: _photos
    } as Bid;
    
    console.log('**data: ', authService.loginUserId);
    this.loginUserId = parseInt(authService.loginUserId + "");
    console.log('0data: ', this.loginUserId);
    this.offerAddForm = this.createOfferForm();
  }

  ngOnInit(): void {
    console.log('1data: ', this.loginUserId);
    this.activatedRoute.params.subscribe(params => {
      console.log("##"+params["bidId"]);
      console.log("deger");
      this.getBidById(params["bidId"]);
    })
  }
  
  getBidById(bidId: number) {
    console.log('2data: ', this.loginUserId);
    this.bidService.getBidById(bidId).subscribe(data => {
      console.log("$$"+data.id);
      this.bid = data;
      this.getBidStartPrice = data.startPrice;
      //this.offer.userId = this.authService.ID;
      console.log('3data: ', this.loginUserId);
      this.offerAddForm = this.createOfferForm();
    })
  }

  createOfferForm() {
    console.log('COFdata: ', this.loginUserId);
    return this.formBuilder.group({
      userId: [this.loginUserId +""],
      bidPrice: [null, [Validators.min(this.getBidStartPrice), Validators.required]],
      bidTime: [this.currentDate/*, [Validators.min(this.getBidStartDate), Validators.max(this.getBidEndDate)]*/]
    },
    )
  }

  offerAdd() {
    // işlemler doğru bir şekilde gerçekleştiyse;
    if(this.offerAddForm.valid) {
      if(this.isAuthenticated) {
        // this.offerAddForm.value okunur ve objeye atanır. obje de offer'e atanır.
        this.offer = Object.assign({}, this.offerAddForm.value);
        //this.bid.userId = this.authService.getCurrentUserId();
        this.offerService.addOffer(this.offer);
        this.alertifyService.success("Teklif başarıyla gönderildi.");
      } else {
        this.alertifyService.warning("Teklif yapabilmek için lütfen giriş yapın.");
      }
    } else {
      this.alertifyService.warning("Teklif yapabilmek için lütfen teklif miktarı girin.");
    }
  }
  
  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
