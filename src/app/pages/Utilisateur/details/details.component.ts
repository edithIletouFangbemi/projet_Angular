import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/model/utilisateur';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  user: Utilisateur = new Utilisateur() ;

  constructor(private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.user.codeUser = params['codeUser'];
      this.user.email = params['email'];
      this.user.firstname = params['firstname'];
      this.user.lastname = params['lastname'];
      this.user.role = params['role'];
      this.user.profil = params['profil'];
      this.user.statut = params['statut'];
    })
  }


}
