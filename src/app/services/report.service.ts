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
}
