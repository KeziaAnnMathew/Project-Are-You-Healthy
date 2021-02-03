import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryModel } from '../query.model';
import { RuhserviceService } from '../ruhservice.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  id='';
  i=0;
  addform:FormGroup|any;
  queryItem=new QueryModel('','','','','','');
  queries:any;
  qry:any;
  noquery=false;
  constructor(public serv:RuhserviceService,private router:Router,private route:ActivatedRoute,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.serv.search=true;
    this.route.params.subscribe(params => {
      this.id = params['id'];})
    this.serv.getquery(this.id)
  .subscribe((data)=>{
  this.queries=JSON.parse(JSON.stringify(data));
  this.qry=this.queries;
  if(!this.queries.length){ this.noquery=true;}
})
this.addform=this.formbuilder.group({
  'heading':[this.queryItem.heading,[Validators.required]],
  'area':[this.queryItem.area,[Validators.required]],
  'comments':[this.queryItem.comments,[Validators.required]]
})
  }
  editquery(query:QueryModel){
    this.router.navigate([`profile/editquery/${query._id}`])//id of query
  }
  deletequery(query:QueryModel){
    if(confirm("Are you sure you want to delete")){
      for(this.i=0;this.i<this.queries.length;this.i++){
        if(query._id==this.queries[this.i]._id){
          this.queries.splice(this.i,1);
        }
      }
    this.serv.deletequery(query._id).subscribe(()=>{

    })
    this.router.navigate([`profile/query/${this.id}`])
    }
    else{
      this.router.navigate([`profile/query/${this.id}`])
    }
  }
  adding(){
    this.qry.push(this.queryItem);
    console.log(this.queryItem.heading)
    console.log(this.addform)
    alert("Succesfully Added your Query")
    this.serv.addquery(this.queryItem,this.id);
    this.queryItem=new QueryModel('','','','','','')
  }
}
