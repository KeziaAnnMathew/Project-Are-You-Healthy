import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryModel } from '../query.model';
import { RuhserviceService } from '../ruhservice.service';

@Component({
  selector: 'app-editquery',
  templateUrl: './editquery.component.html',
  styleUrls: ['./editquery.component.css']
})
export class EditqueryComponent implements OnInit {
  idval:string='';
  id='';
  editform:FormGroup|any
  query:any=new QueryModel('','','','','','','');
  constructor(public serv:RuhserviceService,private router:Router,private route:ActivatedRoute,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.serv.search=false;
    this.route.params.subscribe(params => {
      this.id = params['id'];})
      this.serv.getsinglequery(this.id)
      .subscribe((res)=>{
        this.query=JSON.parse(JSON.stringify(res))
      })
      this.editform=this.formbuilder.group({
        'heading':[this.query.heading,[Validators.required]],
        'area':[this.query.area,[Validators.required]],
        'comments':[this.query.comments,[Validators.required]]
      })
  }
  editing(){
    this.serv.editquery(this.query,this.id)
    .subscribe((res:any)=>{
      this.idval=res.doc.userid;
       this.router.navigate([`profile/query/${this.idval}`])
    })
   
  }
}
