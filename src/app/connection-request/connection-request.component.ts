import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';

@Component({
  selector: 'app-connection-request',
  templateUrl: './connection-request.component.html',
  styleUrls: ['./connection-request.component.css']
})
export class ConnectionRequestComponent implements OnInit {

  res: any;
  isLoading: any;
  toast: any;
  userdata: any;

  constructor(public api:RestApiService,private router: Router, public loadingCtrl: LoadingController,public toastCtrl: ToastController,) { 
    this.connection_request();
  }
 
  // users = [
  //   {name:'Ronak Patel',},
  //   {name:'Vihang',action:'37 Mutual Connections'},
  //   {name:'Sandip',action:'2 Mutual Connections'},
  //   {name:'Abhi',action:'Liked your photo'},
  //   {name:'Darshita',action:'Comment on your Article'},
  //   {name:'Juhi',action:'7 Mutual Connections'},
  //   {name:'Mrugesh',action:'7 Mutual Connections'},
  //   {name:'Nirav',action:'7 Mutual Connections'}
  // ]
  ngOnInit() {
  }

  connection_request(){
    this.present();
    this.api.connection_request().then((result) => {
     this.res = result;
     this.userdata = this.res.data;
     console.log(this.res);
     this.dismiss();
                
   }, (err) => {
     this.dismiss();
     console.log(err);
     this.showToast("There is no any connection request");
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

gotoaccept(userid){
  this.router.navigate(['/request-accept'], { state: { userid: userid} });
}

}
