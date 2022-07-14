import { Photo } from "./photo";

export interface Bid {
    id:number;
    name:string;
    bidTypeId:number;
    startPrice:number;
    bidCity:string;
    winnerUserId:number;
    startDate:Date;
    endDate:Date;
    //user:User;
    //offers:Offer[];
    photos:Photo[];
    url:string;
    //bidTypes:BidType[];
}