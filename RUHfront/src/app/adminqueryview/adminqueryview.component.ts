import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryModel } from '../query.model';
import { RuhserviceService } from '../ruhservice.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-adminqueryview',
  templateUrl: './adminqueryview.component.html',
  styleUrls: ['./adminqueryview.component.css']
})
export class AdminqueryviewComponent implements OnInit {
  id:string='';
  profile:UserModel|any;
  queries:QueryModel|any;
  noquery=false;
  query=new QueryModel('','','','','','');
  constructor(public serv:RuhserviceService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.serv.search=true;
    this.route.params.subscribe(params => {
      this.id = params['id'];})
      this.serv.getprofile(this.id)
      .subscribe(prof=>{
        this.profile=JSON.parse(JSON.stringify(prof));
      })
    this.serv.getquery(this.id)
    .subscribe(data=>{
      this.queries=JSON.parse(JSON.stringify(data));
      if(!this.queries.length){
        this.noquery=true;
      }
      else{
        this.noquery=false;
      }
      console.log(this.noquery)
    })
  }
  addsugg(query:QueryModel){
    this.serv.addsuggestion(query._id,query.suggestions)
    .subscribe(data=>{
    })
   alert("Edited succesfully");
  }
  deletesugg(query:QueryModel){
    query.suggestions='';
    this.serv.addsuggestion(query._id,query.suggestions)
    .subscribe(data=>{
    })
  }
}
