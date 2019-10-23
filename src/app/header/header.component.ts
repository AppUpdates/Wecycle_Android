import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  navlinks=[
    // {name:'Start Page',path:'start-page'},
    // {name:'Create Account',path:'create-account'},
    // {name:'Verify Account',path:'verify-account'},
    // {name:'Welcome',path:'welcome'},
    // {name:'Login',path:'login'},
    // {name:'Profile',path:'profile'},
    // {name:'Description',path:'description'},
    // {name:'Request Follow',path:'request-follow'},
    // {name:'Accept Request',path:'request-accept'},
    {name:'Notifications',path:'profile-notify',value:'notification'},
    {name:'Connection',path:'connection',value:'connection'},
    // {name:'Activities',path:'activity'},
    // {name:'Blog',path:'blog'},
    {name:'Filter',path:'filter',value:'filter'},
    {name:'Settings',path:'settings',value:'settings'},
    {name:'Terms and Conditions',path:'terms',value:'termsandcondition'},
    {name:'Logout',path:'login',value:'logout'},
  ]
  constructor(public api: RestApiService) { }
  
  ngOnInit() {
  }

  selectlink(selectedlink){
    if(selectedlink == 'logout'){
      this.api.logout().then((result) => {
        console.log(result);
      }, (err) => {
       //  this.dismiss();
        console.log(err);
        });
    }
  }
}
