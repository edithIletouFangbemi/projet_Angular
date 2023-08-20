import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { first } from 'rxjs';
import { ContratUnit } from 'src/app/model/ContratUnit';
import { DetailContratInst } from 'src/app/model/DetailContratInst';
import { ContratInstitution } from 'src/app/model/contratInstitution';
import { DetailContratInstitution } from 'src/app/model/detailContratInstitution';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.scss']
})
export class DetailContratComponent implements OnInit{

  detailContrat = new DetailContratInst();
  contratList!: ContratInstitution[];
  avenantForm!: FormGroup
  selectedTypeContrat: string = "";
  currentDate = new Date()

  constructor(
    private contratService: ContratInstitutionServiceService,
    private _route: ActivatedRoute,
    private institutionService: InstitutionServiceService,
    private _formBuilder: FormBuilder
  ){

  }

  ngOnInit(){
    this._route.queryParams.subscribe(params=>{
      this.detailContrat.codeInst = params['codeInst'];
      this.detailContrat.nomInst = params['nomInst'];
      this.detailContrat.nbrProduit = params['nbrProduit'];
      this.detailContrat.typeArchitecture = params['typeArchitecture']
    });

    this.getDetail(this.detailContrat.codeInst);
    this.initForm()

  }

  initForm(){
    this.avenantForm = this._formBuilder.group({
      codeinst: [""],
      produit: ["",],
      typeContrat: ["", [Validators.required]],
      dateDebut: ["", [Validators.required]],
      dateFin: ["", [Validators.required]],
      nbrPoste: [""],
      nbrAgence: [""]
    })
  }

  getDetail(codeinst : string){
    this.contratService.All(codeinst).pipe(first()).subscribe({
      next: data =>{
        this.contratList = data;
        this.contratList.forEach(x=>{
          x.dateDebut = new Date(x.dateDebut)
          x.dateFin = new Date(x.dateFin)
          x.dateDebutFormate = format(x.dateDebut,"dd/MM/yyyy")
          x.dateFinFormate = format(x.dateFin,"dd/MM/yyyy")
        })
      },
      error: error=>{
        console.log(error)
      }
    })
  }

  ajout(contrat: ContratInstitution){
    console.log(contrat)

    this.avenantForm.patchValue({
      codeinst: contrat.institution,
      produit: contrat.produit,
      typeContrat: contrat.typeContrat,
      dateDebut: contrat.dateDebutFormate,
      dateFin: contrat.dateFinFormate
    });

}

saveAvenant(){
  const data : ContratUnit = Object.assign({}, this.avenantForm.value)
  this.contratService.ajoutAvenant(data).pipe(first()).subscribe({
    next: data =>{
      Swal.fire("Reussie","Avenant ajouter avec succès","success")
    },
    error: error=> {
      Swal.fire("Echec",error.error,"error")
      console.log(error)
    }
 })
}



onNameContratInput(event: any, name: string) {
  const input = event.target;
  const value = input.value;
  const pattern = /^[0-9]*$/;

  if (!pattern.test(value)) {
    input.value = value.replace(/[^0-9]/g, ''); // Filtrer les caractères non autorisés
  }

  this.avenantForm.controls[name].setValue(input.value);
  }

onNameInput(event: any, name: string) {
  const input = event.target;
  const value = input.value;
  const pattern = /^[a-zA-Z-0-9 ]*$/;

  if (!pattern.test(value)) {
    input.value = value.replace(/[^a-zA-Z]/g, ''); // Filtrer les caractères non autorisés
  }

  this.avenantForm.controls[name].setValue(input.value);

  }

}

