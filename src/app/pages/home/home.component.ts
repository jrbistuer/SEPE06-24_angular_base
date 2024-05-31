import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { IVacanca } from '../../model/interfaces';
import { VacancesService } from '../../services/vacances.service';
import { VacancaFormComponent } from '../../shared/components/vacanca-form/vacanca-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from '../../shared/components/basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, VacancaFormComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  vacancesService = inject(VacancesService);

  vacances: IVacanca[] = []
  title;
  buttonName = 'Guardar';

  constructor(private router: Router,
    public dialog: MatDialog
  ) {
    console.log('constructor');
    this.title = 'Title';
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.title);
    this.getVacances();
  }

  getVacances() {
   // this.vacances = this.vacancesService.getVacances();
   this.vacancesService.getVacances().subscribe((vacances: IVacanca[]) => {
      this.vacances = vacances;
      console.log(this.vacances);
      
   })
  }

  saveVacanca(v: IVacanca) {
    this.vacancesService.setVacanca(v);
    this.getVacances();
  }

  goToEdit(index: number) {
    console.log(index);
    this.router.navigate(['/private/edit', index]);
  }

  removeItem(index: number) {
    const dialogRef = this.dialog.open(BasicDialogComponent, {
      data: {message: 'Estás segur de voler eliminar aquesta vacanca?'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result) {
        this.vacancesService.removeVacancaByIndex(index);
        this.getVacances();  
      }
    });
  }


}
