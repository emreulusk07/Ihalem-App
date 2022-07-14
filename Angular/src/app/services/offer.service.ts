import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient:HttpClient, private alertifyService:AlertifyService, private router:Router) { }
  path = "http://localhost:5000/api/";

  // gelen data bir Bid array'ine dönüştürülür.
  getOffers():Observable<Offer[]>{
    // gelen data'lar path'e gönderilir.
    return this.httpClient.get<Offer[]>(this.path+"offers");
  }

  getOfferById(offerId: number):Observable<Offer>{
    // gelen data path'e gönderilir.
    return this.httpClient.get<Offer>(this.path+"offers/detail/?id="+offerId)
  }

  getWinnerUserById(bidId: number):Observable<Offer>{
    return this.httpClient.get<Offer>(this.path+"bids/winneruser/?BidId="+bidId)
  }
  
/*
  getPhotosByBid(bidId: number):Observable<Photo[]>{
    // gelen data'lar path'e gönderilir.
    return this.httpClient.get<Photo[]>(this.path+"bids/photos/?BidId="+bidId);
  }
*/
  addOffer(offer: Offer) {
    this.httpClient.post(this.path+"offers/offeradd", offer).subscribe(data => {
      this.alertifyService.success("İhale teklifi talebi başarılı");
      this.router.navigateByUrl('/offerDetail/' + data);
    });
  }
}
