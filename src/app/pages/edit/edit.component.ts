import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacancesService } from '../../services/vacances.service';
import { IVacanca } from '../../model/interfaces';
import { VacancaFormComponent } from '../../shared/components/vacanca-form/vacanca-form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [VacancaFormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {

  vacancesService = inject(VacancesService);

  vacanca!: IVacanca;

  buttonName = 'Editar';

  index!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.index = params['id'];
      this.vacanca = this.vacancesService.getVacancaByIndex(this.index);
      console.log(this.vacanca);
    })
  }

  editVacanca(v: IVacanca) {
    this.vacancesService.editVacanca(this.index, v);
    this.route.navigate(['/home']);
  }

}
