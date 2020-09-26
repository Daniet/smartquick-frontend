import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private session
  public isSession = false

  constructor() {
    this.session = new Subject<any>()
    this.isSession = sessionStorage.getItem('role') != null
  }

  roles = {
    'coordinador': { name: 'Daniel', role: 'coordinador', page: 'maintenance' },
    'administrador': { name: 'Andrés', role: 'administrador', page: 'home' },
  }

  login (role) {
    const rolesKeys = Object.keys(this.roles)
    console.log(rolesKeys, rolesKeys.indexOf(role))
    if (rolesKeys.indexOf(role) >= 0) {
      sessionStorage.setItem('role', role)
      this.session.next(this.roles[role])
      return this.roles[role].page
    } else return ''
  }

  logout() {
    this.isSession = false
    sessionStorage.clear()
    this.session.next(undefined)
  }

  onSession() {
    return this.session.asObservable()
  }

  getSession() {
    let role = sessionStorage.getItem('role')
    this.session.next(this.roles[role])
  }

  getData () {
    return fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json')
    .then( r => r.json())
  }
}
