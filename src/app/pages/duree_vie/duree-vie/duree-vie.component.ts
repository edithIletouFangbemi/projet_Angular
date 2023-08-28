import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { first } from 'rxjs';
import { ParametreVie } from 'src/app/model/Parametre-vie';
import { DureeVieService } from 'src/app/services/duree-vie/duree-vie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-duree-vie',
  templateUrl: './duree-vie.component.html',
  styleUrls: ['./duree-vie.component.scss']
})
export class DureeVieComponent implements OnInit {

  constructor(private dureeService:DureeVieService,
    private _formBuilder: FormBuilder,

    ){}
formParametre!: FormGroup;
editParametre!: FormGroup;
listeParams: ParametreVie[] = [];

  ngOnInit(): void {
    this.initForm()
    this.lister()
  }

  initForm(){
    this.formParametre = this._formBuilder.group({
      quantite: ["",[Validators.required]],
      typeParametre: ["",[Validators.required]],
      typeLicence: ["",[Validators.required]],
    })

    this.editParametre = this._formBuilder.group({
      id:[""],
      quantite: ["",[Validators.required]],
      typeParametre: ["",[Validators.required]],
      typeLicence: ["",[Validators.required]],
    })
  }

  get quantite(){
    return this.formParametre.get('quantite')
  }

  get typeParametre(){
    return this.formParametre.get('typeParametre')
  }

  get typeLicence(){
    return this.formParametre.get('typeLicence')
  }


  save(){
    const data : ParametreVie = Object.assign({}, this.formParametre.value)

    this.dureeService.save(data).pipe(first()).subscribe({
      next: data=>{
        this.formParametre.reset()
        this.lister()
        Swal.fire("Réussite","Enregistrement fait avec succès","success")
      },
      error: error=>{
        console.log(error);
        this.formParametre.reset()
        Swal.fire("Echec",error.error,"error")
      }
    })
  }

  lister(){
    this.dureeService.all().pipe(first()).subscribe({
      next: data=>{
        this.listeParams = data

        this.listeParams.forEach(param=>{
          param.dateCreationFormatee = format(new Date(param.dateCreation), 'dd/MM/yyyy');

          if(param.dateFin != null){
          param.dateFinFormatee = format(new Date(param.dateFin), 'dd/MM/yyyy');
          }
        })
      },
      error: error=> console.log(error)
    })
  }

  activate(id: number){
    Swal.fire({
      title: "Activation",
      text:"Êtes vous sûr de vouloir activer ce parametre ?",
      confirmButtonText:"Activer",
      icon: "question",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#00f"
    }).then((response)=>{
        if(response.isConfirmed){
          this.dureeService.activate(id).pipe(first()).subscribe({
            next: data=>{
              this.lister()
              Swal.fire("Réussite","activation fait avec succès","success")
            },
            error: error=>{
              console.log(error)
              Swal.fire("Echec",error.error,"error")
            }
          })
        }
    });

  }
  deactivate(id: number){
    Swal.fire({
      title: "Désactivation",
      text:"Êtes vous sûr de vouloir désactiver ce parametre ?",
      confirmButtonText:"Désacctiver",
      icon: "question",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#00f"
    }).then((response)=>{
        if(response.isConfirmed){
          this.dureeService.deactivate(id).pipe(first()).subscribe({
            next: data=>{
              this.lister()
              Swal.fire("Réussite","désactivation fait avec succès","success")
            },
            error: error=>{
              console.log(error)
              Swal.fire("Echec",error.error,"error")
            }
          })
        }
    });
  }

  editer(param: ParametreVie){
    this.editParametre.patchValue(param);
    console.log("editer param")
    console.log(param)
  }

  update(){
    const data2 : ParametreVie = Object.assign({}, this.editParametre.value)

    this.dureeService.update(data2).pipe(first()).subscribe({
      next: data=>{
        this.lister()
        this.editParametre.reset
        Swal.fire("Réussite", "Mise à jour fait avec succès", "success")
      },
      error: error =>{
        console.log(error)
        this.editParametre.reset
        Swal.fire("Echec",error.error, "error")
      }
    })
  }



}
