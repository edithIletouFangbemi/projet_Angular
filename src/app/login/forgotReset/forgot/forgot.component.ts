import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { LoginService } from 'src/app/services/loginService/login-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['../reset/reset.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private loginService: LoginService
    ){}

  forgotForm!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
     this.forgotForm = this._formBuilder.group({
      email: ['', [Validators.required]],
     })
  }

  send(){
    this.loginService.forgotPassword(this.forgotForm.get('email')?.value).pipe(first()).subscribe({
      next: response=>{
        Swal.fire("Reussite",JSON.stringify(response), "success")
      },
      error: error=>{
        Swal.fire("Echec",error.error, "error")
        console.log(error)
      }
    })
  }


}
