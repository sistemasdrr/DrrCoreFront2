export interface ComboData{
  id : number
  valor : string
}
export interface ComboData2{
  id : number
  valor : string
  reportCommentWithBalance : string
  reportCommentWithoutBalance : string
}
export interface ComboData3{
  id : number
  valor : string
  valorEng : string
}
export interface ComboData4{
  id : number
  valor : string
  flag : boolean
}
export interface ComboDataName{
  id : number
  name : string
  valor : string
}
export interface ComboDataCode{
  id : number
  valor : string
  valorEng : string
  code : string
}
export interface RiesgoCrediticio{
  id : number
  abreviation : string
  color : string
  identifier : string
  rate : number
  valor : string
}

export interface Reputacion{
  id : number
  color : string
  valor : string
}
export interface PoliticaPagos{
  id : number
  color : string
  valor : string
}
export interface Pais{
  id : number
  valor : string
  abreviation : string
  bandera : string
  regtrib : string
  codCel : string
}
