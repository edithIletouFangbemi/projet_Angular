import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ProduitCount } from 'src/app/model/ProduitCount';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';
import { ProduitServiceService } from 'src/app/services/produitService/produit-service.service';
import { DynamicScriptLoaderService3 } from 'src/app/services/shared/dynamic-script-loader-service3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.scss']
})
export class GestionProduitComponent implements OnInit {
  formProduit! : FormGroup;
  editProduitForm!: FormGroup;
  formModule! : FormGroup;
  listeProduit! : Produit[]
  listeProduitCount!:ProduitCount[]

  listeModule!: Module[];

  ngOnInit() : void{
    this.loadScripts()
    this.listeCompte()
    this.initForm()
  }


  constructor(private produitService: ProduitServiceService,
    private _formBuilder: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService3,
    private _route: Router
    ){}

  initForm(){
    this.formProduit = this._formBuilder.group({
      nom : ["", [Validators.required]],
      description : ["", [Validators.required]]
    });

    this.formModule = this._formBuilder.group({
      libelleModule : ["", [Validators.required]],
      typeModule : ["", [Validators.required]],
      description : ["", [Validators.required]],
      produitId : ["", [Validators.required]]
    });

    this.editProduitForm = this._formBuilder.group({
      codeProduit : [""],
      nom : ["", [Validators.required]],
      description : ["", [Validators.required]]
    })
  }

  listeCompte(){
    this.produitService.getAllBycounting().pipe(first()).subscribe({
      next: data =>{
        this.listeProduitCount = data;
      }
    })
  }

  /*----------Gestion Produit----------*/

  envoyer(){
    const data : Produit = Object.assign({}, this.formProduit.value);

    this.produitService.save(data).pipe(first()).subscribe({
      next: ()=>{
        Swal.fire("Enregistrement","Opération reussie","success");
        this.listeCompte()
        this.formProduit.reset()
      },
      error: error=>{
        this.formProduit.reset()
        Swal.fire("Echec",error.error,"error");
      }
    })
  }

  editer(produitCode: string){
    this.produitService.getOne(produitCode).pipe(first()).subscribe({
      next: data=>{
        this.editProduitForm.patchValue(data);
      },
      error:error=>{
        console.log(error)
      }
    })
  }

  updateProduit(){
    const data: Produit = Object.assign({}, this.editProduitForm.value);
    this.produitService.update(data.codeProduit,data).pipe(first()).subscribe({
      next: data=>{
        Swal.fire("Reussite","operation reussie","success");
        this.listeCompte()
        this.initForm()
      },
      error: error=>{
        Swal.fire("Echec","Veuillez reprendre","error");
      }
    })
  }

  lister(){
    this.produitService.getAll().pipe(first()).subscribe({
      next: data =>{
        this.listeProduit = data;
      }
    })
  }

  details(produitCode:string){
    this.produitService.getOne(produitCode).pipe(first()).subscribe({
      next: data2=>{
        const data: Produit = Object.assign({},data2)
        this._route.navigate(["base/gestion-module"], {queryParams: data})
      },
      error: error=>console.log(error)

    })
  }

  desactiver(code:string){
    Swal.fire({
      title: 'Confirmation de desactivation',
      text: 'Êtes-vous sûr de vouloir desactiver ce produit?',
      icon: 'question',
      confirmButtonText: 'Desactiver',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
  }).then((result)=>{
    if(result.isConfirmed){
      this.produitService.delete(code).pipe(first()).subscribe({
        next:()=>{
          Swal.fire("Reussite","desactivé avec succès!","success");
          this.lister()
          this.initForm()
        },
        error:(error)=>{
          Swal.fire("Echec","opération échouée","error");
        }
      })
    }
  })
  }
 /* -----------Gestion Module---------- */
 getProduitCode(produitCode: string){
  this.formModule.controls['produitId'].setValue(produitCode)

 }

 save(){
  const data : Module = Object.assign({}, this.formModule.value)
  this.produitService.addModule(data).pipe(first()).subscribe({
    next: data=>{
      Swal.fire("Reussite","Opération reussié","success")
      this.listeCompte()
      this.initForm()
    },
    error: error=>{
      Swal.fire("Echec",error.error,"error")
      console.log(error)
    }
  })


 }

 delete(code:string){
  Swal.fire({
    title: 'Confirmation de desactivation',
    text: 'Êtes-vous sûr de vouloir desactiver ce produit ?',
    icon: 'question',
    confirmButtonText: 'Desactiver',
    cancelButtonText: 'Annuler',
    showCancelButton: true,
}).then((result)=>{
  if(result.isConfirmed){
    this.produitService.deleteModule(code).pipe(first()).subscribe({
      next: data=>{
        Swal.fire("Reussite","desactivé avec succès!","success");
        this.lister()
      },
      error:(error)=>{
        console.log(error)
        Swal.fire("Echec","opération échouée","error");
      }
    })
  }
})
}

onNameInput(event: any, name: string) {
  const input = event.target;
  const value = input.value;
  const pattern = /^[a-zA-Z-0-9 ]*$/;

  if (!pattern.test(value)) {
    input.value = value.replace(/[^a-zA-Z]/g, ''); // Filtrer les caractères non autorisés
  }

  this.formProduit.controls[name].setValue(input.value);
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
