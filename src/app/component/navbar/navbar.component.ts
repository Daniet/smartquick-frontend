import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name:String = null
  role:String = null
  isSession:boolean = false

  constructor(
    private _apiService: ApiService,
    private _router: Router,
  ) {
    this.isSession = this._apiService.isSession
  }

  ngOnInit(): void {
    this._apiService.onSession().subscribe(session => {
      if (session != undefined) {
        this.isSession = true
        this.name = session['name']
        this.role = session['role']
      } else {
        this.isSession = false
        this._router.navigateByUrl('')
      }
    })
    if (this.isSession) this._apiService.getSession()
  }

  logout() {
    this._apiService.logout()
  }

}
