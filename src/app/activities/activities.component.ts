import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  res: any;
  isLoading:any;
  mypost_popular: any;
  mypost_latest: any;
  mypost_following: any;
  toast: any;
  userid: any;
  filter_value_data: any;
  ride_type: any;
  selectedSegment: any;
  showPopular: any;
  showLatest: any;
  showFollowing:any;
  SwipedTabsIndicator: any;
  SwipedTabsSlider: any;
  constructor(public api:RestApiService,public navctrl: NavController,
              public loadingCtrl: LoadingController,public toastCtrl: ToastController,
              private router: Router,) {
  
  this.showFollowing = true;
  this.selectedSegment = "following";
  this.ride_type = this.router.getCurrentNavigation().extras.state.ride_type;
  this.filter_value_data = this.router.getCurrentNavigation().extras.state.filter_value_data;
  this.GetAllPost();
}

  ngOnInit() {
  }

  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  onSegmentChanged(segmentButton: any) {
    

  if(segmentButton.detail.value == "popular"){
    this.selectedSegment = "popular";
    this.showPopular = true;
    this.showLatest = false;
    this.showFollowing = false;
  }

  if(segmentButton.detail.value == "latest"){
    this.selectedSegment = "latest";
    this.showPopular = false;
    this.showLatest = true;
    this.showFollowing = false;
  }

  if(segmentButton.detail.value == "following"){
    this.selectedSegment = "following";
    this.showPopular = false;
    this.showLatest = false;
    this.showFollowing = true;
  }
 
}

  GetAllPost(){
    this.present();
    this.api.getallpost(this.ride_type,this.filter_value_data).then((result) => {
      // this.openDialog();
      this.res = result;
      this.mypost_popular=this.res.data.popular;
      this.mypost_latest=this.res.data.latest;
      this.mypost_following=this.res.data.following;
      console.log(this.res);
      this.dismiss();

      
     
  
    }, (err) => {
      this.dismiss();
      console.log(err);  
     
        this.showToast("There are no post available");
    
     
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

  gotoblog(postid,postname){
    this.router.navigate(['/blog'], { state: { postid: postid} });
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
