import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochToHumanDate'
})
export class EpochToHumanDatePipe implements PipeTransform {

  transform(value: number): string {
    if(value) {
      let humanReadableDate = new Date(value*1000);
      let formattedDate = `${this.getMonthName(humanReadableDate.getMonth())} ${humanReadableDate.getDate()} , ${humanReadableDate.getFullYear()} /
                          ${humanReadableDate.getHours()}:${humanReadableDate.getMinutes()}`;
      return formattedDate;
    } else {
      return '-';
    }
  }

  getMonthName(idx) {
    switch(idx) {
      case 0:
        return 'Jan';
        
      case 1:
        return 'Feb';
        
      case 2:
        return 'Mar';
        
      case 3:
        return 'Apr'; 
        
      case 4:
        return 'May';
        
      case 5:
        return 'Jun';
        
      case 6:
        return 'Jul';
        
      case 7:
        return 'Aug'; 

      case 8:
        return 'Sep';
        
      case 9:
        return 'Oct';
        
      case 10:
        return 'Nov';
        
      case 11:
        return 'Dec'; 
    }
  }

}
