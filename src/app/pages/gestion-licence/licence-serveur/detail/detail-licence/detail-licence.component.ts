import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Institution } from 'src/app/model/institution';
import { LicenceServeur } from 'src/app/model/licenceServeur';
import { LicenceServeurReturn } from 'src/app/model/licenceServeurReturn';
import { LicenceServeurService } from 'src/app/services/licenceService/licenceServeurService/licence-serveur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-licence',
  templateUrl: './detail-licence.component.html',
  styleUrls: ['./detail-licence.component.scss']
})
export class DetailLicenceComponent implements OnInit{

  institution: Institution  = new Institution();
  listeDeDetail: LicenceServeurReturn[] = [];
  monObjet: LicenceServeur = new LicenceServeur();

  constructor(private _route: ActivatedRoute,
   private licenceService: LicenceServeurService
    ){}

  ngOnInit(): void {
    this._route.queryParams.subscribe(param=>{
      this.institution.codeInst = param['codeInst'];
      this.institution.nomInst = param['nomInst'];
      //this.institution.typeArchitecture = param['typeArchitecture']
    })

    this.listerLicence(this.institution.codeInst)

  }

  listerLicence(codeinst: string){
    this.licenceService.allByInst(codeinst).pipe(first()).subscribe({
      next: data=>{
        this.listeDeDetail = data
        console.log(this.listeDeDetail)
      },
      error: error=>console.log(error)
    })
  }

  download(liste: any){
    if(liste !== null){
      const blob = new Blob([liste],{type:'application/octet-stream'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }

  }

  // download(liste: LicenceServeurReturn){
  //   this.monObjet.agenceCode = liste.agence.codeAgence;
  //   this.monObjet.code = liste.code;
  //   this.monObjet.institutionCode = liste.institution.codeInst
  //   console.log("telecharger")
  //   this.licenceService.download(this.monObjet).pipe(first()).subscribe({
  //     next: data=>{
  //       var blob = new Blob([data], {type: 'application/txt'})
  //       var fileURL = URL.createObjectURL(blob)
  //       window.open(fileURL)
  //     },
  //     error: error=>console.log()
  //   })
  // }

  desactiver(){

  }
}
