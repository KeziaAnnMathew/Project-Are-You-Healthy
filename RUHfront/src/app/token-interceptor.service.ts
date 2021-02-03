import { HttpInterceptor } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { RuhserviceService } from './ruhservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req:any,next:any){
    let  authService=this.injector.get(RuhserviceService)
    let tokenizedrequest=req.clone(
      {
        setHeaders:{
          Authorization:`Bearer ${authService.getToken()}`
        }
      }
    )
    return next.handle(tokenizedrequest)
  }
}
