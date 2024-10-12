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
  DownloadReport6_1_5(idSubscriber : number){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_5?idSubscriber='+idSubscriber,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_7(orderBy : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_7?orderBy='+orderBy,{observe:'response',responseType:'blob'});
  }
  DownloadReport6_1_14(type : string){
    return this.http.get(this.url + this.controller + '/DownloadReport6_1_14?type='+type,{observe:'response',responseType:'blob'});
  }
}
