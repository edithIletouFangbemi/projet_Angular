import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { PosteDetailRequest } from 'src/app/model/PosteDetailRequest';
import { LicenceClienteReturn } from 'src/app/model/licenceClienteReturn';
import { PetitDetail } from 'src/app/model/petitDetail';
import { RecapAgence } from 'src/app/model/reapAgence';
import { LicenceClienteServiceService } from 'src/app/services/licenceService/licenceCliente/licence-cliente-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-poste',
  templateUrl: './detail-poste.component.html',
  styleUrls: ['./detail-poste.component.scss']
})
export class DetailPosteComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private licenceService: LicenceClienteServiceService
    ){

  }
recap: RecapAgence = new RecapAgence();
listeRecapPoste: PosteDetailRequest[] = [];
licenceReturn: PetitDetail = new PetitDetail();

  ngOnInit(): void {
    this._route.queryParams.subscribe(param=>{
      this.recap.codeAgence = param["codeAgence"];
      this.recap.nom = param["nom"];
      this.recap.nbrModuleActif = param["nbrModuleActif"];
      this.recap.nbrProduitActif = param["nbrproduitActif"];
    })
    this.recapPoste(this.recap.codeAgence)
  }

  recapPoste(codeAgence: string){
    this.licenceService.getRecapPoste(codeAgence).pipe(first()).subscribe({
      next: data=>{
        this.listeRecapPoste = data
      },
      error: error=>console.log(error)
    })
  }

  // download(licence: any){
  //   if(licence !== null){
  //     const blob = new Blob([licence],{type:'application/octet-stream'});
  //     const url = window.URL.createObjectURL(blob);
  //     window.open(url);
  //   }
  // }

  getLicence(codeLicence: string){
    this.licenceService.getLicence(codeLicence).pipe(first()).subscribe(
      {
        next : data =>{
            this.licenceReturn = data
        },
        error: (error)=>{
          console.log(error)
        }
      }

    )
  }
  download(licence :PosteDetailRequest ){
    if(licence !== null){
      this.licenceService.getLicence(licence.codeLicence).pipe(first()).subscribe(
        {
          next : data =>{
              this.licenceReturn = data
          },
          error: (error)=>{
            console.log(error)
          }
        }

      )
      try{
        const data : any = licence
        let fileContent = "";
        for (const [key, value] of Object.entries(data)) {
          fileContent += `${key}: ${value}\n`;
        }
        let filename = licence.libelleModule+"."+licence.libellePoste;
        const blob = new Blob([fileContent],{type:'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

       // const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
      catch(error){
        Swal.fire('Echec', "Une erreur s'est produite", 'error');
      }
    }
  }

  regenerer(codeLicence: string){

  }

  desactiver(codeLicence: string){

  }

  activer(codeLicence: string){

  }
}
