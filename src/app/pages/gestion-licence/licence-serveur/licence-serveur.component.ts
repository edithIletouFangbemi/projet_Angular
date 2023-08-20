import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Agence } from 'src/app/model/agence';
import { Institution } from 'src/app/model/institution';
import { LicenceServeur } from 'src/app/model/licenceServeur';
import { LicenceServeurReturn } from 'src/app/model/licenceServeurReturn';
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
    private licenceService: LicenceServeurService
    ){}

  licenceForm!:FormGroup;
  listeInstitution!: Institution[]
  listeAgence!: Agence[]
  listeRetour:LicenceServeurReturn[] = []

  ngOnInit(){
    this.initForm()
    this.getAgence()
    this.getInstitution()
    this.all()


  }

  initForm(){
    this.licenceForm = this._formBuilder.group({
      institutionCode: ["",[Validators.required]],
      agenceCode: ["",[Validators.required]]
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
    this.listeAgence = []
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

  save(){
    const data : LicenceServeur = Object.assign({}, this.licenceForm.value)
    console.log(data)
    this.licenceService.save(data).pipe(first()).subscribe({
      next: data=>{
        this.all()
        this.initForm()
        this.getAgence()
        this.getInstitution()
        location.reload
        Swal.fire("Reussite","opération reussie","success")

      },
      error: error=>{
        console.log(error)
        this.initForm()
        Swal.fire("Echec",error.error,"error")
      }
    })
  }

  all(){
    this.licenceService.all().pipe(first()).subscribe({
      next: data =>{
        this.listeRetour = data;
      },
      error: error=> console.log(error)
    })
  }

  desactiver(code:string){

  }


}
