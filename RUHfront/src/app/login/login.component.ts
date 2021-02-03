import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RuhserviceService } from '../ruhservice.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true;
  user={
    email:'',
    password:''
  }
  errorval:boolean=false;
  userItem=new UserModel('','','','','','',0,0,0,0,null,'');
  registerform:FormGroup|any;

  constructor(public serv:RuhserviceService,private router:Router,private formBuilder:FormBuilder) { }
  sign_in_btn = document.querySelector("#sign-in-btn");
  sign_up_btn = document.querySelector("#sign-up-btn");
 
  container:any;
  ngOnInit(): void {
    this.registerform=this.formBuilder.group({
      'fname':[this.userItem.fname,[Validators.required]],
      'lname':[this.userItem.lname,[Validators.required]],
      'uname':[this.userItem.uname,[Validators.required]],
      'email':[this.userItem.email,[Validators.required,Validators.email]],
      'password':[this.userItem.password,[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]//add pwd validation
    })
  }
  displaychangesign(){
    this.container = document.querySelector(".container");
    this.container?.classList.add("sign-up-mode");
  }
  displaychangelog(){
    this.container = document.querySelector(".container");
    this.container?.classList.remove("sign-up-mode");
  }
  validateuser(){
    this.serv.validateuser(this.user)
    .subscribe(res=>{
      if(res.doc==null){
        this.errorval=true;
        setTimeout(()=>{
          this.errorval = false;
     }, 3000);
      }
      else{
      localStorage.setItem('id',res.doc._id)
      localStorage.setItem('token',res.token)
      this.router.navigate([`/profile`])
      }
      
    })
    

  }
  adduser(){
    this.serv.adduser(this.userItem)
    console.log(this.userItem)
    this.container?.classList.remove("sign-up-mode");
  }
  adminlogin(){

    this.router.navigate(['/loginadmin']);
  }

}
