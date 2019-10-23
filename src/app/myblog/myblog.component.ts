import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css']
})
export class MyblogComponent implements OnInit {
  res: any;
  isLoading:any;
  mypost: any= [];
  toast: any;
  post_media: any;
  postid: any;
  postname: any;
  

  constructor(private socialSharing: SocialSharing,public api:RestApiService,public navctrl: NavController,
    public loadingCtrl: LoadingController,public toastCtrl: ToastController,
    private router: Router) {
      this.postid = this.router.getCurrentNavigation().extras.state.postid;
      this.postname = this.router.getCurrentNavigation().extras.state.postname;
      //console.log(this.postid)
      
   }

  ngOnInit() {
    this.GetPostDetail(this.postid);
  }
  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  SharePost(){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {
  message: this.postname, // not supported on some apps (Facebook, Instagram)
  subject: 'Wecycle App', // fi. for email
  files: ['', ''], // an array of filenames either locally or remotely
  url: 'https://www.website.com/foo/#bar?a=b',
  chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
  appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
  iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
};

var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
};

var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
};

this.socialSharing.shareWithOptions(options);
  }

  GetPostDetail(postid){
    this.present();
    this.api.getpostdetail(postid).then((result) => {
      // this.openDialog();
      this.res = result;
      //console.log(this.res.data.post_media[0]);
      
      this.mypost.push(this.res.data);
      //this.mypost=JSON.stringify(this.res.data);
      this.post_media = this.res.data.post_media;
      console.log(this.mypost);
      this.dismiss();
  }, (err) => {
      this.dismiss();
      console.log(err);  
     
        this.showToast("There are no post available");
    
     
    });
  }

  GoToComment(postid){
    this.router.navigate(['/comment'], { state: { postid: postid} });
  }

  likeUnlike(postid,is_like){
    this.present();
    this.api.likeunlikepost(postid,is_like).then((result) => {
     this.res = result;
     console.log(this.res);
     this.mypost = [];
     this.GetPostDetail(postid);
     this.dismiss();
                
    }, (err) => {
      this.dismiss();
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

  gotoviewprofile(userid){
    this.router.navigate(['/request-follow'], { state: { userid: userid} });
    // this.router.navigate(['/request-accept'], { state: { userid: userid} });
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
}
