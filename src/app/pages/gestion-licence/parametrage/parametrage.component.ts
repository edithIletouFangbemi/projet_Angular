import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Parametre } from 'src/app/model/parametre';
import { ParametreRequest } from 'src/app/model/parametreRequest';
import { ParametreServiceService } from 'src/app/services/parametre/parametre-service.service';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent implements OnInit{

  displayedColumns: string[] = ['Données paramétrées', 'Date de Debut','Date de Fin','Statut'];

  paginator!:MatPaginator
  sort!: MatSort

  dataSource: MatTableDataSource<Parametre> = new MatTableDataSource<Parametre>();
  parametres: Parametre[] = [];

  parametreForm! : FormGroup;
  editForm!: FormGroup
  listeParametre!: Parametre[]
  parametre!:ParametreRequest;
  currentDate: Date = new Date()

  constructor(
    private _formBuilder: FormBuilder,
    private parametreService: ParametreServiceService,
    private datePipe: DatePipe
  ){
    this.currentDate = new Date()
  }

  ngOnInit(): void {
    this.initForm()
    this.listerParametre()
    this.currentDate

  }

  initForm(){
    this.parametreForm = this._formBuilder.group({
      dateDebut: ["",[Validators.required]],
      parametres: this._formBuilder.group({
        adresseIp:[""],
        adresseMac: [""],
        idMachine:[""],
        idDisqueDur: [""]
      })
    });


    this.editForm = this._formBuilder.group({
      codeParametre:[""],
      dateDebut: ["",[Validators.required]],
      parametres: this._formBuilder.group({
        adresseIp:[""],
        adresseMac: [""],
        idMachine:[""],
        idDisqueDur: [""]
      })
    });


  }

   selectedValues!: string[]
  onCheckboxChange(): void{
    this.selectedValues = []
    const values = this.parametreForm.get("parametres")?.value;
    if (values.adresseIp) {
      this.selectedValues.push('adresseIp');
    }
    if(values.adresseMac){
      this.selectedValues.push('adresseMac');
    }
    if(values.idMachine){
      this.selectedValues.push('idMachine');
    }
    if(values.idDisqueDur){
      this.selectedValues.push('idDisqueDur');
    }
  }

  onEditCheckboxChange(): void{
    this.selectedValues = []
    const values = this.editForm.get("parametres")?.value;
    if (values.adresseIp) {
      this.selectedValues.push('adresseIp');
    }
    if(values.adresseMac){
      this.selectedValues.push('adresseMac');
    }
    if(values.idMachine){
      this.selectedValues.push('idMachine');
    }
    if(values.idDisqueDur){
      this.selectedValues.push('idDisqueDur');
    }
  }

  save(){
    this.onCheckboxChange()
    const data : ParametreRequest = Object.assign({},{
      codeParametre: null,
      parametres: this.selectedValues,
      dateDebut : this.parametreForm.get("dateDebut")?.value,
      dateFin : this.parametreForm.get("dateFin")?.value,
      dateDebutFormatee: null,
      description:"",
      statut: null,
      dateFinFormatee: null
    })
    this.parametreService.save(data).pipe(first()).subscribe({
      next: data=>{
        Swal.fire("Réussite","opération réussie","success")
        this.listerParametre()
        this.initForm()
        this.selectedValues = []
      },
      error: error=>{
        Swal.fire("Echec","Opération échoué veuillez reprendre","error")
        console.log(error)
      }
    })
  }

  getParametre(data2: Parametre): void{
    this.parametre = new ParametreRequest()
    this.parametreService.getOne(data2.codeParametre).pipe(first()).subscribe({
      next: data=>{

        let description: string = data.description;
        let parametres: string[] = description.split(",");
        this.parametre.codeParametre = data.codeParametre;
        this.parametre.dateDebut = data.dateDebut;
        this.parametre.dateFin = data.dateFin;
        this.parametre.parametres = parametres;
        this.parametre.dateDebut = new Date(this.parametre.dateDebut)
        this.parametre.dateDebutFormatee = format(this.parametre.dateDebut, 'dd/MM/yyyy');

        this.editForm.get("dateDebut")?.patchValue(this.parametre.dateDebut);
        this.editForm.get("dateFin")?.patchValue(this.parametre.dateFin);
        this.editForm.get("codeParametre")?.patchValue(this.parametre.codeParametre);

        if (this.parametre.parametres.includes("adresseIp")) {
          this.editForm.get("parametres.adresseIp")?.patchValue(true);
        } else {
          this.editForm.get("parametres.adresseIp")?.patchValue(false);
        }

        if (this.parametre.parametres.includes("adresseMac")) {
          this.editForm.get("parametres.adresseMac")?.patchValue(true);
        } else {
          this.editForm.get("parametres.adresseMac")?.patchValue(false);
        }

        if (this.parametre.parametres.includes("idMachine")) {
          this.editForm.get("parametres.idMachine")?.patchValue(true);
        } else {
          this.editForm.get("parametres.idMachine")?.patchValue(false);
        }

        if (this.parametre.parametres.includes("idDisqueDur")) {
          this.editForm.get("parametres.idDisqueDur")?.patchValue(true);
        } else {
          this.editForm.get("parametres.idDisqueDur")?.patchValue(false);
        }
      },
      error: error=>{
        console.log(error)
      }
    })
  }

  listerParametre(){
    this.selectedValues = []
    this.parametreService.getAll().pipe(first()).subscribe({
      next: data=>{
        console.log(data)
        this.listeParametre = data;

        this.listeParametre.forEach(param=>{
          param.dateDebut = new Date(param.dateDebut);
          this.selectedValues= param.description.split(',');
          param.parametres = []


            if(this.selectedValues.includes("adresseIp")){
              param.parametres.push("Adresse IP")
            }
            if(this.selectedValues.includes("adresseMac")){
              param.parametres.push("Adresse Mac")
            }
            if(this.selectedValues.includes("idMachine")){
              param.parametres.push("Identifiant de la Machine")
            }
            if(this.selectedValues.includes("idDisqueDur")){
              param.parametres.push("Identifiant du Disque Dur")
            }



          // Formater les dates
          param.dateDebutFormatee = format(param.dateDebut, 'dd/MM/yyyy');
          if(param.dateFin !== null){
            param.dateFin = new Date(param.dateFin);
            param.dateFinFormatee = format(param.dateFin, 'dd/MM/yyyy');
          }
          this.dataSource = new MatTableDataSource(this.listeParametre );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;





        })

      },
      error: error=>{
        console.log(error)
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editer(){
    this.onEditCheckboxChange();
    const data : ParametreRequest = Object.assign({},{
      codeParametre: this.editForm.get("codeParametre")?.value,
      parametres: this.selectedValues,
      dateDebut : this.editForm.get("dateDebut")?.value,
      dateFin : this.editForm.get("dateFin")?.value,
      dateDebutFormatee: null,
      dateFinFormatee: null,
      description:"",
      statut: null
    })

    this.parametreService.update(data.codeParametre, data).pipe(first()).subscribe({
      next: data2=>{
        Swal.fire("Réussite","opération réussie","success")
        this.listerParametre()
        this.initForm()
        this.selectedValues = []
      },
      error: error=>{
        Swal.fire("Echec","Opération échoué veuillez reprendre","error")
        console.log(error)
      }
    })


  }

  desactiver(code:string){
    Swal.fire({
      title: 'Confirmation de desactivation',
      text: 'Êtes-vous sûr de vouloir desactiver ce parametre?',
      icon: 'question',
      confirmButtonText: 'Desactiver',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
  }).then((result)=>{
    if(result.isConfirmed){
      this.parametreService.delete(code).pipe(first()).subscribe({
        next: data=>{
          Swal.fire("Réussite","Opération reussie","success")
          this.listerParametre()
        },
        error: error=>{
          Swal.fire("Echec","Veuillez reprendre svp","error")
          console.log(error)
        }
      })
    }
  })
  }
}






