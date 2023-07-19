import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utilisateur } from 'src/app/model/utilisateur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UtilisateurService } from 'src/app/services/utilisateurService/utilisateur.service';

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.scss']
})
export class GestionUtilisateurComponent implements OnInit{
  formUser!: FormGroup;
  listUser? : Utilisateur[];
  constructor(private _router: Router, private utilisateurService: UtilisateurService,
    private _formBuilder:FormBuilder
    ){}


    ngOnInit(){
      this.lister();
      this.initForm()
     }


    initForm(){
      this.formUser = this._formBuilder.group({
        lastname : ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        email : ['', [Validators.email, Validators.required]],
        profil : ['', [Validators.required]]
      })
    }





  /* methodes de Gestion */
  detail(id: any){
    this._router?.navigate(["base/detail"]);
  }

  envoyer(): any{
    const data : Utilisateur = Object.assign({}, this.formUser.value);
    this.utilisateurService.register(data).pipe(first()).subscribe
    ({
      next:() =>{
      Swal.fire("Enregistre ","Opération reussie","success");
      location.reload
     },
     error: error =>{
      console.log(error)
      Swal.fire("Enregistrement","echec de l'enregistrement de l'utilisateur","error");

     }
    });

   }


   lister():any{
    this.utilisateurService.getAll().pipe(first()).subscribe({
      next: data =>{
        console.log("données...");
        console.log(data);
        this.listUser = data;
    },
    error: error =>{
      console.log(error)
    }

   });


  }

  activer(id:any){
    Swal.fire({
      title: 'Confirmation de suppression',
      text: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
  })

  }

  desactiver(id: any){

  }

}
