import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Institution } from 'src/app/model/institution';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activer',
  templateUrl: './activer.component.html',
  styleUrls: ['./activer.component.scss']
})
export class ActiverComponent implements OnInit {

  institution = new Institution();
  formActiver!: FormGroup;
  currentDate: Date = new Date()

  constructor(
    private contratService: ContratInstitutionServiceService,
    private _route: ActivatedRoute,
    datePipe: DatePipe
  ){
    this.currentDate = new Date();
  }


  ngOnInit(): void {

    this._route.queryParams.subscribe(params=>{
      this.institution.codeInst = params['codeInst'];
      this.institution.nomInst = params['nomInst'];
      this.institution.adresseInst = params['adresseInst'];
      this.institution.typeArchitecture = params['typeArchitecture'];
      this.institution.dateCreation = params['dateCreation']
    })

    console.log(this.institution)

  }

  activerModule(codeinst: string){
    this.contratService.ActiverModule(codeinst).pipe(first()).subscribe({
      next: data =>{
        Swal.fire("Activation Réussie","Action réussie", "success")
      },
      error: error=> console.log(error)
    })
  }

  initForm(){

  }
}
