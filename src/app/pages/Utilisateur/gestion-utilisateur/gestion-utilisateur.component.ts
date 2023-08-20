import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utilisateur } from 'src/app/model/utilisateur';
import Swal from 'sweetalert2';
import { UtilisateurService } from 'src/app/services/utilisateurService/utilisateur.service';

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.scss']
})
export class GestionUtilisateurComponent {
  data : Utilisateur = new Utilisateur();
  constructor(private _router: Router, private utilisateurService: UtilisateurService){}
  detail(){
    this._router?.navigate(["base/detail"]);
  }

  envoyer(): any{
    this.utilisateurService.register(this.data).pipe(first()).subscribe
    ({
      next:() =>{
      Swal.fire("Enregistrement ","Opération reussie","success");
     },
     error: error =>{
      console.log(error)
      Swal.fire("Enregistrement","echec de l'enregistrement de l'utilisateur","error");

     }
    });

      }


  }


