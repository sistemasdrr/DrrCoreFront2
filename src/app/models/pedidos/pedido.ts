import { Adjunto } from "../adjunto"
import { Pais } from "../combo"
import { TicketHistory } from "./asignacion/ticketHistory"

export interface Pedido {
  id: number
  cupon: string
  informeEP : string
  idioma : string
  codigoInforme: string
  estadoPedido : string
  tipoInforme: string
  tipoTramite : string
  calidad: string
  fechaIngreso: string
  fechaVencimiento: string
  fechaVencimientoReal: string
  fechaDescarga: string

  //ABONADO
  idAbonado : string
  nombre : string
  codigo : string
  revelarNombre : boolean
  pais : Pais
  codigoPais : string,
  estado : string
  nroReferencia : string
  creditoConsultado : string
  indicaciones : string
  dtsAdicionales : string

  //DATOS EMPRESA
  nombreRealEmpresa : string
  nombreSolicitadoEmpresa : string
  tipoRT : string
  codigoRT : string
  continenteEmpresa : number
  paisEmpresa : Pais
  ciudadEmpresa : string
  direccionEmpresa : string
  correoEmpresa : string
  telefonoEmpresa : string

  //DATOS PERSONA
  precioInforme: number
  //ASIGNACIONES
  asignacion : TicketHistory[]
  adjuntos : Adjunto[]
}

export interface Order {
  id : number
  language : string
  typeOrder : string
  typeReport: string
  dateReport: string

  startDate : string
  expirationDate : string
  realExpirationDate : string

  //Abonado
  idAbonado : number
  referenceNumber : number
  creditAmount : number
  terms : string

  idCompany : number
  idPerson : number
}
export interface OrderT{
  id : number
  couponNumber : number
  name : string
  idSubscriber : number
  status : string
  reportType : string
  procedureType : string
  quality : string
  startDate : string
  endDate : string
  downloadDate : string
}
