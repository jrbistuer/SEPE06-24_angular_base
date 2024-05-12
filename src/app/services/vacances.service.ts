import { Injectable } from '@angular/core';
import { IVacanca } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VacancesService {

  constructor() { }

  getVacances(): IVacanca[] {
    if (window.localStorage.getItem('vacances') !== null) {
      return JSON.parse(window.localStorage.getItem('vacances')!);
    } else {
      return [];
    }
  }

  setVacanca(vacanca: IVacanca) {
    const vacances = this.getVacances();
    vacances.push(vacanca);
    window.localStorage.setItem('vacances', JSON.stringify(vacances));
  }

}
