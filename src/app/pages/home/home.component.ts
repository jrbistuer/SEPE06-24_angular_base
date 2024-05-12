import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IVacanca } from '../../model/interfaces';
import { VacancesService } from '../../services/vacances.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  vacancesService = inject(VacancesService);

  vacances: IVacanca[] = []
  title;
  vacancaForm!: FormGroup;

  constructor() {
    console.log('constructor');
    this.title = 'Title';
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.title);
    this.getVacances();
    this.createForm();
  }

  getVacances() {
    this.vacances = this.vacancesService.getVacances();
  }

  createForm() {
    this.vacancaForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      preu: new FormControl(''),
      descripcio: new FormControl(''),
      actiu: new FormControl(''),
      user: new FormControl(''),
    });
  }

  saveVacanca() {
    console.log(this.vacancaForm);

    if(this.vacancaForm.valid) {
      const v: IVacanca = {
        nom: this.vacancaForm.get('nom')?.value,
        preu: +this.vacancaForm.get('preu')?.value,
        descripcio: this.vacancaForm.get('descripcio')?.value,
        actiu: true,
        user: this.vacancaForm.get('user')?.value,
      }
      this.vacancesService.setVacanca(v);
      this.getVacances();
    } else {
      console.log('INVALID!!!');
    }
    
  }

}
