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
  idSubscriber : number
  name : string
  code : string
  idCountry : number
  country : string
  flagIso : string
}
export interface Query1_6ByIdSubscriber{
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
  subscriberCountry : string
  subscriberFlagCountry : string
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
export interface Query1_7Tickets{
  idTicket : number
  orderDate : string
  expireDate : string
  requestedName : string
  referenceCode : string
  idCountry : number
  country : string
  flagCountry : string
  procedureType : string
  reportType : string
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

export interface GetReporters{
  asignedTo : string
  name : string
}

export interface Query2_1ByYear{
  idEmployee : number
  name : string
  code : string
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
export interface Query2_1ByMonth{
  id : number
  requestedName : string
  idCountry : number
  country : string
  flagCountry : string
  idSubscriber : number
  subscriberName : string
  subscriberCode : string
  orderDate : string
  expireDate : string
  shippingDate : string
  procedureType : string
  reportType : string
}
export interface Query2_2Months{
  idCountry : number
  country : string
  flagCountry : string
  day1 : number
  day2 : number
  day3 : number
  day4 : number
  day5 : number
  day6 : number
  day7 : number
  day8 : number
  day9 : number
  day10 : number
  day11 : number
  day12 : number
  day13 : number
  day14 : number
  day15 : number
  day16 : number
  day17 : number
  day18 : number
  day19 : number
  day20 : number
  day21 : number
  day22 : number
  day23 : number
  day24 : number
  day25 : number
  day26 : number
  day27 : number
  day28 : number
  day29 : number
  day30 : number
  day31 : number
}
export interface Query2_2ByYear{
  idCountry : number
  country : string
  flagCountry : string
  january : number
  month1 : Query2_2Months
  february : number
  month2 : Query2_2Months
  march : number
  month3 : Query2_2Months
  april : number
  month4 : Query2_2Months
  may : number
  month5 : Query2_2Months
  june : number
  month6 : Query2_2Months
  july : number
  month7 : Query2_2Months
  august : number
  month8 : Query2_2Months
  september : number
  month9 : Query2_2Months
  october : number
  month10 : Query2_2Months
  november : number
  month11 : Query2_2Months
  december : number
  month12 : Query2_2Months
  total : number
}

export interface Query3_1ByYear{
  asignedTo : string
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
export interface Query3_1ByMonth{
  requestedName : string
  idCountry : number
  country : string
  flagCountry : string
  emitInvoiceDate : string
  orderDate : string
  dispatchDate : string
  expireDate : string
  procedureType : string
  reportType : string
  price : number
}
export interface Query4_1{
  idSubscriber : number
  name : string
  code : string
}


