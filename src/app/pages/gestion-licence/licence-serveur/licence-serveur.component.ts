import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs';
import { Agence } from 'src/app/model/agence';
import { Institution } from 'src/app/model/institution';
import { LicenceServeur } from 'src/app/model/licenceServeur';
import { LicenceServeurReturn } from 'src/app/model/licenceServeurReturn';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import { LicenceServeurService } from 'src/app/services/licenceService/licenceServeurService/licence-serveur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-licence-serveur',
  templateUrl: './licence-serveur.component.html',
  styleUrls: ['./licence-serveur.component.scss']
})
export class LicenceServeurComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder,
    private contratService: ContratInstitutionServiceService,
    private institutionService: InstitutionServiceService,
    private licenceService: LicenceServeurService,
    private _router : Router
    ){}

  licenceForm!:FormGroup;
  listeInstitution!: Institution[]
  listeAgence!: Agence[]
  listeRetour:LicenceServeurReturn[] = [];
  listeProduit: Produit[] = [];
  listeModule: Module[] = [];
  codeProduit: string = "";

  ngOnInit(){
    this.initForm()
    this.getInstitution()
    this.getProduitByInstitution()
    this.getModuleByAgenceAndProduit()
    this.getAgence()
    this.all()
  }

  initForm(){
    this.licenceForm = this._formBuilder.group({
      institutionCode: ["",[Validators.required]],
      agenceCode: ["",[Validators.required]],
      produit: ["",[Validators.required]],
      modules: ["",[Validators.required]]
    })
  }

  getInstitution(){
    this.listeInstitution = [];
    this.licenceService.institutions().pipe(first()).subscribe({
      next: data=>{
        this.listeInstitution = data;
      },
      error: error=>console.log(error)
    })
  }

  getAgence(){
    this.licenceForm.get('institutionCode')?.valueChanges.subscribe((value) => {
      this.licenceService.agences(value).pipe(first()).subscribe({
        next: data=>{
            this.listeAgence = data;
        },
        error: error=>{
          console.log(error)
        }
       })
    });
  }

  getProduitByInstitution(){
    this.licenceForm.get('institutionCode')?.valueChanges.subscribe((value)=>{
      this.codeProduit = value;
      this.licenceService.getProduit(value).pipe(first()).subscribe({
        next: data =>{
            this.listeProduit = data
        },
        error:(error)=>{
          console.log(error)
        }
      })
    })
  }

  getModuleByAgenceAndProduit(){
      this.licenceForm.get('agence')?.valueChanges.subscribe(value=>{
        this.licenceService.getModule(this.codeProduit, value).pipe(first()).subscribe({
          next: data =>{
              this.listeModule = data
          },
          error: error=>{
            console.log(error)
          }
        })
      })
  }



  save(){
    const data : LicenceServeur = Object.assign({}, this.licenceForm.value)
    console.log(data)
    this.licenceService.save(data).pipe(first()).subscribe({
      next: data=>{
        this.initForm()
        this.all()
        this.getInstitution()
        this.getAgence()
        Swal.fire({
          title:"Reussite",
          text:"Licence générée avec succès",
          icon: "success",
          confirmButtonText:"Télécharger le fichier",
          cancelButtonText: "Annuler",

        }).then((result)=>{
          if(result.isConfirmed){
            this.download(data)
          }
        })

      },
      error: error=>{
        console.log(error)
        this.initForm()
        Swal.fire("Echec",error.error.message,"error")
      }
    })
  }

  all(){
    this.licenceService.all().pipe(first()).subscribe({
      next: data =>{
        console.log(data)
        this.listeRetour = data;
      },
      error: error=> console.log(error)
    })
  }

  detail(institution: Institution){
    const data : Institution =  Object.assign ({}, institution);

   this._router.navigate(['base/detail-licence-serveur'], {queryParams: data});
  }

  download(liste: any){
    if(liste !== null){
      try{
        const blob = new Blob([liste],{type:'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
      catch(error){
        Swal.fire("Erreur", "une erreur s'est produite","error")
      }

    }

  }



}
