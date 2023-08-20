import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ResetPasswordRequest } from 'src/app/model/resetPasswordRequest';
import { LoginService } from 'src/app/services/loginService/login-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['../reset//reset.component.scss']
})
export class ModifierComponent implements OnInit{
  constructor(
    private _formBuilder : FormBuilder,
    private loginService: LoginService,
    private _router: Router
  ){

  }

  modifierForm!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.modifierForm = this._formBuilder.group({
      verificationToken: ['',[Validators.required]],
      email: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      firstname: ['',[Validators.required]],
      oldPassword: ['',[Validators.required]],
      newPassword: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]],
    })
  }

  resetPassword(){
    if(this.modifierForm.get("confirmPassword")?.value === this.modifierForm.get("confirmPassword")?.value ){
      const data : ResetPasswordRequest = Object.assign({}, this.modifierForm.value)
      this.loginService.reset(data).pipe(first()).subscribe({
        next: data =>{
          Swal.fire("Reussie","reinitialisation fait avec succès","success")
          this._router.navigate(['/'])
        },
        error: error =>{
          console.log(error)
          Swal.fire("Echec", error.error, "error")
        }
      })
    }
    else{
      Swal.fire("Erreur","le nouveau mot de passe et le mot de passe de confirmation doivent être identiques")
    }

  }

  verifyPassword(event: any){

  }
}
