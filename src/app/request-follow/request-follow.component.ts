import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service'
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-request-follow',
  templateUrl: './request-follow.component.html',
  styleUrls: ['./request-follow.component.css']
})
export class RequestFollowComponent implements OnInit {

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
  is_follow_request_receive: any;
  is_follow_request_sent: any;
  follower_list: any;
  post_images:any;
  total_post_images:any;
  remaining_post_images:any;
  mypost:any;

  constructor(public api:RestApiService,private services:ServicesService,private router: Router, public loadingCtrl: LoadingController,public toastCtrl: ToastController,) {
    console.log(this.router.getCurrentNavigation().extras.state.userid);
    this.userid = this.router.getCurrentNavigation().extras.state.userid;
    this.getuserprofile(this.userid);
   }
  images=this.services.images;

  ngOnInit() {
    this.services.getowl();
    this.getuserprofile(this.userid);
  }

  getuserprofile(userid){
     this.present();
     this.api.getuserprofiledata(userid).then((result) => {
      this.res = result;
      console.log(this.res);
      this.dismiss();
      this.fname = this.res.data.profile.first_name;
      this.lname = this.res.data.profile.last_name;
      this.description = this.res.data.profile.description;
      this.profile = "http://68.183.101.193/android/api/"+this.res.data.profile.profile;
      this.totalFollowers = this.res.data.profile.totalFollowers;
      this.is_follow_request = this.res.data.profile.is_follow_request;
      this.totalMedia = this.res.data.profile.totalMedia;
      this.totalPost = this.res.data.profile.totalPost;
      this.is_follow_request_sent = this.res.data.profile.is_follow_request_sent;
      this.is_follow_request_receive = this.res.data.profile.is_follow_request_receive;
      this.follower_list = this.res.data.followers;
      this.post_images = this.res.data.photos;
      this.total_post_images = this.res.data.photos.length;  
      this.remaining_post_images = this.total_post_images - 2; 
      this.GetAllPost( this.res.data.profile.id);    
    }, (err) => {
      this.dismiss();
      console.log(err);
      this.showToast(err.error.message);
    });
  }

  GetAllPost(userId){
    this.present();
    this.api.getallpost('','',userId).then((result) => {
      // this.openDialog();
      this.res = result;
      this.mypost=this.res.data.latest;
   
      console.log(this.res);
      this.dismiss();
   }, (err) => {
      this.dismiss();
      console.log(err);  
     
        this.showToast("There are no post available");
    
     
    });
  }


  needtoaccept(){
    this.router.navigate(['/request-accept'], { state: { userid: this.userid} });
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

  followuser(){
    this.present();
    this.api.followuser(this.userid).then((result) => {
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
