export interface Query5_1_1
{
  subscribersList : Query5_1_1Subscribers[]
  countriesList : Query5_1_1Countries[]
  procedureType : Query5_1_1Procedure
  reportType : Query5_1_1Report
}

export interface Query5_1_1Subscribers{
  code : string
  name : string
  country : string
  flagCountry : string
  quantity : number
}
export interface Query5_1_1Countries{
  country : string
  flagCountry : string
  quantity : number
}
export interface Query5_1_1Procedure{
  t1 : number
  t2 : number
  t3 : number
}
export interface Query5_1_1Report{
  or : number
  rv : number
  ef : number
}
