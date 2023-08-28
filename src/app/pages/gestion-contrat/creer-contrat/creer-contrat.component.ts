import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Contrat } from 'src/app/model/Contrat';
import { ContratUnit } from 'src/app/model/ContratUnit';
import { DetailContratInst } from 'src/app/model/DetailContratInst';
import { Agence } from 'src/app/model/agence';
import { DetailContratInstitution } from 'src/app/model/detailContratInstitution';
import { Institution } from 'src/app/model/institution';
import { Module } from 'src/app/model/module';
import { Produit } from 'src/app/model/produit';
import { ContratInstitutionServiceService } from 'src/app/services/contratInstitution/contrat-institution-service.service';
import { InstitutionServiceService } from 'src/app/services/institution/institution-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creer-contrat',
  templateUrl: './creer-contrat.component.html',
  styleUrls: ['./creer-contrat.component.scss']
})
export class CreerContratComponent implements OnInit {

  @ViewChild('regForm') regForm: ElementRef | undefined; // Assurez-vous que l'élément a un référencement dans le template


  suite: boolean = false;
  listeInstitution: Institution[] = [];
  listeContrat!: DetailContratInst[];
  listeProduit!: Produit[];
  selectedTypeContrat!: string;
  contratForm!: FormGroup;
  currentDate: Date = new Date();
  anotherDate: Date = new Date(); // Remplacez avec votre autre date
  dateAfterAddingDays!: Date;
  detailContrat!: DetailContratInstitution;
  form!: FormGroup;
  listeModule!: Module[];
  listeAgence!: Agence[];
  avenantForm!: FormGroup;
  numberEntered!: number;
  selectedItems!: string;
  myDictionnary: Map<string, string[]> = new Map<string, string[]>();


  userArray: any[] = [];
  filteredUsers: any []= [];
  oldUserObj: any;
  searchText: string ='';
  itemSelected: string[] = []

  constructor(
    private _formBuilder : FormBuilder,
    private contratService: ContratInstitutionServiceService,
    private _router : Router,
    private institutionService: InstitutionServiceService,
    datePipe: DatePipe
    ){
      this.currentDate = new Date();

    }

    ngOnInit(){
      this.initForm()
      this.listerInstitution()
      this.getModule()
      this.getAgence()
      this.listerProduit()
      this.getDate()
    }


    getDate(){
        this.form.get('dateDebut')?.valueChanges.subscribe(value=>{
          this.anotherDate.setDate((new Date(value)).getDate() + 2)
        })
    }

    suivant(){
      this.suite = !this.suite;
    }

    newContrat(){
      const data2 : Contrat = Object.assign({},this.form.value);
      console.log(data2)
      this.contratService.save(data2).pipe(first()).subscribe({
        next: data=>{
         Swal.fire("Reussite","opération éffectuer avec succès","success")
          this.form.reset()


          Swal.fire({
            title: 'Contrat Crée avec succès',
            text: ' le contrat est créé avec succès?',
            icon: 'success',
            confirmButtonText: 'ok',

        }).then(()=>{

            this._router.navigate(["base/gestion-contrat"])

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
        institution: ['',[Validators.required]],
        produit:['', [Validators.required]],
        typeContrat:['', [Validators.required]],
        nbrAgence:[''],
        dateDebut:['', [Validators.required]],
        dateFin:[''],
        contratUnits: this._formBuilder.array([])
      }, [Validators.required])
    }

    get institution(){
      return this.form.get('institution')
    }
    get produit(){
      return this.form.get('produit')
    }
    get typeContrat(){
      return this.form.get('typeContrat')
    }

    get contratUnits(){
      return this.form.get('contratUnits') as FormArray
    }

    get nbrAgence(){
      return this.form.get('nbrAgence')
    }
    get dateDebut(){
      return this.form.get('typeContrat')
    }

    CreateItem(): void {
      const item = this._formBuilder.group({
        type:['', [Validators.required]],
        module: ['', [Validators.required]],
        agence: ['', [Validators.required]],
        nbrPoste:[''],
        dateDebut:[''],
        dateFin:[''],
      } )

      this.itemSelected.push("")

      this.contratUnits.push(item)
    }

    RemoveItem(i:number){
      //this.selectedTypeContrat.splice(i,1)
      this.contratUnits.removeAt(i)
    }

    Validation(i: number){
      if(!this.hasError(i)){
        let contratunits: ContratUnit[] = this.form.get('contratUnits')?.value ;
        let contratunit: ContratUnit = contratunits[i];
        if(this.myDictionnary.has(contratunit["module"])){
          let value = this.myDictionnary.get(contratunit["module"]);
          value?.push(contratunit["agence"]);
          this.myDictionnary.set(contratunit["module"], value!);
        }else{
          let value:string[] = [contratunit["agence"]]
          value?.push(contratunit["agence"]);
          this.myDictionnary.set(contratunit["module"], value!);
        }
      }
      else{
        Swal.fire("Echec","une erreur s'est produite","error")
      }

    }

    hasError(i: number){
      let rep = false;
      let contratunits: ContratUnit[] = this.form.get('contratUnits')?.value ;
      let contratunit: ContratUnit = contratunits[i];
      if(this.myDictionnary.has(contratunit["module"])){
        let agences = this.myDictionnary.get(contratunit["module"])
        if(agences != undefined){
          agences?.forEach(x => {
            if(x == contratunit["agence"])
            rep = true;
        });
      }
    }
      return rep;

    }








    annulerForm() {
      this.initForm()
    }

    getModule(){
      this.listeModule = []
      this.contratService.getModule(this.form.get('produit')?.value).pipe(
        first()
      ).subscribe({
        next: data =>{
            this.listeModule = data;
        },
        error: error => console.log(error)
      })
    }

    getAgence(){
      this.listeAgence = []
      this.form.get('institution')?.valueChanges.subscribe(value=>{
        this.institutionService.getAgenceByInstitution(value).pipe(first()).subscribe({
          next: data=>{
              this.listeAgence = data
          }, error: error=>{
            // console.log(error)
          }
        })
      })
    }

    listerProduit(){
      this.listeProduit = []
      this.form.get('institution')?.valueChanges.subscribe(value=>{
        this.contratService.produits(value).pipe(first()).subscribe({
          next: data=>{
            this.listeProduit = data;
          },
          error: error=> console.log(error)
        })
      })

    }



    listerInstitution(){
      this.contratService.institutions().pipe(first()).subscribe({
        next: (data)=>{
          this.listeInstitution = data;
          // console.log(this.listeInstitution)
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


    onNameSort() {
      const filteredData =  this.filteredUsers.sort((a: any, b: any) =>
      a.name.localeCompare(b.name));
      this.filteredUsers = filteredData;
    }

    filter(event: any) {
      this.filteredUsers = this.userArray.filter((searchData:any) => {
        let search = event;
        let values = Object.values(searchData);
        let flag = false
        values.forEach((val: any) => {
          if (val.toString().toLowerCase().indexOf(search) > -1) {
            flag = true;
            return;
          }
        })
        if (flag) {
          return searchData
        }
      });
    }

    loadAllUser() {

    }
    onEdit(userObj: any) {
      this.oldUserObj = JSON.stringify(userObj);
      this.userArray.forEach(element => {
        element.isEdit = false;
      });
      userObj.isEdit = true;
    }
    onAdd() {
      /* const obj = {
        "module": "",
        "agence": "",
        "type": "",
        "dateDebut": "",
        "dateFin": "",
      };
      this.userArray.unshift(obj); */
      //CreateItem();
    }
    onUpdate(userObj:any) {
      debugger;
      //write api call and send obj
    }
    onCancel(obj:any) {
      const oldObj =  JSON.parse(this.oldUserObj);
      obj.name = oldObj.name;
      obj.username=  oldObj.username;
      obj.isEdit = false;
    }

    onDelete(obj:any) {

    }


}
