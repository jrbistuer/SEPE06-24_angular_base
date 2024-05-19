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
    this.saveVacances(vacances);
  }

  editVacanca(i: number, v: IVacanca) {
    const vacances = this.getVacances();
    vacances[i] = v;
    this.saveVacances(vacances);
  }

  getVacancaByIndex(index: number) {
    const vacances = this.getVacances();
    return vacances[index];
  }

  removeVacancaByIndex(index: number) {
    const vacances = this.getVacances();
    vacances.splice(index, 1);
    this.saveVacances(vacances);
  }

  private saveVacances(vacances: IVacanca[]) {
    window.localStorage.setItem('vacances', JSON.stringify(vacances));
  }

}
