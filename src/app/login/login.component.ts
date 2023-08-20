import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLogged:boolean = false;


  constructor( private _router: Router, private loginService: LoginService ){}
  ngOnInit(){
  }
/*  onLogin(){
    this.loginService.onLogin().pipe(first()).subscribe({
      next: () =>{
        console.log("submit .....")
       return this._router?.navigate(['/base/dashboard']);
      }
    }



    )

  }*/


}
