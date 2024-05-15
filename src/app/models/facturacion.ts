export interface InvoiceSubcriberList{
  idTicket : number
  number : string
  requestedName : string
  dispatchedName : string
  orderDate : string
  expireDate : string
  dispatchDate : string
  procedureType : string
  reportType : string
  idCountry : number
  country : string
  flagCountry : string
  price : number
  idSubscriber : number
  subscriberName : string
  subscriberCode : string
  idInvoiceState : number
}
export interface InvoiceAgentList{
  idTicket : number
  idTicketHistory : number
  number : string
  requestedName : string
  dispatchedName : string
  orderDate : string
  expireDate : string
  shippingDate : string
  procedureType : string
  reportType : string
  idCountry : number
  country : string
  flagCountry : string
  price : number
  idAgent : number
  agentName : string
  agentCode : string
}
export interface AddInvoiceAgent{
  invoiceCode : string
  invoiceDate : Date | null
  language : string
  idCurrency : number
  idAgent : number
  agentCode : string
  idCountry : number
  attendedByName : string
  attendedByEmail : string
  invoiceAgentList : InvoiceAgentList[]
}


export interface GetAgentInvoice{
  id : number
  invoiceCode : string
  idAgent : number
  agentCode : string
  agentName : string
  idCurrency : number
  details : AgentInvoiceDetails[]
}

export interface AgentInvoiceDetails{
  id : number
  idAgentInvoice : number
  requestedName : string
  businessName : string
  orderDate : string
  shippingDate : string
  expireDate : string
  idCountry : number
  country : string
  flagCountry : string
  procedureType : string
  quality : string
  price : number
}
