import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTime',
})
export class ShortTimePipe implements PipeTransform {
  transform(time: string) {
    try {
      let arr = time.split(':')
      if(arr.length == 3)
        return time.split(':').slice(0,2).join(':')
      else
        return time
    } catch (error) {
      console.log(error)
      return time
    }
  }
}
