import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login-service.service';
import { first } from 'rxjs';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Login } from '../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin! : FormGroup;
  isLogged:boolean = false;
  hide:boolean=true;

  constructor( private _router: Router,
    private loginService: LoginService,
    private _formBuilder: FormBuilder
     ){}
  ngOnInit(){
    this.initForm()
  }

  onLogin(){
    const data : Login = Object.assign({},this.formLogin.value);
    this.loginService.onLogin(data).pipe(first()).subscribe({
      next: data=>{
        Swal.fire("Réussite","connexion réussie","success").then(()=>{
            localStorage.setItem('isLogged',"true");
            localStorage.setItem('currentUser', JSON.stringify(data))
            localStorage.setItem('token', data.token)

            this._router.navigateByUrl("/base/dashboard");
          })

      },
      error: error =>{
        Swal.fire(
          {
            title:"Erreur de Connexion",
            text:"Identiifiant incorrectes, Reprenez!",
            icon: "error",
            confirmButtonText:"OK"
          }
        );
        console.log(error)
        location.reload
        this.initForm()
      }
    });

    }

  initForm(){
    this.formLogin = this._formBuilder.group({
      email : ["", [Validators.required, Validators.email]],
      password : ["", [Validators.required]]
    })

  }

}
