import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ActivationRequest } from 'src/app/model/activationRequest';
import { Agence } from 'src/app/model/agence';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activer-module',
  templateUrl: './activer-module.component.html',
  styleUrls: ['./activer-module.component.scss']
})
export class ActiverModuleComponent implements OnInit {
  agence: Agence = new Agence();
  listeProduit: Produit[] = [];
  selectedTypeContrat: string [] = [];
  form!: FormGroup;
  listeModule: Module[] = []
  currentDate: Date = new Date()


  constructor(

     private _route: ActivatedRoute,
     private _router: Router,
     private institutionService:InstitutionServiceService,
     private contratService: ContratInstitutionServiceService,
     private _formBuilder: FormBuilder,
     datePipe: DatePipe
   ){
    this.currentDate = new Date();
   }

   ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      this.agence.InstitutionCode = params['InstitutionCode'];
      this.agence.codeAgence = params['codeAgence'];
      this.agence.nom = params['nom'];
      this.agence.adresse = params['adresse'];
      this.agence.description = params['description'];
      this.agence.statut = params['statut'];
  });

  this.initForm()
  this.addValue(this.agence.codeAgence, this.agence.InstitutionCode)
  this.getProduit(this.agence.InstitutionCode)
  this.getModule()
   }

   getProduit(codeInst: string){
    this.contratService.getProduit(codeInst).pipe(first()).subscribe({
      next: data=>{
        this.listeProduit = data;
        /*
        this.activeModuleForm.patchValue({
          institutionCode: codeInst,
          codeAgence: codeAgence
        });*/
      },
      error: error=>console.log(error)

    })
   }

   getModule(){
    console.log(this.form.get('codeAgence')?.value)
    this.form.get('codeProduit')?.valueChanges.subscribe(value=>{
      this.institutionService.getModule(this.form.get('codeAgence')?.value, value).pipe(first()).subscribe({
        next: data=>{
            this.listeModule = data
            console.log(data)
        },
        error: error=> console.log(error)
      })
    })
   }

   addValue(codeAg: string, codeinst: string){
      this.form.patchValue({
        codeAgence: codeAg,
        codeInst:codeinst
      })
   }

   activerModule(){
    let dateDebut = this.form.get('dateDebut')?.value;
    let dateFin = this.form.get('dateFin')?.value;
    if(dateDebut >= dateFin){
      alert("la date de debut doit être inférieur à la date de fin")
    }
    else{
      const data : ActivationRequest = Object.assign({}, this.form.value)
      this.institutionService.activateModule(data).pipe(first()).subscribe({
        next: data =>{
          Swal.fire("Reussite", "activation fait avec succès","success")
          this.initForm()
        },
        error: error=>{
          console.log(error)
          Swal.fire("Echec",error.error,"error")
        }
      })
    }
  }



   initForm(){
    this.form = this._formBuilder.group({
      codeAgence: ["",[Validators.required]],
      codeInst: ["", [Validators.required]],
      codeProduit: ["", [Validators.required]],
      modules: this._formBuilder.array([])
    })
  }



  get modules(){
    return this.form.get('modules') as FormArray
  }

  CreateItem(): void {
    const item = this._formBuilder.group({
      codeModule:[null, [Validators.required]],
      type:[null, [Validators.required]],
      nbrPoste:[null],
      dateDebut:[null],
      dateFin:[null],
    } )
    let elt: string = "";
    this.selectedTypeContrat.push(elt);
    this.modules.push(item)
  }

  RemoveItem(i:number){
    this.selectedTypeContrat.splice(i,1)
    this.modules.removeAt(i)
  }

  annulerForm() {
    this.initForm()
  }

  activation(){
    const data : ActivationRequest = Object.assign({}, this.form.value)
    this.institutionService.activateModule(data).pipe(first()).subscribe({
      next: data=>{
        Swal.fire("Reussite","Activation fait avec Succès","success")
      },
      error: error=>{
        console.log(error)
        Swal.fire("Echec",error.error,"error")

      }
    })
  }
}
