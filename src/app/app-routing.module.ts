import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', loadChildren: './home/home.module#HomePageModule' },
// ];
import { CreateAccountComponent } from './create-account/create-account.component';
import { StartpageComponent } from './startpage/startpage.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { SettingsComponent } from './settings/settings.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RequestFollowComponent } from './request-follow/request-follow.component';
import { RequestAcceptComponent } from './request-accept/request-accept.component';
import { ConnectionRequestComponent } from './connection-request/connection-request.component';
import { ProfileNotifyComponent } from './profile-notify/profile-notify.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';
import { MyblogComponent } from './myblog/myblog.component';
import { FilterComponent } from './filter/filter.component';
import {ActivitiesComponent} from './activities/activities.component';
import {CreatepostPage} from './createpost/createpost.page';

const routes: Routes = [
  // {path:'',redirectTo:'/start-page',pathMatch:'full'},
  {path:'start-page',component:StartpageComponent},
  {path:'create-account',component:CreateAccountComponent},
  {path:'verify-account',component:VerifyAccountComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileDataComponent},
  {path:'settings',component:SettingsComponent},
  {path:'description',component:DescriptionsComponent},
  {path:'terms',component:TermsConditionsComponent},
  {path:'request-follow',component:RequestFollowComponent},
  {path:'request-accept',component:RequestAcceptComponent},
  {path:'profile-notify',component:ProfileNotifyComponent},
  {path:'connection',component:ConnectionRequestComponent},
  {path:'filter',component:FilterComponent},
  {path:'blog',component:MyblogComponent},
  {path:'activity',component:ActivitiesComponent},
  {path: 'createpost', loadChildren: './createpost/createpost.module#CreatepostPageModule' },
  { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'comment', loadChildren: './comment/comment.module#CommentPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
