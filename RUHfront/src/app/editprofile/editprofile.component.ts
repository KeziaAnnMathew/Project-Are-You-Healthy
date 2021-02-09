import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RuhserviceService } from '../ruhservice.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  id:any='';
  prof:any
  bmi:any;
  selectedFile:any|File;
  profileItem=new UserModel('','','','','','',0,0,0,0,null,'');
  constructor(public serv:RuhserviceService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.serv.search=false;
    this.id=localStorage.getItem('id');
      this.serv.getprofile(this.id)
      .subscribe((data)=>{
        this.profileItem= JSON.parse(JSON.stringify(data));
        this.selectedFile=this.profileItem.img;
      })
    
    this.prof={
      height:this.profileItem.height,
      weight:this.profileItem.weight,
      pulse:this.profileItem.pulse,
      gender:this.profileItem.gender
    }
  }
  upload(event:any){
    this.selectedFile=event.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
      this.profileItem.img = reader.result; 
    }
  }
  editprofile(){
    this.bmi=(this.profileItem.weight*100)/((this.profileItem.height **2)/100);
    this.bmi=this.bmi.toFixed(2);
    this.profileItem.bmi=this.bmi;
    this.serv.editprofile(this.id,this.profileItem,this.selectedFile)
    .subscribe((data)=>{
    })
    alert("Succesfully Edited");
    this.router.navigate([`/profile`])
  }
  change(){
    this.router.navigate([`profile/editprofile/changepwd`])
  }
  
}
