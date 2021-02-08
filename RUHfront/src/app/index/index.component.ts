import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuhserviceService } from '../ruhservice.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  id:any='';
  profile:UserModel[]|any;
  constructor(public serv:RuhserviceService,private router:Router) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('id');
    this.getProfile(this.id);
  }
  getProfile(id:string){
    this.serv.getprofile(id)
    .subscribe((data)=>{
      this.profile= JSON.parse(JSON.stringify(data));
  })
}
logoutfn(){
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  this.router.navigate(['/'])
  this.profile.uname='';
}
}

