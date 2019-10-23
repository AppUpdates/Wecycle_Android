import { Component, OnInit,ViewChild } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  is_notfication:any; 
  res:any;
  show:any; 
  toast: any;
  isLoading: any;

  constructor(private emailComposer: EmailComposer,private router: Router,public api:RestApiService, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.is_notfication = localStorage.getItem("is_notification");

   }

  ngOnInit() {
  }

  SendFeedback(){
    let email = {
      to: 'dhrup.abhilasha@gmail.com',
      subject: 'WeCycle App Feedback',
      body: 'Write feedback here!',
      isHtml: true
    }

    // this.emailComposer.isAvailable().then((available: boolean) =>{
    //   if(available) {
        //Now we know we can send
        this.emailComposer.open(email);
    //   }
    //  });

    
  }

  changeNotificationValue(notify){
    // this.present();
    this.api.enablenotification(notify).then((result) => {
      this.res = result;
     
      console.log(this.res)
                 
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

  SendBug(){
    let email = {
      to: 'dhrup.abhilasha@gmail.com',
      subject: 'WeCycle App Bug',
      body: 'Write feedback here!',
      isHtml: true
    }

    // this.emailComposer.isAvailable().then((available: boolean) =>{
    //   if(available) {
        //Now we know we can send
        this.emailComposer.open(email);
    //   }
    //  });
  }

  GoToProfile(){
    this.router.navigateByUrl('/profile'); 
  }

  GoToAbout(){
    this.router.navigateByUrl('/about'); 
  }

    GoToChangePassword(){
    this.router.navigateByUrl('/changepassword'); 
  }
}
