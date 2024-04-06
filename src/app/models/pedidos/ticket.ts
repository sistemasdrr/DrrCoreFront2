export interface CurrentTicket{
  intValue : number
  strValue : string
}
export interface Ticket{
  id : number
  number : number
  idSubscriber : number
  revealName : boolean
  nameRevealed : string
  referenceNumber : string
  language : string
  queryCredit : string
  timeLimit : string
  subscriberIndications : string
  aditionalData : string
  about : string
  orderDate : Date
  expireDate : Date
  realExpireDate : Date
  idContinent : number
  idCountry : number
  reportType : string
  procedureType : string
  idCompany : number
  idPerson : number
  busineesName : string
  comercialName : string
  taxType : string
  taxCode : string
  email : string
  address : string
  city : string
  telephone : string
  creditrisk : number
  enable : boolean
  requestedName : string
  price : number
  userFrom : string
}
export interface SearchSituation{
  idCompany : number
  idPerson : number
  oldCode : string
  name : string
  taxName : string
  taxCode : string
  telephone : string
  idCountry : number
  country : string
  flagCountry : string
}
export interface TicketsByCompanyOrPerson{
  id :number
  ticket : string
  idStatusTicket : string
  status : string
  color : string
  requestedName : string
  subscriberCode : string
  procedureType : string
  reportType : string
  language : string
  orderDate : string
  endDate : string
  dispatchDate : string
}
export interface TimeLineTicket{
  id : number
  assignedTo : string
  assignedToName : string
  date : string
  time : string
  status : string
  color : string
}
export interface TicketObservations{
  reportName : string
  subscriberCode : string
  supervisor : string
  nameSupervisor : string
}
export interface ReportType{
  typeReport : string
  lastSearchedDate : string
  listSameSearched : HistorialPedido[]
}
export interface HistorialPedido{
  isPending : boolean
  dispatchtDate : string
  typeReport : string
  ticketNumber : string
  requestedName : string
  dispatch : string
  subscriber : string
  procedure : string
  status : string
}

export interface ListTicket{
  id : number
  number : string
  idSubscriber : number
  language : string
  about : string
  idContinent : number
  idCountry : number
  idCompany : number
  idPerson : number
  creditrisk : number
  enable : boolean
  subscriberCode : string
  subscriberName : string
  subscriberCountry : string
  subscriberFlag : string
  queryCredit : string
  timeLimit : string
  asignedTo : string
  revealName : boolean
  nameRevealed : string
  referenceNumber : string
  aditionalData : string
  subscriberIndications : string
  busineesName : string
  comercialName : string
  requestedName : string
  taxType : string
  taxCode : string
  investigatedContinent : string
  investigatedCountry : string
  investigatedFlag : string
  city : string
  email : string
  address : string
  telephone : string
  reportType : string
  procedureType : string
  price : number
  orderDate : string
  expireDate : string
  realExpireDate : string
  dispatchDate : string
  quality : string
  status : string
  statusColor : string
  statusFinalOwner : string
  origen : string
}
export interface TicketListPending{
  id : number
  number : string
  name : string
  reportType : string
  procedureType : string
  orderDate : string
  realExpireDate : string
  expireDate : string
  receptor : number
  receptor2 : number
  commentary : string
  hasFiles : boolean
  files : any[]
}
export interface TicketQuery{
  idTicket: number,
  queryDate: Date,
  idSubscriber: number,
  subscriberName: string,
  language: string,
  email: string,
  message: string,
  status: number,
  report: string,
  response: string
}
export interface SendQuery{
    idTicket: number,
    queryDate: Date,
    idSubscriber: number,
    language: string,
    email: string,
    message: string,
    response:string,
    user:string
}

export interface SaveTicketAssignation{
  id : number
  idEmisor : number
  idReceptor : number
  commentary : string
}
export interface PersonalAssignation{
  id : number
  idEmployee : number
  idUserLogin : number
  fullname : string
  type : string
  code : string
  internal : boolean
}
export interface TicketFile{
  id : number
  name : string
  path : string
  extension : string
}
export interface TicketHistorySubscriber{
  id : number
  idCompany : number
  ticket : string
  name : string
  idCountry : number
  country : string
  flagCountry : string
  dispatchDate : string
}
