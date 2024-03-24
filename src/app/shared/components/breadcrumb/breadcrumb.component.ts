import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input()
  title!: string;
  @Input()
  subtitle!: string;
  @Input()
  usuario!: string;
  @Input()
  codigoInforme!: string;
  @Input()
  cupon!: string;

  fecha : Date = new Date()
  @Input()
  items!: string[];
  @Input()
  active_item!: string;

  idEmployee = 0
  idSubscriber = 0

  constructor() {
    const auth = JSON.parse(localStorage.getItem('authCache')+'')
    const subscriberUser = JSON.parse(localStorage.getItem('subscriberUser') || '{}')
    if(auth){
      this.idEmployee = parseInt(auth.idEmployee)
      this.idSubscriber = 0
    }else if(!auth && subscriberUser){
      this.idSubscriber = parseInt(subscriberUser.id)
      this.idEmployee = 0
    }

  }
}
