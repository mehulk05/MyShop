import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetfilterFromCSVService {
  public userArray: any[] = [];
  constructor(private http: HttpClient) { }

  public getCookerFilter(): Observable<any> {
    const id = "10xN7JKMC8sxoDM03J5dLq9DFyQPgeVSD2jOWafjw1-k"
    const url = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          let returnArray:any
          if (data && data.length > 0) {
            returnArray=    this.getDataFromRawCSV(data)
          }
          console.log(returnArray)
          return returnArray;
        })
      );
  }
  public getMixerFilter(): Observable<any> {
    const id = "10xN7JKMC8sxoDM03J5dLq9DFyQPgeVSD2jOWafjw1-k"
    const url = `https://spreadsheets.google.com/feeds/list/${id}/ouxitw1/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          let returnArray:any
          if (data && data.length > 0) {
            returnArray=    this.getDataFromRawCSV(data)
          }
          console.log(returnArray)
          return returnArray;
        })
      );
  }
  public getBlenderFilter(): Observable<any> {
    const id = "10xN7JKMC8sxoDM03J5dLq9DFyQPgeVSD2jOWafjw1-k"
    const url = `https://spreadsheets.google.com/feeds/list/${id}/oyk0acd/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          let returnArray:any
          if (data && data.length > 0) {
            returnArray=    this.getDataFromRawCSV(data)
          }
          console.log(returnArray)
          return returnArray;
        })
      );
  }
  public getIronFilter(): Observable<any> {
    const id = "10xN7JKMC8sxoDM03J5dLq9DFyQPgeVSD2jOWafjw1-k"
    const url = `https://spreadsheets.google.com/feeds/list/${id}/o6r0elt/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          let returnArray:any
          if (data && data.length > 0) {
            returnArray=    this.getDataFromRawCSV(data)
          }
          console.log(returnArray)
          return returnArray;
        })
      );
  }
  public getMopFilter(): Observable<any> {
    const id = "10xN7JKMC8sxoDM03J5dLq9DFyQPgeVSD2jOWafjw1-k"
    const url = `https://spreadsheets.google.com/feeds/list/${id}/ojdjddd/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          let returnArray:any
          if (data && data.length > 0) {
            returnArray=    this.getDataFromRawCSV(data)
          }
          console.log(returnArray)
          return returnArray;
        })
      );
  }
  public getStoveFilter(): Observable<any> {
    const id = "10xN7JKMC8sxoDM03J5dLq9DFyQPgeVSD2jOWafjw1-k"
    const url = `https://spreadsheets.google.com/feeds/list/${id}/ok2ilvf/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          let returnArray:any
          if (data && data.length > 0) {
            returnArray=    this.getDataFromRawCSV(data)
          }
          console.log(returnArray)
          return returnArray;
        })
      );
  }

   public getLatestProducts(): Observable<any> {
    const id = "1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4"
    const url = `https://spreadsheets.google.com/feeds/list/${id}/ovolh3d/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          let returnArray:any
          if (data && data.length > 0) {
            returnArray=    this.getDataFromRawCSV(data)
          }
          console.log(returnArray)
          return returnArray;
        })
      );
  }


  getDataFromRawCSV(data){

    const returnArray: Array<any> = [];
    data.forEach(entry => {
      const obj = {};
      for (const x in entry) {
        if (x.includes('gsx$') && entry[x].$t) {
          obj[x.split('$')[1]] = entry[x]['$t'];
        }
      }
      returnArray.push(obj);
    });
    return returnArray
  }
}
