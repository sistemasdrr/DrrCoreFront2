import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  url = environment.apiUrl
  controller = "/Report"
  constructor(private http : HttpClient) {
  }
  DownloadReport6_1_5(idSubscriber : number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_5?idSubscriber='+idSubscriber+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_7(orderBy : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_7?orderBy='+orderBy+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_14(type : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_14?type='+type+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_15(idCountry : number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_15?idCountry='+idCountry+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_18(idCountry : number, year : number,format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_18?idCountry='+idCountry+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_19_1(month : number, year : number,format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_19_1?month='+month+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_19_2(month : number, year : number,format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_19_2?month='+month+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_20(month : number, year : number,format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_20?month='+month+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_21(month : number, year : number,orderBy : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_21?month='+month+'&year='+year+'&orderBy='+orderBy+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_22(year : number,orderBy : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_22?year='+year+'&orderBy='+orderBy+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_25(format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_25?format='+format,{observe:'response',responseType:'blob'});
  }

  DownloadReport6_2_1(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_2_1?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_2_2(code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_2_2?code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_2_3(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_2_3?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_2_4(month : number, year : number ,orderBy : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_2_4?month='+month+'&year='+year+'&orderBy='+orderBy+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_0(format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_0?format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_1(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_1?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_2(code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_2?code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_3(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_3?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_4(month : number, year : number ,orderBy : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_4?month='+month+'&year='+year+'&orderBy='+orderBy+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_5(format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_5?format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_6(code : string, year : number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_6?code='+code+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_7(code : string, month : number ,year :number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_7?code='+code+'&month='+month+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_8(type : string ,year :number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_8?type='+type+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_11(code : string ,year :number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_11?code='+code+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_4_1(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_4_1?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_4_2(code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_4_2?code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_4_3(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_4_3?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_4_4(month : number, year : number ,orderBy : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_4_4?month='+month+'&year='+year+'&orderBy='+orderBy+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_5_1(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_5_1?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_5_2(code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_5_2?code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_5_3(startDate : string, endDate : string ,code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_5_3?startDate='+startDate+'&endDate='+endDate+'&code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_5_4(month : number, year : number ,orderBy : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_5_4?month='+month+'&year='+year+'&orderBy='+orderBy+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_6_1(code : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_6_1?code='+code+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport5_1_2(year : number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport5_1_2?year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_7Ger(orderBy : string, type : string, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_7Ger?orderBy='+orderBy+'&type='+type+'&format='+format,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_3_10(code : string, year : number, format : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_3_10?code='+code+'&year='+year+'&format='+format,{observe:'response',responseType:'blob'});
  }
}
