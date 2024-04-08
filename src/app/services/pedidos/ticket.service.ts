import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentTicket, ListTicket, ReportType, PersonalAssignation, SaveTicketAssignation, SendQuery, Ticket, TicketListPending, TicketQuery, TicketFile, TicketHistorySubscriber, SearchSituation, TicketsByCompanyOrPerson, TimeLineTicket, TicketObservations } from 'app/models/pedidos/ticket';
import { Response } from 'app/models/response';
import { Asignacion } from 'app/views/pedidos/asignacion2/seleccionar-agente/seleccionar-agente.component';
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
  getTicketHistorySubscriber(idSubscriber : number, name : string, from : Date | null, until : Date | null, idCountry : number) : Observable<Response<TicketHistorySubscriber[]>>{
    const fromD = from === null ? '' : from?.toDateString()
    const untilD = until === null ? '' : until?.toDateString()
    return this.http.get<Response<TicketHistorySubscriber[]>>(this.url + this.controllerTicket + '/getTicketHistorySubscriber?idSubscriber='+idSubscriber+'&name='+name+'&from='+ fromD+'&until='+ untilD+'&idCountry='+idCountry);
  }
  getNumTicketById(idTicket : number) : Observable<Response<string>>{
    return this.http.get<Response<string>>(this.url + this.controllerTicket + '/getNumTicketById?idTicket='+idTicket);
  }
  addTicket(obj : Ticket) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/add',obj);
  }
  addTicketByWeb(obj : Ticket) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/addByWeb',obj);
  }
  addTicketOnline(obj : Ticket,rubro : string, sendTo : string) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/addOnline?rubro='+rubro+'&sendTo='+sendTo,obj);
  }
  getTipoReporte(id : number, type : string) : Observable<Response<ReportType>>{
    return this.http.get<Response<ReportType>>(this.url + this.controllerTicket + '/getreporttype?id='+id+'&type='+type);
  }
  getSearchSituation(about : string, typeSearch : string, search : string, idCountry : number) : Observable<Response<SearchSituation[]>>{
    return this.http.get<Response<SearchSituation[]>>(this.url + this.controllerTicket + '/getSearchSituation?about='+about+'&typeSearch='+typeSearch+'&search='+search+'&idCountry='+idCountry);
  }
  getTicketByCompanyOrPerson(about : string, id : number, oldCode : string) : Observable<Response<TicketsByCompanyOrPerson[]>>{
    return this.http.get<Response<TicketsByCompanyOrPerson[]>>(this.url + this.controllerTicket + '/getListTicketSituation?about='+about+'&id='+id+'&oldCode='+oldCode);
  }
  getTimeLine(idTicket : number) : Observable<Response<TimeLineTicket[]>>{
    return this.http.get<Response<TimeLineTicket[]>>(this.url + this.controllerTicket + '/getTimeLine?idTicket='+idTicket);
  }
  getTicketObservations(idTicket : number) : Observable<Response<TicketObservations>>{
    return this.http.get<Response<TicketObservations>>(this.url + this.controllerTicket + '/getTicketObservations?idTicket='+idTicket);
  }
  addTicketObservations(idTicket : number, indications : string, userFrom :string) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/addTicketObservations?idTicket='+idTicket+'&indications='+indications+'&userFrom='+userFrom,'');
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
  getListToDispatch() : Observable<Response<ListTicket[]>>{
    return this.http.get<Response<ListTicket[]>>(this.url + this.controllerTicket + '/getListToDispatch');
  }
  dispatchTicket(idTicket : number, idUser : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/DispatchTicket?idTicket='+idTicket+'&idUser='+idUser,'');
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
  resolveQuery(idTicket:number,response:string) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/answeredTicketQuery?idTicket='+idTicket+'&&response='+response,'');
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
  deleteTicketHistory(idTicket: number, assignedTo : string, numberAssign : number) : Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controllerTicket + '/deleteTicketHistory?idTicket='+idTicket+'&assignedTo='+assignedTo+'&numberAssign='+numberAssign);
  }
  getPersonalAssignation() : Observable<Response<PersonalAssignation[]>>{
    return this.http.get<Response<PersonalAssignation[]>>(this.url + this.controllerTicket + '/getPersonalAssignation');
  }
  getAgentAssignation() : Observable<Response<PersonalAssignation[]>>{
    return this.http.get<Response<PersonalAssignation[]>>(this.url + this.controllerTicket + '/getAgentAssignation');
  }
  sendAssignation(list : Asignacion[]) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/assignTicket',list);
  }

}
