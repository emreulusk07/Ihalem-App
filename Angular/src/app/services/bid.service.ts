import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bid } from '../models/bid';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private httpClient:HttpClient, private alertifyService:AlertifyService, private router:Router) { }
  path = "http://localhost:5000/api/";

  // gelen data bir Bid array'ine dönüştürülür.
  getBids():Observable<Bid[]>{
    // gelen data'lar path'e gönderilir.
    return this.httpClient.get<Bid[]>(this.path+"bids");
  }

  getBidById(bidId: number):Observable<Bid>{
    // gelen data path'e gönderilir.
    return this.httpClient.get<Bid>(this.path+"bids/detail/?id="+bidId)
  }

/*
  getPhotosByBid(bidId: number):Observable<Photo[]>{
    // gelen data'lar path'e gönderilir.
    return this.httpClient.get<Photo[]>(this.path+"bids/photos/?BidId="+bidId);
  }
*/
  addBid(bid: Bid) {
    this.httpClient.post(this.path+"bids/add", bid).subscribe(data => {
      this.alertifyService.success("İhale ekleme işlemi başarılı");
      this.router.navigateByUrl('/bidDetail/' + data);
    });
  }
}
