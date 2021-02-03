import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RuhserviceService } from '../ruhservice.service';
import { UserModel } from '../user.model';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit,OnDestroy {
  profiles:UserModel|any;
  private searchKeySubscription=new Subscription
  constructor(public serv:RuhserviceService,private router:Router) { }
  filterName='';

  ngOnInit(): void {
    this.serv.search=true;
      this.serv.getallprofiles().subscribe((data)=>{
        this.profiles=JSON.parse(JSON.stringify(data));
      })
      this.searchKeySubscription= this.serv.getSearchKeySubjectAsObs().subscribe((val)=>{
        this.filterName=val;
    })  
  }
  getprofilequery(profile:UserModel){
    this.router.navigate([`/adminview/query/${profile._id}`])
  }
  ngOnDestroy(){
    this.searchKeySubscription.unsubscribe();
  }
}
