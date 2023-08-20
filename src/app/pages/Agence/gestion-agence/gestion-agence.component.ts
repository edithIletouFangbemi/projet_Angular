import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ActivationRequest } from 'src/app/model/activationRequest';
import { Agence } from 'src/app/model/agence';
import { Institution } from 'src/app/model/institution';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import { DynamicScriptLoaderService } from 'src/app/services/shared/dynamic-script-loader-service.service';
import { DynamicScriptLoaderService3 } from 'src/app/services/shared/dynamic-script-loader-service3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-agence',
  templateUrl: './gestion-agence.component.html',
  styleUrls: ['./gestion-agence.component.scss']
})
export class GestionAgenceComponent implements OnInit {
  constructor(
   private dynamicScriptLoader: DynamicScriptLoaderService3,
    private _route: ActivatedRoute,
    private _router: Router,
    private institutionService:InstitutionServiceService,
    private contratService: ContratInstitutionServiceService,
    private _formBuilder: FormBuilder
  ){}

  inst: Institution = new Institution();
  listeAgence!: Agence[];
  listeProduit!: Produit[];
  listeModule!: Module[];
  editAgenceForm!: FormGroup;
  activeModuleForm!: FormGroup;

  ngOnInit(){
    this.loadScripts()
    this._route.queryParams.subscribe(params=>{
      this.inst.codeInst = params['codeInst'];
      this.inst.nomInst = params['nomInst'];
      this.inst.adresseInst = params['adresseinst'];
      this.inst.statut = params['statut']
    });

    this.getAgenceByInstitution();

    this.initForm();
    this.getModule()
  }

  getAgenceByInstitution(){
    this.institutionService.getAgenceByInstitution(this.inst.codeInst).pipe(first()).subscribe({
      next: data=>{
        this.listeAgence = data;
      },
      error:error=>console.log(error)
    })
  }

  getProduit(agence: Agence, codeinst: string){
    /*
    this.listeProduit = []
    this.activeModuleForm.patchValue({
      institutionCode: codeInst,
      codeAgence: codeAgence
    })

    this.contratService.getProduit(codeInst).pipe(first()).subscribe({
      next: data=>{
        this.listeProduit = data;
        this.activeModuleForm.patchValue({
          institutionCode: codeInst,
          codeAgence: codeAgence
        });
      },
      error: error=>console.log(error)

    })
    */
    agence.InstitutionCode = codeinst;

    const data : Agence = Object.assign({}, agence)

    this._router.navigate(["base/activation"], {queryParams: data})
  }

  detail(agence: Agence){
    const data : Agence = Object.assign({}, agence)
    this._router.navigate(["base/detail-agence"], {queryParams: data})
  }

  getModule(){
    this.listeModule = []
    this.activeModuleForm.get("codeProduit")?.valueChanges.subscribe((value)=>{
      let codeAgence = this.activeModuleForm.get("codeAgence")?.value;
      this.institutionService.getModule(codeAgence, value).pipe(first()).subscribe({
        next: data=>{
          this.listeModule = data

        },
        error: error=>console.log(error)
      })
    })

  }

  onNameAgenceInput(event: any, name: string) {
    const input = event.target;
    const value = input.value;
    const pattern = /^[a-zA-Z-0-9 ]*$/;

    if (!pattern.test(value)) {
      input.value = value.replace(/[^a-zA-Z]/g, ''); // Filtrer les caractères non autorisés
    }

    this.editAgenceForm.controls[name].setValue(input.value);
    }

  onNumberInput(event: any, name: string) {
    const input = event.target;
    const value = input.value;
    const pattern = /^[0-9]*$/;

    if (!pattern.test(value)) {
      input.value = value.replace(/[^0-9]/g, ''); // Filtrer les caractères non autorisés
    }

    this.editAgenceForm.controls[name].setValue(input.value);
    }

  editer(agence:Agence){
    this.editAgenceForm.patchValue(agence)

  }

  update(code:string){
    this.editAgenceForm.patchValue({
      institutionCode: code
    })
    const data2 :Agence = Object.assign({}, this.editAgenceForm.value)
    this.institutionService.updateAgence(data2).pipe(first()).subscribe({
      next:data=>{
        Swal.fire("Reussite","Opération reussie","success")
        this.getAgenceByInstitution()
      },
      error: error=>{
      console.log(error)
        Swal.fire("Echec",error.error,"error")
      }
    })
  }
  activerModule(){
    const data : ActivationRequest = Object.assign({}, this.activeModuleForm.value);
    console.log(data)
    this.institutionService.activateModule(data).pipe(first()).subscribe({
      next: response=>{
        Swal.fire("Reussi","Opération reussie","success")
        this.getModule()
        this.initForm()
      },
      error: error=>{
        this.initForm()
        console.log(error)
        Swal.fire("Echec",error.error,"error")
      }
    })
  }

  desactiver(code:string){
    Swal.fire({
      title: 'Confirmation de desactivation',
      text: 'Êtes-vous sûr de vouloir desactiver cet agence?',
      icon: 'question',
      confirmButtonText: 'Desactiver',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
  }).then((result)=>{
    if(result.isConfirmed){
      this.institutionService.deleteAgence(code).pipe(first()).subscribe({
        next:()=>{
          Swal.fire("Reussite","Opération reussie","success")
        },
        error: error=>{
          Swal.fire("Echec",error.error,"error")
        }
      })
    }
  })


  }

  initForm(){
    this.editAgenceForm = this._formBuilder.group({
      institutionCode:[""],
      codeAgence: [""],
      nom: ["",[Validators.required]],
      description: ["",[Validators.required]],
      adresse: ["",[Validators.required]]
    });

    this.activeModuleForm = this._formBuilder.group({
      institutionCode:[""],
      codeAgence: [""],
      codeProduit: ["", [Validators.required]],
      nbrPoste: ["",[Validators.required]],
      modules: ["", [Validators.required]]
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
