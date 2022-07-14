import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bid } from '../models/bid';
import { BidService } from '../services/bid.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
  providers: [BidService]
})
export class BidComponent implements OnInit {
  
  bids: Bid[]= [];
  getBidId:string="";
  bid: Bid;
  searchText:string="";
  currentBid: string = "continueBid";

  constructor(private activatedRoute:ActivatedRoute, private bidService: BidService) {
    this.bid = {
      id: 0,
      name: "",
      //photos: _photos
    } as Bid;
  }

  ngOnInit() {
    this.bidService.getBids().subscribe(data => {
      this.bids = data;
      console.log(data);
    });
  }

  offerDateControl(endDate: Date): boolean {
    const tarih = new Date(endDate);
    const suan = new Date();
    return tarih > suan;
  }

  showBid(a: string){
    this.currentBid = a;
  }

}
