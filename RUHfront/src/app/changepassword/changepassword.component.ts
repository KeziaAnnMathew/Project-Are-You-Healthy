import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuhserviceService } from '../ruhservice.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  id:any;
  profileItem=new UserModel('','','','','','',0,0,0,0,null,'');
  password='';
  newpassword:any;
  hide=true;
  hidec=true;
  toggle=false;
  pwd=true;
  valid=true;
  validstrong=true;
  constructor(public serv:RuhserviceService,public router:Router) { }

  ngOnInit(): void {
    this.serv.search=false;
    this.id=localStorage.getItem('id');
    this.serv.getprofile(this.id)
      .subscribe((data)=>{
        this.profileItem= JSON.parse(JSON.stringify(data));
      })
  }
  checkuser(){
    if(this.profileItem.password==this.password){
      this.toggle=true;
    }
    else{
      this.pwd=false;
      setTimeout(()=>{
        this.pwd = true;
   }, 3000);
    }
  }
  changepwd(){
    if(this.password==this.newpassword){
      this.valid=false;
      setTimeout(()=>{
        this.valid = true;
   }, 3000);
    }
    else if(!this.newpassword.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')){
      this.validstrong=false;
      setTimeout(()=>{
        this.validstrong = true;
   }, 3000);
    
    }
    else{
      this.serv.editpassword(this.id,this.newpassword)
      .subscribe((data)=>{
      })
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
      this.profileItem.uname='';
    }
   
  }
}
