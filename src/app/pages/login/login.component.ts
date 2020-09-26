import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  profileForm = this._formBuilder.group({
    role: ['', Validators.required],
  })

  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let role = this.profileForm.value.role.toLowerCase()
    let page = this._apiService.login(role)
    if (page == '') console.log('no login')
    else this._router.navigateByUrl(page)
  }

}
