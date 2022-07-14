import { Routes } from "@angular/router";
import { BidAddComponent } from "./bid/bid-add/bid-add.component";
import { BidDetailComponent } from "./bid/bid-detail/bid-detail.component";
import { BidComponent } from "./bid/bid.component";
import { LoginComponent } from "./login/login.component";
import { OfferAddComponent } from "./offer/offer-add/offer-add.component";
import { OfferDetailComponent } from "./offer/offer-detail/offer-detail.component";
import { OfferComponent } from "./offer/offer.component";
import { RegisterComponent } from "./register/register.component";

export const appRoutes : Routes = [
    {path:"bid", component:BidComponent},
    {path:"offer", component:OfferComponent},
    {path:"register", component:RegisterComponent},
    {path:"login", component:LoginComponent},
    {path:"bidAdd", component:BidAddComponent},
    {path:"offerAdd/:bidId", component:OfferAddComponent},
    {path:"bidDetail/:bidId", component:BidDetailComponent},
    {path:"offerDetail/:offerId", component:OfferDetailComponent},
    {path:"**", redirectTo:"bid", pathMatch:"full"}
];