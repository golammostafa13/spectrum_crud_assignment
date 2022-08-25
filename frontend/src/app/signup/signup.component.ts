import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  private readonly API_URL = environment.API;

  signupForm !: FormGroup;
  imgUrl : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvPJKXmD3mIlfOVee-apUyIhjnkCDFLtLGpxUA5-8hA&s";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        updateOn: 'blur'}),

      email: new FormControl('', {
        validators: [Validators.required, Validators.email, Validators.pattern(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)],
        updateOn: 'blur'}),

      password: new FormControl('', {
        validators: [Validators.required, Validators.min(5)],
        updateOn: 'blur'}),

      mobile: new FormControl('', {
        validators: [Validators.required, Validators.minLength(11), Validators.maxLength(18)],
        updateOn: 'blur'}),
    });
  }
  signupHandler(){
    this.http.post<any>(`${this.API_URL}/signupUsers`, this.signupForm.value)
    .subscribe(res => {
      console.log(res);
      this.signupForm.reset();
      alert('Signup Successfully');
      this.router.navigate(['login']);
    }, err=>{
      alert("Something is wrong")
    })
  }
}

