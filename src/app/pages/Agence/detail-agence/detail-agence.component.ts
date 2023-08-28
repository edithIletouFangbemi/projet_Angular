import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Agence } from 'src/app/model/agence';
import { AgenceDetail } from 'src/app/model/agenceDetail';
import { ContratInstitution } from 'src/app/model/contratInstitution';
import { Institution } from 'src/app/model/institution';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';

@Component({
  selector: 'app-detail-agence',
  templateUrl: './detail-agence.component.html',
  styleUrls: ['./detail-agence.component.scss']
})
export class DetailAgenceComponent implements OnInit {

  agence: Agence = new Agence();
  inst!: Institution;
  contrat!: ContratInstitution;
  detail!: AgenceDetail;

  constructor(private _route: ActivatedRoute,
    private institutionService : InstitutionServiceService,
    private contratService : ContratInstitutionServiceService
    ){}

  ngOnInit(){
    this._route.queryParams.subscribe(params=>{
      this.agence.codeAgence = params['codeAgence'];
      this.agence.nom = params['nom'];
      this.agence.description = params['description'];
      this.agence.statut = params['statut'];
      this.agence.adresse = params['adresse'];
    });
    this.institutionCheck()
    this.getContrat()
  }

  institutionCheck(){
    this.institutionService.getOneAgence(this.agence.codeAgence).pipe(first()).subscribe({
      next: data =>{
          this.inst = data.institution
          this.detailsAgence(this.inst.codeInst, this.agence.codeAgence)
      },
      error: error => console.log(error)
    })
  }

  getContrat(){
    this.contratService.getByInstitution(this.inst).pipe(first()).subscribe({
      next: data =>{
        this.contrat = data;
      },
      error: error => console.log(error)
    })
  }

  detailsAgence(codeinst: string, codeagence: string){
    this.contratService.getDetail(codeinst, codeagence).pipe(first()).subscribe({
      next: data =>{
        this.detail = data;
        console.log(data);
      },
      error: error => console.log(error)
    })
  }

}
