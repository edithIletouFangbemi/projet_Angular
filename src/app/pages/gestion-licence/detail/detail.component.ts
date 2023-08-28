import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { LicenceRecapRequest } from 'src/app/model/licenceRecapRequest';
import { RecapAgence } from 'src/app/model/reapAgence';
import { LicenceClienteServiceService } from 'src/app/services/licenceService/licenceCliente/licence-cliente-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    constructor(private _route: ActivatedRoute,
    private licenceClienteService:LicenceClienteServiceService,
    private _router: Router
    ){}

    recapitulatif: LicenceRecapRequest = new LicenceRecapRequest();
    listeRecapAgence: RecapAgence[] = []

    ngOnInit(): void {
      this._route.queryParams.subscribe(param=>{
        this.recapitulatif.codeInst = param["codeInst"];
        this.recapitulatif.nomInst = param["nomInst"];
        this.recapitulatif.typeArchitecture = param["typeArchitecture"];
        this.recapitulatif.nbrProduitActif = param["nbrProduitActif"];
      })
      this.recapAgence(this.recapitulatif.codeInst)
    }

    recapAgence(codeinst:string){
      this.licenceClienteService.getRecapAgence(codeinst).pipe(first()).subscribe({
        next: data=>{
          this.listeRecapAgence = data;
        },
        error: error=> console.log(error)
      })
    }

    detail(recap: RecapAgence){
      const data: RecapAgence = Object.assign({}, recap)
      this._router.navigate(['base/detail-poste'], {queryParams: data})
    }


}
