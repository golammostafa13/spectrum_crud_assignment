import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

// const API_URL = environment.apiUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly API_URL = environment.API;
  loginForm !: FormGroup;
  imgUrl : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvPJKXmD3mIlfOVee-apUyIhjnkCDFLtLGpxUA5-8hA&s";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }
  loginHandler(){
    this.http.get<any>(`${this.API_URL}/signupUsers`)
    .subscribe(res => {
      const user = res.find((u:any) => {
        return u.email === this.loginForm.value.email && u.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success!!");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("User not Found!!!");
        // this.router.navigate
      }
    })
  }
}
