import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  medals = []
  tableMedals = []

  totals = { gold: 0, silver: 0, bronze: 0, total: 0 }
  medalsCategories = { gold: {}, silver: {}, bronze: {} }
  listCategoriesMedals = ['bronze', 'silver', 'gold']

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.getData().then(r => {
      for (let x in r) {
        this.totals['gold'] += r[x]['gold']
        this.totals['silver'] += r[x]['silver']
        this.totals['bronze'] += r[x]['bronze']
        this.totals['total'] += r[x]['total']
        this.setMedalsSport('gold', r[x]['sport'], r[x]['gold'])
        this.setMedalsSport('silver', r[x]['sport'], r[x]['silver'])
        this.setMedalsSport('bronze', r[x]['sport'], r[x]['bronze'])

      }
      // for (let x = 0; x < 25; x++) tableMedals[x] = this.medals[x]
    })
  }

  setMedalsSport(medal, sport, cant) {
    if (Object.keys(this.medalsCategories[medal]).indexOf(sport) >= 0) {
      this.medalsCategories[medal][sport] += cant
    } else this.medalsCategories[medal][sport] = cant
  }

  log(value) {
    console.log(value)
  }
}
