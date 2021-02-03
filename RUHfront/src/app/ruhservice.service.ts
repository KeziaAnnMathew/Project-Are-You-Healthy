import { Injectable } from '@angular/core';
import {UserModel} from './user.model';
import {HttpClient} from '@angular/common/http'
import { QueryModel } from './query.model';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RuhserviceService {

  private searchKeySubject=new Subject<string>();

  search:boolean=false;
  readonly baseurl='http://localhost:3000';
  constructor(private http:HttpClient) { }

  setSearchKeySubject(searchValue:string){
    this.searchKeySubject.next(searchValue)
  }

  getSearchKeySubjectAsObs(){
    return this.searchKeySubject.asObservable(); 
  }
  validateuser(user:any){
    return this.http.post<any>(this.baseurl+`/login/user`,{"user":user})

  }
  validateadmin(admin:any){
    return this.http.post<any>(this.baseurl+`/login/admin`,{"user":admin})
  }
  getprofile(_id:string){
    return this.http.get(this.baseurl+`/profile/${_id}`)
  }
  getallprofiles(){
    return this.http.get(this.baseurl+`/admin/getprofiles`)
  }
  getquery(_id:string){
    return this.http.get(this.baseurl+`/profile/queries/${_id}`)
  }
  getsinglequery(_id:string){
    return this.http.get(this.baseurl+`/profile/query/${_id}`)
  }
  addquery(item:QueryModel,_id:string){
    console.log(item)
    return this.http.post<any>(this.baseurl+`/profile/addquery/${_id}`,{"query":item})
    .subscribe(data=>{
      console.log(data)
    })
  }
  editquery(item:QueryModel,_id:string){
    console.log(item)
    return this.http.put(this.baseurl+`/profile/editquery/${_id}`,{"query":item})
  }
  deletequery(_id:string){
    return this.http.delete(this.baseurl+`/profile/deletequery/${_id}`)
  }
  adduser(item:UserModel){
    return this.http.post(this.baseurl+`/adduser`,{"user":item})
    .subscribe(data=>{
      console.log(data)
    })
  }

  editprofile(_id:string,prof:any,img:File){
    const formdata=new FormData();
    formdata.append('img',img);
    formdata.append("height",prof.height);
    formdata.append("weight",prof.weight);
    formdata.append("gender",prof.gender);
    formdata.append("bmi",prof.bmi);
    formdata.append("pulse",prof.pulse);
    return this.http.put(this.baseurl+`/profile/editprofile/${_id}`,formdata)
  }
  addsuggestion(_id:string,suggestion:string){
    return this.http.put(this.baseurl+`/admin/addsuggestion/${_id}`,{"suggestions":suggestion})
  }
  ///authentictn
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  userlogg(){
    return !!localStorage.getItem('id')//if user id present
  }
  searchfn(){
    return this.search;
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
