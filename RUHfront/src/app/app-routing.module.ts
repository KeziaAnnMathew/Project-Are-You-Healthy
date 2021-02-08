import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminqueryviewComponent } from './adminqueryview/adminqueryview.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AuthGuard } from './auth.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EditqueryComponent } from './editquery/editquery.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QueryComponent } from './query/query.component';

const routes: Routes = [{path:'', component:IndexComponent},
{path:'login', component:LoginComponent},
{path:'login/admin', component:AdminloginComponent},
{path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
{path:'profile/query', canActivate:[AuthGuard],component:QueryComponent},
{path:'profile/editquery/:id',canActivate:[AuthGuard], component:EditqueryComponent},
{path:'profile/editprofile',canActivate:[AuthGuard], component:EditprofileComponent},
{path:'adminview',canActivate:[AuthGuard],component:AdminviewComponent},
{path:'profile/editprofile/changepwd',canActivate:[AuthGuard],component:ChangepasswordComponent},
{path:'adminview/query/:id',canActivate:[AuthGuard],component:AdminqueryviewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
