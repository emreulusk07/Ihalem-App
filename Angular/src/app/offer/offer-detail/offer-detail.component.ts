import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { AuthService } from 'src/app/services/auth.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css'],
  providers: [OfferService]
})
export class OfferDetailComponent implements OnInit {

  offer: Offer;
  loginUserId = 0;
  //photos:Photo[] = [];
  //imageUrls:string[] = [];
  constructor(private activatedRoute:ActivatedRoute, private offerService:OfferService, private authService:AuthService) { 
    //let _photos: Photo[] = [];
    this.offer = {
      id: 0,
      bidId: 0,
      userId: authService.ID
    } as Offer;
    this.loginUserId = authService.ID;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params["offerId"]);
      this.getOfferById(params["offerId"]);
    })
    console.log('4data: ', this.loginUserId);
  }
  
  getOfferById(offerId: number) {
    this.offerService.getOfferById(offerId).subscribe(data => {
      console.log(data);
      this.offer = data;
      console.log('5data: ', this.loginUserId);
    })
  }

}
