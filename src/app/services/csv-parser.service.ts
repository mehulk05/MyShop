import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class CsvParserService {
    public userArray: any[] = [];
    constructor(private http: HttpClient){}
    
    sortDataByPrice(index,sortby,data){
      var pattern = /[,]/g

      if(index == 1){
        data.sort(function(a, b) {
          return parseFloat(a.srno) - parseFloat(b.srno);
      });
      }
      else if(index ==2){
        data.sort(function (a,b){
          //remove unwanted characters so they can be converted to numbers
          a = +a.netprice.replace(pattern,'');
          b = +b.netprice.replace(pattern,'');
          //use the numeric versions to sort the string versions
          return a-b;
        });
      }
      else{
        data.sort(function (a,b){
          //remove unwanted characters so they can be converted to numbers
          a = +a.netprice.replace(pattern,'');
          b = +b.netprice.replace(pattern,'');
          //use the numeric versions to sort the string versions
          return b-a;
        });
      }
      
      
    return data
    }

     public getCooker(): Observable<any> {
        const id = "1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4"
        const url = `https://spreadsheets.google.com/feeds/list/${id}/o6isq5z/public/values?alt=json`;
    
        return this.http.get(url)
          .pipe(
            map((res: any) => {
              const data = res.feed.entry;
    
              const returnArray: Array<any> = [];
              if (data && data.length > 0) {
                data.forEach(entry => {
                  const obj = {};
                  for (const x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                      obj[x.split('$')[1]] = entry[x]['$t'];
                    }
                  }
                  returnArray.push(obj);
                });
              }
              return returnArray;
            })
          );
      }

      public getMixer(): Observable<any> {
        const id = "1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4"
        const url = `https://spreadsheets.google.com/feeds/list/${id}/oio6o9n/public/values?alt=json`;
    
        return this.http.get(url)
          .pipe(
            map((res: any) => {
              const data = res.feed.entry;
    
              const returnArray: Array<any> = [];
              if (data && data.length > 0) {
                data.forEach(entry => {
                  const obj = {};
                  for (const x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                      obj[x.split('$')[1]] = entry[x]['$t'];
                    }
                  }
                  returnArray.push(obj);
                });
              }
              return returnArray;
            })
          );
      }

      public getStoves(): Observable<any> {
        const id = "1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4"
        const url = `https://spreadsheets.google.com/feeds/list/${id}/oma0r0x/public/values?alt=json`;
    
        return this.http.get(url)
          .pipe(
            map((res: any) => {
              const data = res.feed.entry;
    
              const returnArray: Array<any> = [];
              if (data && data.length > 0) {
                data.forEach(entry => {
                  const obj = {};
                  for (const x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                      obj[x.split('$')[1]] = entry[x]['$t'];
                    }
                  }
                  returnArray.push(obj);
                });
              }
              return returnArray;
            })
          );
      }

      public getBlender(): Observable<any> {
        const id = "1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4"
        const url = `https://spreadsheets.google.com/feeds/list/${id}/ohphiaw/public/values?alt=json`;
    
        return this.http.get(url)
          .pipe(
            map((res: any) => {
              const data = res.feed.entry;
    
              const returnArray: Array<any> = [];
              if (data && data.length > 0) {
                data.forEach(entry => {
                  const obj = {};
                  for (const x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                      obj[x.split('$')[1]] = entry[x]['$t'];
                    }
                  }
                  returnArray.push(obj);
                });
              }
              return returnArray;
            })
          );
      }

      public getMop(): Observable<any> {
        const id = "1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4"
        const url = `https://spreadsheets.google.com/feeds/list/${id}/o8d9y2n/public/values?alt=json`;
    
        return this.http.get(url)
          .pipe(
            map((res: any) => {
              const data = res.feed.entry;
    
              const returnArray: Array<any> = [];
              if (data && data.length > 0) {
                data.forEach(entry => {
                  const obj = {};
                  for (const x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                      obj[x.split('$')[1]] = entry[x]['$t'];
                    }
                  }
                  returnArray.push(obj);
                });
              }
              return returnArray;
            })
          );
      }

      public getIron(): Observable<any> {
        const id = "1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4"
        const url = `https://spreadsheets.google.com/feeds/list/${id}/o6co1qp/public/values?alt=json`;
    
        return this.http.get(url)
          .pipe(
            map((res: any) => {
              const data = res.feed.entry;
    
              const returnArray: Array<any> = [];
              if (data && data.length > 0) {
                data.forEach(entry => {
                  const obj = {};
                  for (const x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                      obj[x.split('$')[1]] = entry[x]['$t'];
                    }
                  }
                  returnArray.push(obj);
                });
              }
              return returnArray;
            })
          );
      }
      
    }

   