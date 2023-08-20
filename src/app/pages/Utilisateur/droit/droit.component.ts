import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Habilitation } from 'src/app/model/habilitation';
import { DroitServiceService } from 'src/app/services/utilisateurService/Droit/droit-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-droit',
  templateUrl: './droit.component.html',
  styleUrls: ['./droit.component.scss']
})
export class DroitComponent implements OnInit{

  constructor(
    private router: Router,
    private droitService: DroitServiceService,
    private _formBuilder: FormBuilder
  ){}

  listeDroit!: Habilitation[];

  editForm!: FormGroup;

    ngOnInit(): void {
      this.liste()
      this.initForm()
    }

    liste(){
      this.droitService.getAll().pipe(first()).subscribe({
          next: data=>{
            this.listeDroit = data
          },
          error: error=>console.log(error)
      })

    }

    editer(habil: Habilitation){
      this.editForm.patchValue(habil);
    }

    update(){
      if(this.editForm.valid){
        const data : Habilitation = Object.assign({}, this.editForm.value)

        this.droitService.update(data).pipe(first()).subscribe({
          next: response =>{
            this.initForm()
            this.liste()
            Swal.fire("Reussite","l'operation à aboutie","success")
          },
          error: error=>{
            console.log(error)
            Swal.fire("Echec","opération échouée","error")
          }
        })
      }
      else{
        Swal.fire("Echec", "Remplissez tous les champs")
      }
    }

    activer(code: string){
      Swal.fire({
        title: 'Confirmer l\'activation',
        text: 'Êtes-vous sûr de vouloir activer cette habilitation?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Activer',
        cancelButtonText: 'Annuler'
    }).then((result)=>{
      if(result.isConfirmed){
        this.droitService.activate(code).pipe(first()).subscribe(
          {
            next:()=>{
              Swal.fire("Réussie","habilitation activé","success")
              this.liste()
            },
            error: error=>{
              console.log(error)
              Swal.fire("Echec","pas aboutie","error");
            }
          }
        );
      }
    })
    }

    desactiver(code: string){

      Swal.fire({
        title: 'Confirmer l\'activation',
        text: 'Êtes-vous sûr de vouloir désactiver cette habilitation ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Désactiver',
        cancelButtonText: 'Annuler'
    }).then((result)=>{
      if(result.isConfirmed){
        this.droitService.deactivate(code).pipe(first()).subscribe(
          {
            next:()=>{
              Swal.fire("Réussie","habilitation désactivé","success")
              this.liste()
            },
            error: error=>{
              console.log(error)
              Swal.fire("Echec","pas abouti","error");
            }
          }
        );
      }
    })

    }

    initForm(){
      this.editForm = this._formBuilder.group({
        codeHabilitation: [""],
        libelle: ["", [Validators.required]],
        statut: [""]
      })
    }


}
