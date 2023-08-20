import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  currentUser: any;

  constructor(private loginService:LoginService,
    private router: Router
    ){}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : {};

  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
    location.reload
  }

}
