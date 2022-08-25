import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel } from './user-dashboard.model';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  selectedImg !: File | null;
  imgUrl : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvPJKXmD3mIlfOVee-apUyIhjnkCDFLtLGpxUA5-8hA&s";
  
  constructor(private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        updateOn: 'blur'}),

      email: new FormControl('', {
        validators: [Validators.required, Validators.email, Validators.pattern(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)],
        updateOn: 'blur'}),
      mobile: new FormControl('', {
        validators: [Validators.required, Validators.minLength(11), Validators.maxLength(18)],
        updateOn: 'blur'}),

      address: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur'}),

      image: null,
    });

    this.getAllUsers();
  }
  

  addBtnHandler(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails(){
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.address = this.formValue.value.address;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.image = this.formValue.value.image;
    // console.log(this.formValue.value.image);
    // console.log(this.userModelObj.image);
    
    this.api.postUser(this.userModelObj)
    .subscribe((res) => {
        const closeBtn = document.getElementById('close');
        closeBtn?.click();
        this.formValue.reset();
        this.getAllUsers();
      },
    (err) => {
      console.log(err);
      
      alert("wrong");
    })
  }
  getAllUsers(){
    this.api.getUser()
    .subscribe( res => {
      this.userData = res;
    })
  }
  deleteUser(row : any){
    this.api.deleteUser(row.id)
    .subscribe( res => {
      alert("User deleted");
      this.getAllUsers();
    })
  }
  editUser(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
  }
  updateUserDetails(){
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.address = this.formValue.value.address;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.api.updateUser(this.userModelObj, this.userModelObj.id)
    .subscribe(res => {
      alert("Updated Successfully");
      const closeBtn = document.getElementById('close');
      closeBtn?.click();
      this.formValue.reset();
      this.getAllUsers();
    })
  }

  imageHandler(event: any){
    this.selectedImg = <File>event.target.files[0];
  }
  submitHandler(){
    console.warn(this.formValue.value);
  }
}

