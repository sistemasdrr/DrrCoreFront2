import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Query1_1, Query1_10, Query1_11BySubscriber, Query1_11Subscriber, Query1_1ByMonth, Query1_2ByYear, Query1_3BySubscriber, Query1_4, Query1_5, Query1_6, Query1_7, Query1_8, Query1_9 } from 'app/models/consulta';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url = environment.apiUrl
  controller = "/Query"

  constructor(private http : HttpClient) { }

  GetQuery1_1ByYear(year : number) : Observable<Response<Query1_1[]>>{
    return this.http.get<Response<Query1_1[]>>(this.url + this.controller + '/GetQuery1_1ByYear?year='+year);
  }
  GetQuery1_1ByMonth(month : number, idSubscriber : number) : Observable<Response<Query1_1ByMonth[]>>{
    return this.http.get<Response<Query1_1ByMonth[]>>(this.url + this.controller + '/GetQuery1_1ByMonth?month='+month+'&idSubscriber='+idSubscriber);
  }
  GetQuery1_2ByYear(year : number) : Observable<Response<Query1_2ByYear[]>>{
    return this.http.get<Response<Query1_2ByYear[]>>(this.url + this.controller + '/GetQuery1_2ByYear?year='+year);
  }
  GetQuery1_3BySubscriber(idSubscriber: number, year : number) : Observable<Response<Query1_3BySubscriber[]>>{
    return this.http.get<Response<Query1_3BySubscriber[]>>(this.url + this.controller + '/GetQuery1_3BySubscriber?idSubscriber='+idSubscriber+'&year='+year);
  }
  GetQuery1_4(idSubscriber: number, year : number) : Observable<Response<Query1_4[]>>{
    return this.http.get<Response<Query1_4[]>>(this.url + this.controller + '/GetQuery1_4?idSubscriber='+idSubscriber+'&year='+year);
  }
  GetQuery1_5(startDate: string, endDate : string) : Observable<Response<Query1_5[]>>{
    return this.http.get<Response<Query1_5[]>>(this.url + this.controller + '/GetQuery1_5?startDate='+startDate+'&endDate='+endDate);
  }
  GetQuery1_6BySubscriber() : Observable<Response<Query1_6[]>>{
    return this.http.get<Response<Query1_6[]>>(this.url + this.controller + '/GetQuery1_6BySubscriber');
  }
  GetQuery1_7Subscriber() : Observable<Response<Query1_7[]>>{
    return this.http.get<Response<Query1_7[]>>(this.url + this.controller + '/GetQuery1_7Subscriber');
  }
  GetQuery1_8(year : number, month : string) : Observable<Response<Query1_8[]>>{
    return this.http.get<Response<Query1_8[]>>(this.url + this.controller + '/GetQuery1_8?year='+year+'&month='+month);
  }
  GetQuery1_9(year : number, month : string) : Observable<Response<Query1_9[]>>{
    return this.http.get<Response<Query1_9[]>>(this.url + this.controller + '/GetQuery1_9?year='+year+'&month='+month);
  }
  GetQuery1_10(idSubscriber : number, startDate: string, endDate : string) : Observable<Response<Query1_10[]>>{
    return this.http.get<Response<Query1_10[]>>(this.url + this.controller + '/GetQuery1_10?idSubscriber='+idSubscriber+'&startDate='+startDate+'&endDate='+endDate);
  }
  GetQuery1_11Subscriber(year : number) : Observable<Response<Query1_11Subscriber[]>>{
    return this.http.get<Response<Query1_11Subscriber[]>>(this.url + this.controller + '/GetQuery1_11Subscriber?year='+year);
  }
  GetQuery1_11BySubscriber(idSubscriber : number, year : number, month : number) : Observable<Response<Query1_11BySubscriber[]>>{
    return this.http.get<Response<Query1_11BySubscriber[]>>(this.url + this.controller + '/GetQuery1_11BySubscriber?idSubscriber='+idSubscriber+'&year='+year+'&month='+month);
  }
}
