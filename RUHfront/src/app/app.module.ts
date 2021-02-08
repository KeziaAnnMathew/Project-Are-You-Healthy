import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../app/token-interceptor.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueryComponent } from './query/query.component';
import { EditqueryComponent } from './editquery/editquery.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AdminqueryviewComponent } from './adminqueryview/adminqueryview.component';
import { FilterPipe } from './adminview/filter.pipe';
import { FilterqueryPipe } from './adminqueryview/filterquery.pipe';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavigationComponent,
    ProfileComponent,
    LoginComponent,
    QueryComponent,
    EditqueryComponent,
    EditprofileComponent,
    AdminloginComponent,
    AdminviewComponent,
    AdminqueryviewComponent,
    FilterPipe,
    FilterqueryPipe,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    MatGridListModule,
    MatFormFieldModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
