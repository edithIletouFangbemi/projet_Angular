import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Utilisateur } from 'src/app/model/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateurService/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  currentUser!: any;
  formEdit!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private _router: Router
  ){ }

 ngOnInit(): void {
  const storedUser = localStorage.getItem('currentUser');
  this.currentUser = storedUser ? JSON.parse(storedUser) : {};
  this.initForm()
 }

 initForm(){
  this.formEdit = this._formBuilder.group({
    codeUser : [''],
    lastname : ['', [Validators.required]],
    firstname : ['', [Validators.required]],
    email : ['', [Validators.required]],
    role : ['']
  })
 }

 update(){
  this.formEdit.patchValue({
    codeUser: this.currentUser.codeUser,
    lastname: this.currentUser.lastname,
    firstname: this.currentUser.firstname,
    email: this.currentUser.email,
    role: this.currentUser.profil
  })
 }

 editer(){

  const dataUser : Utilisateur = Object.assign({}, this.formEdit.value)
  console.log(dataUser)

  this.utilisateurService.update(dataUser.codeUser, dataUser).pipe(first()).subscribe({
    next: data=>{
      Swal.fire("Reussie","Opération reussie","success")
      this._router.navigate(['/'])
    },
    error: error=>{
      console.log(error)
      Swal.fire("Echec", "reprenez","error")
    }
  })
 }

}
