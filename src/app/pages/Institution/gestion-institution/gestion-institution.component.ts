import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { first } from 'rxjs';
import { Agence } from 'src/app/model/agence';
import { Institution } from 'src/app/model/institution';
import { LoadDatatableService } from 'src/app/services/Utils/load-datatable.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import { DynamicScriptLoaderService3 } from 'src/app/services/shared/dynamic-script-loader-service3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-institution',
  templateUrl: './gestion-institution.component.html',
  styleUrls: ['./gestion-institution.component.scss']
})
export class GestionInstitutionComponent implements OnInit{
  create: boolean = false;
  suite: boolean = false;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService3,
    private _formBuilder : FormBuilder,
    private institutionService: InstitutionServiceService,
    private _route: Router,
    private loadDatatable: LoadDatatableService
    ){}

    formSaveInst!: FormGroup;
    formEditInst!: FormGroup;
    formSaveAgence!: FormGroup;
    listeInstitution!: Institution[];

  ngOnInit(): void {
    this.initForm()
    this.lister()

   this.loadScripts([
   "assets/files/bower_components/datatables.net/js/jquery.dataTables.min.js",
   "assets/files/assets/pages/data-table/js/dataTables.bootstrap4.min.js",
   "assets/files/bower_components/datatables.net-responsive/js/dataTables.responsive.min.js",
   "assets/files/bower_components/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js",
   "assets/files/assets/pages/data-table/js/data-table-custom.js"

      // Add more script URLs as needed
    ]).then(() => {
      // All scripts loaded successfully
    }).catch(() => {
      // Failed to load one or more scripts
    });
  }

  nouveau(){
    this.create = !this.create;
  }

  suivant(){
    this.suite = !this.suite;
  }

  newInstitution(){
    this.create == false;
  }

  save(){
    const data :Institution = Object.assign({}, this.formSaveInst.value)
    this.institutionService.save(data).pipe(first()).subscribe({
      next: data=>{
        this.lister()
        this.formSaveInst.reset()
        Swal.fire("Reussite","Opération reussié","success")
      },
      error: error=>{
        this.formSaveInst.reset()
        Swal.fire("Echec",error.error,"error")
      }
    })
  }

  editer(institution:Institution){
    this.formEditInst.patchValue(institution);
  }

  update(){
    const data: Institution = Object.assign({}, this.formEditInst.value);
    this.institutionService.update(data).pipe(first()).subscribe({
      next: data=>{
        Swal.fire("Reussite","operation reussie","success");
        this.formEditInst.reset()
        this.lister()
      },
      error: error=>{
        Swal.fire("Echec",error.error,"error");
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

    this.formSaveInst.controls[name].setValue(input.value);
    }

  onNameAgenceInput(event: any, name: string) {
    const input = event.target;
    const value = input.value;
    const pattern = /^[a-zA-Z-0-9 ]*$/;

    if (!pattern.test(value)) {
      input.value = value.replace(/[^a-zA-Z-0-9]/g, ''); // Filtrer les caractères non autorisés
    }

    this.formSaveAgence.controls[name].setValue(input.value);
    }

  lister(){
    this.institutionService.getAll().pipe(first()).subscribe({
      next: data =>{
        this.listeInstitution = data;
        this.listeInstitution.forEach(value=>{
          value.dateCreation = new Date(value.dateCreation);
          value.dateCreationFormate = format(value.dateCreation, 'dd/MM/yyyy');
        })
      },
      error: error=>console.log(error)
    })
  }

  details(institution: Institution){
    const data: Institution = Object.assign({},institution)
    this._route.navigate(["base/gestion-agence"], {queryParams: data})

  }

  desactiver(code:string){
    Swal.fire({
      title: 'Confirmation de desactivation',
      text: 'Êtes-vous sûr de vouloir desactiver ce produit cet?',
      icon: 'question',
      confirmButtonText: 'Desactiver',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
  }).then((result)=>{
    if(result.isConfirmed){
      this.institutionService.delete(code).pipe(first()).subscribe({
        next:()=>{
          Swal.fire("Reussite","desactivé avec succès!","success");
        },
        error:(error)=>{
          Swal.fire("Echec",error.error,"error");
        }
      })
    }
  })
  }

  /*------------Agence--------------- */
  getInst(inst : Institution){
  this.formSaveAgence.controls['institutionCode'].setValue(inst.codeInst)

  }

  saveAgence(){
    const data : Agence = Object.assign({}, this.formSaveAgence.value)
    console.log("agence")
    console.log(data)
    this.institutionService.saveAgence(data).pipe(first()).subscribe({
      next: data=>{
        this.formSaveAgence.reset()
        Swal.fire("Reussite","Opération reussié","success")
        this.lister()

      },
      error: error=>{
        console.log(error)
        this.formSaveAgence.reset()
        Swal.fire("Echec",error.error,"error")
      }
    })
  }

  initForm(){
    this.formSaveInst = this._formBuilder.group({
      nomInst : ["",[Validators.required]],
      adresseInst : ["",[Validators.required]],
      typeArchitecture: ["", [Validators.required]]
    });

    this.formEditInst = this._formBuilder.group({
      codeInst :[""],
      nomInst : ["",[Validators.required]],
      adresseInst : ["",[Validators.required]],
      typeArchitecture: ["", [Validators.required]]
    });
    this.formSaveAgence = this._formBuilder.group({
      nom: ["",[Validators.required]],
      description: ["",[Validators.required]],
      adresse: ["",[Validators.required]],
      institutionCode: [""]
    })

  }




  loadScripts(scriptUrls: string[]): Promise<void[]> {
    const promises: Promise<void>[] = [];
    scriptUrls.forEach((url) => {
      const scriptPromise = this.loadDatatable.loadScript(url);
      promises.push(scriptPromise);
    });
    return Promise.all(promises);
  }



}
