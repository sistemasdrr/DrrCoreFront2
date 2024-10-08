
export interface Company{
  id : number
  oldCode : string
  name : string
  socialName : string
  lastSearched : string
  language : string
  typeRegister : string
  yearFundation : string
  quality : string
  idLegalPersonType : number
  taxTypeName : string
  taxTypeCode : string
  idLegalRegisterSituation : number
  address : string
  duration : string
  place : string
  idCountry : number
  idContinent : number
  subTelephone : string
  cellphone : string
  telephone : string
  postalCode : string
  whatsappPhone : string
  email : string
  webPage : string
  idCreditRisk : number
  idPaymentPolicy : number
  idReputation : number
  lastUpdaterUser : number
  reputationComentary : string
  newsComentary : string
  identificacionCommentary : string
  enable : boolean
  traductions : Traduction[]
  print : boolean
  since : string
}
export interface TCompany{
  id : number
  name : string
  socialName : string
  code : string
  creditRisk : string
  telephone : string
  language : string
  traductionPercentage : number
  lastReportDate : string
  country : string
  flagCountry : string
  isoCountry : string
  taxNumber : string
  quality : string
  manager : string
  onWeb : boolean
}
export interface WCompany{
  id : number
  oldCode : string
  name : string
  socialName : string
  lastSearched : string
  language : string
  yearFundation : string
  quality : string
  taxTypeName : string
  taxTypeCode : string
  address : string
  place : string
  idCountry : string
  country : string
  flagCountry : string
  haveBalance : string
  balanceDate : string
}
export interface data {
  name: string;
}
export interface SituacionRuc {
  id : number
  description : string
}
export interface PersoneriaJuridica {
  id : number
  description : string
}
export interface Reputacion {
  id : number
  description : string
}
export interface Duracion {
  id : number
  description : string
}
export interface Traduction{
  key : string
  value : string
}
export interface StatusCompany {
  company : boolean
  background : boolean
  branch : boolean
  financial : boolean
  balance : boolean
  sbs : boolean
  opinion : boolean
  infoGeneral : boolean
  images : boolean
}
