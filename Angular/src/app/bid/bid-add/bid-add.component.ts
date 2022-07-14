import { Component, Input, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Bid } from 'src/app/models/bid';
import { Photo } from 'src/app/models/photo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bid-add',
  templateUrl: './bid-add.component.html',
  styleUrls: ['./bid-add.component.css'],
  providers: [BidService]
})
export class BidAddComponent implements OnInit {

  bid:Bid;
  bidAddForm:FormGroup;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  // formun validation kurallarına göre build edilebilmesi için formBuilder servisi eklenmelidir.
  constructor(private bidService:BidService, private formBuilder:FormBuilder, private authService:AuthService) {
    let _photos: Photo[] = [];
    this.bid = {
      id: 0,
      name: "",
      photos: _photos
    } as Bid;
    this.bidAddForm = this.createBidForm();
  }

  ngOnInit(): void {
  }

  createBidForm() {
    return this.formBuilder.group({
      name: ["", Validators.required],
      startPrice:  [null, Validators.required],
      bidCity:  ["", Validators.required]
    })
  }

  bidAdd() {
    // işlemler geçerli olduğunda;
    if(this.bidAddForm.valid) {
      // this.bidAddForm.value okunur ve objeye atanır. obje de bid'e atanır.
      this.bid = Object.assign({}, this.bidAddForm.value);
      
      //this.bid.userId = this.authService.loginUserId;
      this.bidService.addBid(this.bid);
    }
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
