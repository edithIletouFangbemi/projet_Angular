import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Login } from 'src/app/model/login';
import { LoginService } from 'src/app/services/loginService/login-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {

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

    oublier(){
      this._router.navigate(['/forgotPassword'])
    }
  initForm(){
    this.formLogin = this._formBuilder.group({
      email : ["", [Validators.required, Validators.email]],
      password : ["", [Validators.required]]
    })

  }


}
