import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Profil } from 'src/app/model/Profil';
import { ProfilRequest } from 'src/app/model/ProfilRequest';
import { Habilitation } from 'src/app/model/habilitation';
import { ProfilServiceService } from 'src/app/services/profilService/profil-service.service';
import { DynamicScriptLoaderService3 } from 'src/app/services/shared/dynamic-script-loader-service3.service';
import { DroitServiceService } from 'src/app/services/utilisateurService/Droit/droit-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-profil',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.scss']
})
export class GestionProfilComponent implements OnInit{

  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private profilService : ProfilServiceService,
    private dynamicScriptLoader: DynamicScriptLoaderService3,
    private droitService: DroitServiceService
    ){}

  formProfil! : FormGroup;
  editForm!: FormGroup;
  droits!: Habilitation[];
  listeProfil!: Profil[];

  ngOnInit(): void {
    this.loadScripts()
    this.initForm()
    this.listeHabilitation()
    this.liste()
  }


  initForm(){
    this.formProfil = this._formBuilder.group({
      libelle : ["", [Validators.required]],
      habilitations : ["", [Validators.required]]
    })

    this.editForm = this._formBuilder.group({
      codeProfil: [""],
      libelle : ["", [Validators.required]],
      habilitations : ["", [Validators.required]]
    })
  }

  envoyer(): any{
    const data : ProfilRequest = Object.assign({}, this.formProfil.value)
    this.profilService.save(data).pipe(first()).subscribe({
      next: (data)=>{
        this.liste
        this.initForm
        Swal.fire("Reussie", "Enregistrement éffectué avec succès","success")
      },
      error: (error)=>{
        this.initForm
        console.log(error)
        Swal.fire("Echec",error.error.message,"error")
      }
    })
  }

  liste(){
    this.profilService.getAll().pipe(first()).subscribe({
      next: data =>{
        this.listeProfil = data;
      },
      error: error=> console.log(error)
    })
  }

  listeHabilitation(){
    this.droitService.getAll().pipe(first()).subscribe({
      next: response=>{
        this.droits = response;
      },
      error: error=>console.log(error)
    })
  }

  detail(profil: Profil){
  }


  editer(profil: Profil){
    this.editForm.patchValue(profil)
  }

  activer(code: string){
    Swal.fire({
      title: 'Confirmer l\'activation',
      text: 'Êtes-vous sûr de vouloir activer ce profil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Activer',
      cancelButtonText: 'Annuler'
  }).then((result)=>{
    if(result.isConfirmed){
      this.profilService.activate(code).pipe(first()).subscribe(
        {
          next:()=>{
            Swal.fire("Réussie","profil activé","success")
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
      text: 'Êtes-vous sûr de vouloir désactiver cette habilitation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Activer',
      cancelButtonText: 'Annuler'
  }).then((result)=>{
    if(result.isConfirmed){
      this.profilService.deactivate(code).pipe(first()).subscribe(
        {
          next:()=>{
            Swal.fire("Réussie","habilitation désactivé","success")
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
