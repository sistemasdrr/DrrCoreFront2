import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddInvoiceAgent, GetAgentInvoice, InvoiceAgentList, InvoiceSubcriberList } from 'app/models/facturacion';
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

  GetInvoiceSubscriberList(startDate : string, endDate : string, month : number, year : number, idInvoiceState : number) : Observable<Response<InvoiceSubcriberList[]>>{
    return this.http.get<Response<InvoiceSubcriberList[]>>(this.url + this.controller + '/GetInvoiceSubscriberList?startDate='+startDate+'&endDate='+endDate+'&month='+month+'&year='+year+'&idInvoiceStatus='+idInvoiceState);
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
  CancelInvoiceToCollect(idAgentInvoice : number, cancelDate : string) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/CancelInvoiceToCollect?idAgentInvoice='+idAgentInvoice+'&cancelDate='+cancelDate,'');
  }
  AddInvoiceAgent(obj : AddInvoiceAgent) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/SaveInvoice',obj);
  }
}
