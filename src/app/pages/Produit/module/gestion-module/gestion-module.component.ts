import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';
import { ProduitServiceService } from 'src/app/services/produitService/produit-service.service';
import { DynamicScriptLoaderService } from 'src/app/services/shared/dynamic-script-loader-service.service';
import { DynamicScriptLoaderService3 } from 'src/app/services/shared/dynamic-script-loader-service3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-module',
  templateUrl: './gestion-module.component.html',
  styleUrls: ['./gestion-module.component.scss']
})
export class GestionModuleComponent implements OnInit {
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService3,
    private route: ActivatedRoute,
    private produitService: ProduitServiceService,
    private _formBuilder: FormBuilder
    ){}

    produit: Produit = new Produit();
    listeModule! : Module[];
    editModuleForm! : FormGroup;

  ngOnInit(): void {
    this.loadScripts()
    this.route.queryParams.subscribe(params=>{
        this.produit.codeProduit = params['codeProduit'];
        this.produit.description = params['description'];
        this.produit.nom = params['nom'];
        this.produit.statut = params['statut'];
    });

    this.getModules();
    this.initForm()
  }

  getModules(){
    this.produitService.modulesByProduit(this.produit.codeProduit).pipe(first()).subscribe({
      next: data =>{
        this.listeModule = data;
      },
      error: error=> console.log(error)
    })
  }

  editer(module: Module, produitCode: string){
    this.editModuleForm.patchValue(module);
    this.editModuleForm.patchValue({
      produitId: produitCode
    })
  }

  update(){
    const data2 : Module = Object.assign({}, this.editModuleForm.value)
    this.produitService.updateModule(data2.codeModule, data2).pipe(first()).subscribe({
      next: data =>{
        this.getModules()
        Swal.fire("Reussite","opération reussie",'success')

      },
      error: error=>{
        console.log(error)
        Swal.fire("Echec",error.error,"error")
      }
    })
  }

  desactiver(codeModule: string){
    Swal.fire({
      title: 'Confirmation de désactivation',
      text: 'Êtes-vous sûr de vouloir desactiver ce module ?',
      icon: 'question',
      confirmButtonText: 'Désactiver',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
  }).then(result=>{
    if(result.isConfirmed){
      this.produitService.deleteModule(codeModule).pipe(first()).subscribe({
        next:data=>{
          Swal.fire("Reussite","Opération","success")
          this.getModules()
        },
        error: error=>{
          console.log(error)
          Swal.fire("Echec","Veuillez reprendre","error")
        }
      })
    }
  })
  }

  initForm(){
    this.editModuleForm = this._formBuilder.group({
      produitId:[""],
      codeModule : [""],
      libelleModule : ["",[Validators.required]],
      description : ["",[Validators.required]],
      typeModule : ["",[Validators.required]]
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

  onNameInput(event: any, name: string) {
    const input = event.target;
    const value = input.value;
    const pattern = /^[a-zA-Z-0-9 ]*$/;

    if (!pattern.test(value)) {
      input.value = value.replace(/[^a-zA-Z]/g, ''); // Filtrer les caractères non autorisés
    }

    this.editModuleForm.controls[name].setValue(input.value);
    }

}
