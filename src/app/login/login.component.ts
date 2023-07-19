import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login-service.service';
import { first } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  isLogged:boolean = false;
  hide:boolean=true;

  constructor( private _router: Router, private loginService: LoginService ){}
  ngOnInit(){

  }

  onLogin(){
    this.loginService.onLogin(this.email, this.password).pipe(first()).subscribe({
      next: ()=>{
        Swal.fire(
          {
            title:"Reussite",
            text:"connexion reussie",
            icon: "success",
            confirmButtonText:"OK"

          })
          localStorage.setItem('isLogged','true');
          this._router.navigateByUrl("/base/dashboard");
      },
      error: error =>{
        Swal.fire(
          {
            title:"Erreur de Connexion",
            text:"une erreur s'est produite, Veuillez reprendre!",
            icon: "error",
            confirmButtonText:"OK"

          }
        )
        localStorage.setItem('isLogged','true');
        this._router.navigate(["/base/dashboard"]);
      }
    });

    }

}
