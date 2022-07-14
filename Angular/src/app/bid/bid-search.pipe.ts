import { Pipe, PipeTransform } from '@angular/core';
import { Bid } from '../models/bid';

@Pipe({
  name: 'bidSearch'
})
export class BidSearchPipe implements PipeTransform {

  // value -> gelen data türüdür. args -> gönderilecek olan parametre türüdür.
  transform(value: Bid[], searchText: string): Bid[] {
    if(!searchText) {
      return value;
    } else {
      // içinde bulamazsa -1 döner. bulursa da index numarası döner.
      return value.filter(b => b.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase())!==-1)
    }
  }

}
