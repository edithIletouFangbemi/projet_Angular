import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utilisateur } from 'src/app/model/utilisateur';
import Swal from 'sweetalert2';
import { UtilisateurService } from 'src/app/services/utilisateurService/utilisateur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { state } from '@angular/animations';
import { DynamicScriptLoaderService3 } from 'src/app/services/shared/dynamic-script-loader-service3.service';
import { ProfilServiceService } from 'src/app/services/profilService/profil-service.service';
import { Profil } from 'src/app/model/Profil';

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.scss']
})
export class GestionUtilisateurComponent implements OnInit{
  formUser!: FormGroup;
  formEdit! : FormGroup;
  editingItem! : Utilisateur;
  listUser? : Utilisateur[];
  listeProfils!:Profil[];
  constructor(private _router: Router, private utilisateurService: UtilisateurService,
   private _formBuilder : FormBuilder,
   private route: ActivatedRoute,
   private dynamicScriptLoader: DynamicScriptLoaderService3,
   private profilService: ProfilServiceService
    ){}
    ngOnInit(){
      this.loadScripts()
      this.initForm()
      this.lister();
      this.listeProfil()

      setTimeout(
        function(){
          $(function(){
            $('#table-style-hover').DataTable();
        });
      });
     }

     initForm(){
      this.formUser = this._formBuilder.group({
        lastname : ['', [Validators.required]],
        firstname : ['', [Validators.required]],
        email : ['', [Validators.required]],
        role : ['', [Validators.required]]

      }),

      this.formEdit = this._formBuilder.group({
        codeUser : [""],
        lastname : ['', [Validators.required]],
        firstname : ['', [Validators.required]],
        email : ['', [Validators.required]],
        role : ['', [Validators.required]]
      })
    }

  envoyer(): any{
    const data : Utilisateur = Object.assign({}, this.formUser.value)
    this.utilisateurService.register(data).pipe(first()).subscribe
    ({
      next:() =>{
      Swal.fire("Enregistrement ","Opération reussie","success");
      this._router.navigateByUrl("base/gestion-utilisateur");
     },
     error: error =>{
      console.log(error)
      Swal.fire("Enregistrement","echec de l'enregistrement de l'utilisateur","error");

     }
    });

   }

   editer(user: Utilisateur){
    console.log(user);
    this.editingItem = user;
    this.formEdit.patchValue(user);
   }

   update(){
    const data : Utilisateur = Object.assign({}, this.formEdit.value)
    this.utilisateurService.update(data.codeUser,data).pipe(first()).subscribe({
      next:()=>{
        Swal.fire("Reussite","mise à jour éffectuée","success");
        this.lister(

        )
      },
      error: (error)=>{
        Swal.fire("Echec","opération échouée","error")
      }
    })
   }

   detail(user: Utilisateur){
    const data : Utilisateur = Object.assign({}, user)
    this._router.navigate(["base/detail"], {queryParams: data });
  }

   lister():any{
    this.utilisateurService.getAll().pipe(first()).subscribe({
      next: data =>{
        console.log("donnée...");
        this.listUser = data;
        console.log(this.listUser);
    },
    error: error =>{
      console.log("utilisateur error "+error.message)
      console.log("statut error user "+error.status)
    }

   });


  }

  listeProfil(){
    this.profilService.getAll().pipe(first()).subscribe({
      next: data =>{
        this.listeProfils = data;
      },
      error:error=>console.log(error)
    })
  }

  activer(codeUser:string){
    Swal.fire({
      title: 'Confirmer l\'activation',
      text: 'Êtes-vous sûr de vouloir activer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Activer',
      cancelButtonText: 'Annuler'
  }).then((result)=>{
    if(result.isConfirmed){
      this.utilisateurService.activer(codeUser).pipe(first()).subscribe(
        {
          next:()=>{
            Swal.fire("Réussie","Utilisateur activé","success")
            this.lister()
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

  desactiver(codeUser : string){
    Swal.fire({
      title: 'Confirmer la désactivation',
      text: 'Êtes-vous sûr de vouloir désactiver cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Désactiver',
      cancelButtonText: 'Annuler'
  }).then((result)=>{
    if(result.isConfirmed){
      this.utilisateurService.delete(codeUser).pipe(first()).subscribe({
        next: ()=>{
          Swal.fire("Réussie","utilisateur désactivé","success")
          this.lister()
        },
        error: error=>{
          console.log(error)
          Swal.fire('Echec',"l'operation n'as pas aboutie","error")
        }
      })
    }
  })

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
    'jszip',
    'pdfmake',
    'vfs_fonts',
    'print',
    'html5',
    'bootstrap4',
    'dataTables.responsive',
    'responsive.bootstrap4',
    'i18next',
    'i18nextXHRBackend',
    'languagedetector',
    'jquery-i18next',
    'data-table-custom',
    'pcoded',
    'vartical-layout',
    'mCustomScrollbar',
    'script'
    ).then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }


}
