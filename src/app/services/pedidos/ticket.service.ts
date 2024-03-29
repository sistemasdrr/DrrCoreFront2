import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentTicket, ListTicket, ReportType, PersonalAssignation, SaveTicketAssignation, SendQuery, Ticket, TicketListPending, TicketQuery, TicketFile } from 'app/models/pedidos/ticket';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  url = environment.apiUrl
  controllerTicket = "/Ticket"

  constructor(private http : HttpClient) { }

  getTicketActual() : Observable<Response<CurrentTicket>>{
    return this.http.get<Response<CurrentTicket>>(this.url + this.controllerTicket + '/numberticket');
  }
  getNumTicketById(idTicket : number) : Observable<Response<string>>{
    return this.http.get<Response<string>>(this.url + this.controllerTicket + '/getNumTicketById?idTicket='+idTicket);
  }
  addTicket(obj : Ticket) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/add',obj);
  }
  getTipoReporte(id : number, type : string) : Observable<Response<ReportType>>{
    return this.http.get<Response<ReportType>>(this.url + this.controllerTicket + '/getreporttype?id='+id+'&type='+type);
  }
  uploadFile(idTicket : number, numCupon : string, file : File) : Observable<Response<ReportType>>{
    const formData = new FormData();
    formData.append('idTicket', idTicket.toString());
    formData.append('numCupon', numCupon.toString());
    formData.append('file', file, file.name);
    return this.http.post<Response<ReportType>>(this.url + this.controllerTicket + '/uploadFile?idTicket=' +idTicket+ '&numCupon='+numCupon, formData);
  }
  getTicketFiles(idTicket : number) : Observable<Response<TicketFile[]>>{
    return this.http.get<Response<TicketFile[]>>(this.url + this.controllerTicket + '/getFilesByIdTicket?idTicket='+idTicket);
  }
  downloadFile(path : string){
    return this.http.get(this.url + this.controllerTicket + '/getFileByPath?path='+path,{observe:'response',responseType:'blob'});
  }
  getList() : Observable<Response<ListTicket[]>>{
    return this.http.get<Response<ListTicket[]>>(this.url + this.controllerTicket + '/getList');
  }
  getListBy(ticket : string, name : string, subscriber : string, type : string, procedure : string) : Observable<Response<ListTicket[]>>{
    return this.http.get<Response<ListTicket[]>>(this.url + this.controllerTicket + '/getListby?ticket='+ticket+'&name='+name+'&subscriber='+subscriber+'&type='+type+'&procedure='+procedure);
  }
  getListPending() : Observable<Response<TicketListPending[]>>{
    return this.http.get<Response<TicketListPending[]>>(this.url + this.controllerTicket + '/getListPending');
  }
  getById(id : number) : Observable<Response<Ticket>>{
    return this.http.get<Response<Ticket>>(this.url + this.controllerTicket + '/getTicketById?id='+id);
  }
  deleteTicket(id : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/deleteTicket?id='+id,'');
  }
  getTicketQuery(idTicket:number) : Observable<Response<TicketQuery>>{
    return this.http.get<Response<TicketQuery>>(this.url + this.controllerTicket + '/getTicketQuery?idTicket='+idTicket);
  }
  sendQuery(obj : SendQuery) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/sendQuery',obj);
  }
  resolveQuery(idTicket:number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/answeredTicketQuery?idTicket='+idTicket,'');
  }
  downloadReport(){
    return this.http.get(this.url + this.controllerTicket + '/report',{observe:'response',responseType:'blob'});
  }

  savePreassign(list : SaveTicketAssignation[]) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/saveTicketPreassignations',list);
  }
  saveAndSendPreassign(list : SaveTicketAssignation[]) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/sendTicketPreassignations',list);
  }
  getTicketPreassigned(userTo : string) : Observable<Response<ListTicket[]>>{
    return this.http.get<Response<ListTicket[]>>(this.url + this.controllerTicket + '/getTicketPreassignToUser?userTo='+userTo);
  }
  getPersonalAssignation() : Observable<Response<PersonalAssignation[]>>{
    return this.http.get<Response<PersonalAssignation[]>>(this.url + this.controllerTicket + '/getPersonalAssignation');
  }
  getAgentAssignation() : Observable<Response<PersonalAssignation[]>>{
    return this.http.get<Response<PersonalAssignation[]>>(this.url + this.controllerTicket + '/getAgentAssignation');
  }
}
