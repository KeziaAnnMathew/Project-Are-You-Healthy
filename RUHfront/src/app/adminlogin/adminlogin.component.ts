import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuhserviceService } from '../ruhservice.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  hide=true;
  errorval:boolean=false;
  admin={
    email:'',
    password:''
  }
  constructor(public serv:RuhserviceService,private router:Router) { }

  ngOnInit(): void {
  }
  validateadmin(){
    this.serv.validateadmin(this.admin)
    .subscribe(res=>{
      if(res.doc==null){
        this.errorval=true;
        setTimeout(()=>{
          this.errorval = false;
     }, 3000);
      }
      else{
        localStorage.setItem('token',res.token)
        this.router.navigate([`/adminview`])
      }
      
    })
  }
}
