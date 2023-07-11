import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], isCustom:boolean) {
   
    return  items?.filter((data:any)=> {
      return data.isCustom == isCustom;})
  }
}