import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RuhserviceService } from '../ruhservice.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:any='';
  profile:UserModel[]|any;
  selectedfile:any|File;
  constructor(public serv:RuhserviceService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
      this.serv.search=false;
      this.id=localStorage.getItem('id');
      this.getProfile(this.id);
  }
  getProfile(id:string){
    this.serv.getprofile(id)
    .subscribe((data)=>{
      this.profile= JSON.parse(JSON.stringify(data));
      this.selectedfile=this.profile.img;
  })
}
getquery(){
  this.router.navigate([`profile/query/${this.id}`])
}
editprofile(){
  this.router.navigate([`profile/editprofile/${this.id}`])
}

}
