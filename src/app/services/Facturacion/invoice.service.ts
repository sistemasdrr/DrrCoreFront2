import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddInvoiceAgent, AddInvoiceSubscriber, GetAgentInvoice, InvoiceAgentList, InvoiceSubcriberListByBill, InvoiceSubcriberListPaids, InvoiceSubcriberListToCollect } from 'app/models/facturacion';
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



  GetByBillInvoiceAgentList(startDate : string, endDate : string) : Observable<Response<InvoiceAgentList[]>>{
    return this.http.get<Response<InvoiceAgentList[]>>(this.url + this.controller + '/GetByBillInvoiceAgentList?startDate='+startDate+'&endDate='+endDate);
  }
  GetToCollectInvoiceAgentList(startDate : string, endDate : string) : Observable<Response<GetAgentInvoice[]>>{
    return this.http.get<Response<GetAgentInvoice[]>>(this.url + this.controller + '/GetToCollectInvoiceAgentList?startDate='+startDate+'&endDate='+endDate);
  }
  GetPaidsInvoiceAgentList(startDate : string, endDate : string) : Observable<Response<GetAgentInvoice[]>>{
    return this.http.get<Response<GetAgentInvoice[]>>(this.url + this.controller + '/GetPaidsInvoiceAgentList?startDate='+startDate+'&endDate='+endDate);
  }
  UpdateAgentTicket(idTicketHistory : number, requestedName : string, procedureType : string, shippingDate : string) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/UpdateAgentTicket?idTicketHistory='+idTicketHistory+'&requestedName='+requestedName+'&procedureType='+procedureType+'&shippingDate='+shippingDate,'');
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
}
