import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-notify',
  templateUrl: './profile-notify.component.html',
  styleUrls: ['./profile-notify.component.css']
})
export class ProfileNotifyComponent implements OnInit {
  res: any;
  isLoading:any;
  toast: any;
  mynotification:any;


  notifications = [
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'is in Mumbai, IN',time:'5 minutes ago',icons:'assets/img/location.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'liked your image',time:'0 minutes ago',icons:'assets/img/heart.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'Comment your Article',time:'35 minutes ago',icons:'assets/img/heart.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'is in Mumbai, IN',time:'5 minutes ago',icons:'assets/img/location.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'liked your image',time:'0 minutes ago',icons:'assets/img/heart.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'Comment your Article',time:'35 minutes ago',icons:'assets/img/heart.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'is in Mumbai, IN',time:'5 minutes ago',icons:'assets/img/location.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'liked your image',time:'0 minutes ago',icons:'assets/img/heart.png'},
    {img:'assets/img/follower.png',person:'Ronak Patel',action:'Comment your Article',time:'35 minutes ago',icons:'assets/img/heart.png'},
  ]

  constructor(public api:RestApiService,public navctrl: NavController,
    public loadingCtrl: LoadingController,public toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.getUserAllActivity();
  }
  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
}

  getUserAllActivity(){
    this.present();
    this.api.getUserAllActivity().then((result) => {
      // this.openDialog();
      this.res = result;
      this.mynotification= this.res.data;
      console.log(this.res);
      this.dismiss();
  }, (err) => {
      this.dismiss();
      console.log(err);  
     
        this.showToast("There are no notification.");
    
     
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

}
