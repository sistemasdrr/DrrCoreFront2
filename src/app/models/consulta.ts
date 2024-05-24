export interface Query1_1{
  idSubscriber : number
  subscriberName : string
  subscriberCode : string
  january : number
  february : number
  march : number
  april : number
  may : number
  june : number
  july : number
  august : number
  september : number
  october : number
  november : number
  december : number
  total : number
}
export interface Query1_1ByMonth{
  id : number
  requestedName : string
  idCountry : number
  country : string
  flagCountry : string
  orderDate : string
  dispatchDate : string
  procedureType : string
  reportType : string
  price : number
}

export interface Query1_2ByYear{
  idCountry : number
  country : string
  flagCountry : string
  january : number
  february : number
  march : number
  april : number
  may : number
  june : number
  july : number
  august : number
  september : number
  october : number
  november : number
  december : number
  total : number
}
export interface Query1_3BySubscriber{
  idCountry : number
  country : string
  flagCountry : string
  january : number
  february : number
  march : number
  april : number
  may : number
  june : number
  july : number
  august : number
  september : number
  october : number
  november : number
  december : number
  total : number
}

//4
export interface Query1_4Subscriber{
  idSubscriber : number
  name : string
  code : string
  idCountry : number
  country : string
  flagIso : string
}
export interface Query1_4{
  query1_4ByCountries : Query1_4Country[]
  query1_4ByProcedureType : Query1_4Procedure[]
  query1_4ByReportType : Query1_4ReportType[]
}

export interface Query1_4Country{
  idCountry : number
  country : string
  flagCountry : string
  january : number
  february : number
  march : number
  april : number
  may : number
  june : number
  july : number
  august : number
  september : number
  october : number
  november : number
  december : number
  total : number
}
export interface Query1_4Procedure{
  procedureType : string
  january : number
  february : number
  march : number
  april : number
  may : number
  june : number
  july : number
  august : number
  september : number
  october : number
  november : number
  december : number
  total : number
}
export interface Query1_4ReportType{
  reportType : string
  january : number
  february : number
  march : number
  april : number
  may : number
  june : number
  july : number
  august : number
  september : number
  october : number
  november : number
  december : number
  total : number
}

export interface Query1_5{
  idTicket : number
  orderDate : string
  expireDate : string
  requestedName : string
  businessName : string
  idCountry : number
  country : string
  flagCountry : string
  procedureType : string
  reportType : string
  idSubscriber : number
  subscriberName : string
  subscriberCode : string
  price : number
}

export interface Query1_6{
  idTicket : number
  orderDate : string
  expireDate : string
  requestedName : string
  businessName : string
  idCountry : number
  country : string
  flagCountry : string
  procedureType : string
  reportType : string
  idSubscriber : number
  subscriberName : string
  subscriberCode : string
  price : number
}

export interface Query1_7{
  idSubscriber : number
  code : string
  name : string
  idCountry : number
  country : string
  flagCountry : string
  contact : string
  email : string
  billingType : string
}

export interface Query1_8{
  idCountry : number
  country : string
  flagCountry : string
  quantity : number
}

export interface Query1_9{
  idSubscriber : number
  code : string
  name : string
  quantity : number
}

export interface Query1_10{
  idTicket : number
  orderDate : string
  expireDate : string
  dispatchDate : string
  requestedName : string
  idCountry : number
  country : string
  flagCountry : string
  procedureType : string
  reportType : string
  price : number
}

export interface Query1_11Subscriber{
  idSubscriber : number
  code : string
  name : string
  january : number
  february : number
  march : number
  april : number
  may : number
  june : number
  july : number
  august : number
  september : number
  october : number
  november : number
  december : number
  total : number
}
export interface Query1_11BySubscriber{
  idTicket : number
  requestedName : string
  idCountry : number
  country : string
  flagCountry : string
  orderDate : string
  dispatchDate : string
  procedureType : string
  reportType : string
  price : number
}
