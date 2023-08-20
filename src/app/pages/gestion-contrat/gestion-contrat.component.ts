import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ContratInstitution } from 'src/app/model/contratInstitution';
import { Institution } from 'src/app/model/institution';
import { Produit } from 'src/app/model/produit';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import { ProduitServiceService } from 'src/app/services/produitService/produit-service.service';
import { DynamicScriptLoaderService3 } from 'src/app/services/shared/dynamic-script-loader-service3.service';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { DatePipe } from '@angular/common';
import { DetailContratInstitution } from 'src/app/model/detailContratInstitution';
import { Contrat } from 'src/app/model/Contrat';
import { DetailContratInst } from 'src/app/model/DetailContratInst';
import { Module } from 'src/app/model/module';
import { Agence } from 'src/app/model/agence';
import { ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gestion-contrat',
  templateUrl: './gestion-contrat.component.html',
  styleUrls: ['./gestion-contrat.component.scss']
})
export class GestionContratComponent {
  create: boolean = false;
  suite: boolean = false;
  listeInstitution!: Institution[];
  listeContrat!: DetailContratInst[];
  listeProduit!: Produit[];
  selectedTypeContrat: string[] = [];
  contratForm!: FormGroup;
  currentDate: Date = new Date();
  anotherDate!: Date; // Remplacez avec votre autre date
  dateAfterAddingDays!: Date;
  detailContrat!: DetailContratInstitution;
  form!: FormGroup;
  listeModule!: Module[];
  listeAgence!: Agence[];
  avenantForm!: FormGroup;
  numberEntered!: number;
  selectedItems!: [];

  @ViewChild('regForm') regForm: ElementRef | undefined; // Assurez-vous que l'élément a un référencement dans le template


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService3,
    private _formBuilder : FormBuilder,
    private contratService: ContratInstitutionServiceService,
    private produitService: ProduitServiceService,
    private _router : Router,
    private institutionService: InstitutionServiceService,
    datePipe: DatePipe
    ){
      this.currentDate = new Date();

    }

    ngOnInit(): void {
      this.loadScripts()
      this.initForm()
      this.lister()
      this.listerInstitution()
      this.listerProduit()
      this.getAgence()

    }
    getDate(){



    }

    nouveau(){
      this.create = !this.create;
    }

    suivant(){
      this.suite = !this.suite;
    }

    newContrat(){
      const data2 : Contrat = Object.assign({},this.form.value);
      console.log(data2)
      this.contratService.save(data2).pipe(first()).subscribe({
        next: data=>{
          this.create !== this.create;
          this.form.reset()
          this.lister()

          Swal.fire({
            title: 'Contrat Crée avec succès',
            text: 'voulez vous activer les modules standard de ces produits aux agences?',
            icon: 'question',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            showCancelButton: true,
        }).then((result)=>{
          if(result.isConfirmed){
            const data2: Institution = data;
            this._router.navigate(["base/activer"] , {queryParams: data2})
          }
        })
        },
        error: error=>{
          console.log(error)
          this.form.reset()
          Swal.fire("Echec",error.error,"error")
        }
      })
    }
    activerPourAgence(codeModule: string){

    }



    onNameContratInput(event: any, name: string) {
      const input = event.target;
      const value = input.value;
      const pattern = /^[0-9]*$/;

      if (!pattern.test(value)) {
        input.value = value.replace(/[^0-9]/g, ''); // Filtrer les caractères non autorisés
      }

      this.contratForm.controls[name].setValue(input.value);
      }

    initForm(){
      this.form = this._formBuilder.group({
        institution: ["",[Validators.required]],
        contratUnits: this._formBuilder.array([])
      })
    }

    get contratUnits(){
      return this.form.get('contratUnits') as FormArray
    }

    CreateItem(): void {
      const item = this._formBuilder.group({
        produit:[null, [Validators.required]],
        typeContrat:[null, [Validators.required]],
        modules: [null, [Validators.required]],
        agences: [null, [Validators.required]],
        nbrPoste:[null],
        nbrAgence:[null],
        dateDebut:[null],
        dateFin:[null],
      } )
      let elt: string = "";
      this.selectedTypeContrat.push(elt);

      this.contratUnits.push(item)
    }

    RemoveItem(i:number){
      this.selectedTypeContrat.splice(i,1)
      this.contratUnits.removeAt(i)
    }

    annulerForm() {
      this.initForm()
      this.create === !this.create
    }

    getModule(i: number){
      this.contratService.getModule(this.contratUnits.controls[i].get('produit')?.value).pipe(
        first()
      ).subscribe({
        next: data =>{
            this.listeModule = data;
        },
        error: error => console.log(error)
      })
    }

    getAgence(){
      this.form.get('institution')?.valueChanges.subscribe(value=>{
        this.institutionService.getAgenceByInstitution(value).pipe(first()).subscribe({
          next: data=>{
              this.listeAgence = data
          }, error: error=>{
            console.log(error)
          }
        })
      })
    }

    lister(){
      this.contratService.getAll().pipe(first()).subscribe({
        next: data =>{
          this.listeContrat = data;
          /*
          this.listeContrat.forEach(x=>{
            x.dateDebut = new Date(x.dateDebut)
            x.dateFin = new Date(x.dateFin)
            x.dateDebutFormate = format(x.dateDebut,"dd/MM/yyyy")
            x.dateFinFormate = format(x.dateFin,"dd/MM/yyyy")
          })*/

        },
        error: error=> console.log(error)
      })
    }

    listerInstitution(){
      this.contratService.institutions().pipe(first()).subscribe({
        next: (data)=>{
          this.listeInstitution = data;
        },
        error: error=> console.log(error)
      })
    }

    onNameInput(event: any, name: string) {
      const input = event.target;
      const value = input.value;
      const pattern = /^[a-zA-Z-0-9 ]*$/;

      if (!pattern.test(value)) {
        input.value = value.replace(/[^a-zA-Z]/g, ''); // Filtrer les caractères non autorisés
      }

      this.avenantForm.controls[name].setValue(input.value);

      }

    onNameAgenceInput(event: any, name: string) {
      const input = event.target;
      const value = input.value;
      const pattern = /^[a-zA-Z-0-9 ]*$/;

      if (!pattern.test(value)) {
        input.value = value.replace(/[^a-zA-Z-0-9]/g, ''); // Filtrer les caractères non autorisés
      }

      this.avenantForm.controls[name].setValue(input.value);
      }

    listerProduit(){
      this.form.get('institution')?.valueChanges.subscribe(value=>{
        this.contratService.produits(value).pipe(first()).subscribe({
          next: data=>{
            this.listeProduit = data;
          },
          error: error=> console.log(error)
        })
      })

    }



    details(contrat: DetailContratInst){
      const data : DetailContratInst = contrat;

      this._router.navigate(["base/detail-contrat"], { queryParams: data})
    }

    editer(contrat: ContratInstitution){
      this.contratService.getOne(contrat.codeContrat).pipe(first()).subscribe({

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


