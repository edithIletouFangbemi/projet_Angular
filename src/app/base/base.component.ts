import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../model/utilisateur';
import { UtilisateurService } from '../services/utilisateurService/utilisateur.service';
import { first } from 'rxjs';
import { DynamicScriptLoaderService } from '../services/shared/dynamic-script-loader-service.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  listUser!: Utilisateur[]
  constructor(private utilisateurService: UtilisateurService,
    private dynamicScriptLoader: DynamicScriptLoaderService
    ){

  }

  ngOnInit(): void {
    this.loadScripts()

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

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load(
    'jquery.min',
    'jquery-ui',
    'popper',
    'bootstrap.min',
    'slimScroll',
    'modernizr',
    'scrollBar',
    'datatablesJquery',
    'datatableButton',
    'script'
    ).then(data => {
      console.log("tout s'est bien passé!");
      // Script Loaded Successfully
    }).catch(error =>{

      console.log(error);
      console.log("some errors occur")
    }
      );
  }



}
