import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any,filterName:string,propName:string,propName2:string) {
    if(value.length==0||filterName=='' || filterName==undefined){
      return value;
    }
    const resultArray=[];
    for(let val of value){
      if(val[propName].toLowerCase().match(filterName.toLowerCase()) || val[propName2].toLowerCase().match(filterName.toLowerCase())){
          resultArray.push(val);
      }
    }
    return resultArray;
  }

}
