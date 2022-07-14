import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bid } from 'src/app/models/bid';
import { Offer } from 'src/app/models/offer';
import { Photo } from 'src/app/models/photo';
import { BidService } from 'src/app/services/bid.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-bid-detail',
  templateUrl: './bid-detail.component.html',
  styleUrls: ['./bid-detail.component.css'],
  providers: [BidService]
})
export class BidDetailComponent implements OnInit {

  bid: Bid;
  winnerOffer: Offer;
  photos:Photo[] = [];
  imageUrls:string[] = [];
  winnerUserId = 0;

  constructor(private activatedRoute:ActivatedRoute, private offerService:OfferService, private bidService:BidService) { 
    let _photos: Photo[] = [];
    this.bid = {
      id: 0,
      name: "",
      photos: _photos
    } as Bid;
    this.winnerOffer = {
      id: 0
    } as Offer;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log("adsa"+params["bidId"]);
      this.getBidById(params["bidId"]);
    })
  }
  
  getBidById(bidId: number) {
    this.bidService.getBidById(bidId).subscribe(data => {
      console.log(data);
      console.log("xxxx"+data.id);
      this.bid = data;
      this.findWinnerUser(data.id);
      //this.getBidId = data.id.toString();
    })
  }

  findWinnerUser(bidId: number) {
    this.offerService.getWinnerUserById(bidId).subscribe(data => {
      console.log("..............."+data.id);
      this.winnerOffer = data;
      console.log("..............."+this.winnerOffer.userId);
    })
  }

/*
  getPhotosByBid(bidId: number) {
    this.bidService.getPhotosByBid(bidId).subscribe(data => {
      this.photos = data;
      this.setGallery();
    }, error => {
      console.log(error);
    });
  }
  setGallery() {
    
    for(let i=0; i<this.bid.photos.length; i++) {
      this.imageUrls.push(this.bid.photos[i].url);
    }
  }
*/
}
