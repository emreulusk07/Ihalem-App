import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  providers: [OfferService]
})
export class OfferComponent implements OnInit {

  offers: Offer[]= [];
  constructor(private offerService: OfferService) {  }

  ngOnInit(): void {
    this.offerService.getOffers().subscribe(data => {
      this.offers = data;
      console.log(data);
    });
  }

}
