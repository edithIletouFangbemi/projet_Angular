import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-institution',
  templateUrl: './gestion-institution.component.html',
  styleUrls: ['./gestion-institution.component.scss']
})
export class GestionInstitutionComponent {
  create: boolean = false;
  suite: boolean = false;

  nouveau(){
    this.create = !this.create;
  }

  suivant(){
    this.suite = !this.suite;
  }

  newInstitution(){
    this.create == false;
  }

}
