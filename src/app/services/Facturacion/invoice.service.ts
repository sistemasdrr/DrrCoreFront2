import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Query5_1_2ByCycle, Query5_1_2Tickets } from 'app/models/consulta';
import { AddInvoiceAgent, AddInvoiceSubscriber, GetAgentInvoice, GetPersonalToInvoice, InvoiceAgentList, InvoiceSubcriberListByBill, InvoiceSubcriberListPaids, InvoiceSubcriberListToCollect, NewAgentInvoice } from 'app/models/facturacion';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url = environment.apiUrl
  controller = "/Invoice"

  constructor(private http : HttpClient) { }

  GetInvoiceSubscriberListByBill(startDate : string, endDate : string) : Observable<Response<InvoiceSubcriberListByBill[]>>{
    return this.http.get<Response<InvoiceSubcriberListByBill[]>>(this.url + this.controller + '/GetInvoiceSubscriberListByBill?startDate='+startDate+'&endDate='+endDate);
  }
  GetInvoiceSubscriberListToCollect(month : number, year : number) : Observable<Response<InvoiceSubcriberListToCollect[]>>{
    return this.http.get<Response<InvoiceSubcriberListToCollect[]>>(this.url + this.controller + '/GetInvoiceSubscriberListToCollect?month='+month+'&year='+year);
  }
  GetInvoiceSubscriberListPaids(month : number, year : number) : Observable<Response<InvoiceSubcriberListPaids[]>>{
    return this.http.get<Response<InvoiceSubcriberListPaids[]>>(this.url + this.controller + '/GetInvoiceSubscriberListPaids?month='+month+'&year='+year);
  }
  UpdateSubscriberTicket(idTicket : number, requestedName : string, procedureType : string, dispatchDate : string, price : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/UpdateSubscriberTicket?idTicket='+idTicket+'&requestedName='+requestedName+'&procedureType='+procedureType+'&dispatchDate='+dispatchDate+'&price='+price,'');
  }
  UpdateSubscriberInvoiceToCollect(idSubscriberInvoice : number, idSubscriberInvoiceDetails : number, requestedName : string, procedureType : string, dispatchDate : string, price : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/UpdateSubscriberInvoiceToCollect?idSubscriberInvoice='+idSubscriberInvoice+'&idSubscriberInvoiceDetails='+idSubscriberInvoiceDetails+'&requestedName='+requestedName+'&procedureType='+procedureType+'&dispatchDate='+dispatchDate+'&price='+price,'');
  }
  CancelSubscriberInvoiceToCollect(idSubscriberInvoice : number, cancelDate : string) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/CancelSubscriberInvoiceToCollect?idSubscriberInvoice='+idSubscriberInvoice+'&cancelDate='+cancelDate,'');
  }
  AddSubscriberInvoice(obj : AddInvoiceSubscriber) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/SaveSubscriberInvoice',obj);
  }
  GetExcelAgentInvoice(code : string, startDate : string, endDate : string){
    return this.http.get(this.url + this.controller + '/GetExcelAgentInvoice?code='+code+'&startDate='+startDate+'&endDate='+endDate,{observe:'response',responseType:'blob'});
  }

  GetAgentPrice(idCountry : number,asignedTo: string,quality : string,procedureType : string,hasBalance : boolean, idSpecialPrice : number) : Observable<Response<number>>{
    return this.http.get<Response<number>>(this.url + this.controller + '/GetAgentPrice?idCountry='+idCountry+'&asignedTo='+asignedTo+'&quality='+quality+'&procedureType='+procedureType+'&hasBalance='+hasBalance+'&idSpecialPrice='+idSpecialPrice);
  }
  GetAgentInvoice(code : string,startDate : string, endDate : string) : Observable<Response<NewAgentInvoice[]>>{
    return this.http.get<Response<NewAgentInvoice[]>>(this.url + this.controller + '/GetAgentInvoice?code='+code+'&startDate='+startDate+'&endDate='+endDate);
  }
  GetByBillInvoiceAgentList(startDate : string, endDate : string) : Observable<Response<InvoiceAgentList[]>>{
    return this.http.get<Response<InvoiceAgentList[]>>(this.url + this.controller + '/GetByBillInvoiceAgentList?startDate='+startDate+'&endDate='+endDate);
  }
  GetToCollectInvoiceAgentList(startDate : string, endDate : string) : Observable<Response<GetAgentInvoice[]>>{
    return this.http.get<Response<GetAgentInvoice[]>>(this.url + this.controller + '/GetToCollectInvoiceAgentList?startDate='+startDate+'&endDate='+endDate);
  }
  GetPaidsInvoiceAgentList(startDate : string, endDate : string) : Observable<Response<GetAgentInvoice[]>>{
    return this.http.get<Response<GetAgentInvoice[]>>(this.url + this.controller + '/GetPaidsInvoiceAgentList?startDate='+startDate+'&endDate='+endDate);
  }
  UpdateAgentTicket(idTicketHistory : number, requestedName : string, procedureType : string, shippingDate : string, quality : string, hasBalance : boolean, idSpecialPrice : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/UpdateAgentTicket?idTicketHistory='+idTicketHistory+'&requestedName='+requestedName+'&procedureType='+procedureType+'&shippingDate='+shippingDate+'&quality='+quality+'&hasBalance='+hasBalance+'&idSpecialPrice='+idSpecialPrice,'');
  }
  UpdateAgentInvoiceToCollect(idAgentInvoice : number, idAgentInvoiceDetails : number, requestedName : string, procedureType : string, shippingDate : string, price : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/UpdateInvoiceToCollect?idAgentInvoice='+idAgentInvoice+'&idAgentInvoiceDetails='+idAgentInvoiceDetails+'&requestedName='+requestedName+'&procedureType='+procedureType+'&shippingDate='+shippingDate+'&price='+price,'');
  }
  CancelAgentInvoiceToCollect(idAgentInvoice : number, cancelDate : string) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/CancelAgentInvoiceToCollect?idAgentInvoice='+idAgentInvoice+'&cancelDate='+cancelDate,'');
  }
  AddInvoiceAgent(obj : AddInvoiceAgent) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/SaveAgentInvoice',obj);
  }

  GetPersonalToInvoice() : Observable<Response<GetPersonalToInvoice[]>>{
    return this.http.get<Response<GetPersonalToInvoice[]>>(this.url + this.controller + '/GetPersonalToInvoice');
  }

  SaveInternalInvoice(type : string, code : string,currentCycle : string, totalPrice : number, tickets : Query5_1_2Tickets[]) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/SaveInternalInvoice?type='+type+'&code='+code+'&currentCycle='+currentCycle+'&totalPrice='+totalPrice,tickets);
  }
  ReportEmployee(idUser : number, code : string, type : string, cycle : string) : Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controller + '/ReportEmployee?idUser='+idUser+'&code='+code+'&type='+type+'&cycle='+cycle);
  }
}
