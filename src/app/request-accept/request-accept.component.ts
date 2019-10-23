import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service'
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';


@Component({
  selector: 'app-request-accept',
  templateUrl: './request-accept.component.html',
  styleUrls: ['./request-accept.component.css']
})
export class RequestAcceptComponent implements OnInit {

  show:any; 
  res: any;
  toast: any;
  userid: any;
  isLoading: any;
  fname: any;
  lname: any;
  profile: any;
  totalFollowers: any;
  is_follow_request: any;
  totalMedia: any;
  totalPost: any;
  description: any;
  constructor(public api:RestApiService,private services:ServicesService,private router: Router, public loadingCtrl: LoadingController,public toastCtrl: ToastController,) {
    this.userid = this.router.getCurrentNavigation().extras.state.userid;
    console.log(this.userid);
    this.getuserprofile(this.userid);
   }
  images = this.services.images;

  ngOnInit() {
    this.services.getowl();
    this.getuserprofile(this.userid);
  }



  
  getuserprofile(userid){
    // this.present();
    this.api.getuserprofiledata(userid).then((result) => {
     this.res = result;
     console.log("request_accept");
     console.log(this.res);
    //  this.dismiss();
     this.fname = this.res.data.profile.first_name;
     this.lname = this.res.data.profile.last_name;
     this.description = this.res.data.profile.description;
     this.profile = "http://68.183.101.193/android/api/"+this.res.data.profile.profile;
     this.totalFollowers = this.res.data.profile.totalFollowers;
     this.is_follow_request = this.res.data.profile.is_follow_request;
     this.totalMedia = this.res.data.profile.totalMedia;
     this.totalPost = this.res.data.profile.totalPost;

     console.log(this.fname)
                
   }, (err) => {
    //  this.dismiss();
     console.log(err);
     this.showToast(err.error.message);
   });
 }

 async present() {
   this.isLoading = true;
   return await this.loadingCtrl.create({
     duration: 5000,
   }).then(a => {
     a.present().then(() => {
       console.log('presented');
       if (!this.isLoading) {
         a.dismiss().then(() => console.log('abort presenting'));
       }
     });
   });
 }

 async dismiss() {
   this.isLoading = false;
   return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
 }

 showToast(message) { 
   this.toast = this.toastCtrl.create({
     message: message,
     duration: 2000
   }).then((toastData)=>{
     console.log(toastData);
     toastData.present();
   });
 }

 HideToast(){
   this.toast = this.toastCtrl.dismiss();
 }

 action_request(status){
   this.present();
   this.api.action_request(this.userid,status).then((result) => {
    this.res = result;
    console.log(this.res);
    this.getuserprofile(this.userid);
    this.dismiss();
               
  }, (err) => {
    this.dismiss();
    console.log(err);
    this.showToast(err.error.message);
  });
 }



}
