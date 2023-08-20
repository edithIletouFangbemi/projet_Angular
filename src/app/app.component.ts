import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from './services/utilisateurService/utilisateur.service';
import { first } from 'rxjs';
import { Utilisateur } from './model/utilisateur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listUser!: Utilisateur[]
  constructor(private utilisateurService: UtilisateurService){

  }

  ngOnInit(): void {
     this.lister()
  }

  lister():any{
    this.utilisateurService.getAll().pipe(first()).subscribe({
      next: data =>{
        console.log("donnée...");
        this.listUser = data;
        console.log(this.listUser);
    },
    error: error =>{
      console.log(error)
    }

   });


  }
  title = 'newproject';
  isLogged = false;
  localstorage:any;
}
