export interface InvoiceSubcriberListByBill{
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
export interface InvoiceSubcriberListToCollect{
  id : number
  invoiceCode : string
  idCurrency : number
  idSubscriber : number
  subscriberName : string
  subscriberCode : string
  invoiceEmitDate : Date | null
  details : InvoiceDetailsSubcriberToCollect[]
}
export interface InvoiceSubcriberListPaids{
  id : number
  idSubscriber : number
  subscriberName : string
  subscriberCode : string
  details : InvoiceDetailsSubcriberPaids[]
}

export interface InvoiceDetailsSubcriberToCollect{
  idSubscriberInvoiceDetails : number
  idSubscriberInvoice : number
  idTicket : number
  number : string
  requestedName : string
  orderDate : string
  dispatchDate : string
  referenceNUmber : string
  IdCountry : string
  country : string
  flagCountry : string
  procedureType : string
  reportType : string
  price : number
}
export interface InvoiceDetailsSubcriberPaids{
  idTicket : number
  number : string
  requestedName : string
  orderDate : string
  dispatchDate : string
  referenceNUmber : string
  IdCountry : string
  country : string
  flagCountry : string
  procedureType : string
  reportType : string
  price : number
}


export interface AddInvoiceSubscriber{
  invoiceCode : string
  invoiceDate : Date | null
  language : string
  idCurrency : number
  idSubscriber : number
  attendedByName : string
  attendedByEmail : string
  invoiceSubscriberList : InvoiceSubcriberListByBill[]
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
export interface GetPersonalToInvoice{
  idUser : number
  idEmployee : number
  type : string
  code : string
  firstName : string
  lastName : string
  idCountry : number
  country : string
  flagCountry : string
}
