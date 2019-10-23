import { Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any;
  notification_data: any;
  userid: any;
  page: any;
  postid: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private oneSignal: OneSignal
  ) {

   

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
 this.statusBar.styleDefault();
 this.splashScreen.hide();
 if(localStorage.getItem("is_auth") == "1"){
  this.router.navigateByUrl('/filter');
}else{
  this.router.navigateByUrl('/start-page');
}
if (this.platform.is('cordova')) {

  if (this.platform.is('android')) {
    this.oneSignal.startInit('c8b79c6f-d611-4cb0-aed8-b7f5934f765d', '770306878114');
  }
  if (this.platform.is('ios')) {
    this.oneSignal.startInit('c8b79c6f-d611-4cb0-aed8-b7f5934f765d');
  }
this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

this.oneSignal.handleNotificationReceived().subscribe(data => {
    // do something when notification is received
    console.log("receive "+JSON.parse(JSON.stringify(data)));
    console.log("receive "+JSON.parse(JSON.stringify(data.payload)));
  });
this.oneSignal.handleNotificationOpened().subscribe(data => {
    // do something when a notification is opened
    console.log(JSON.parse(JSON.stringify(data)));
    console.log(JSON.parse(JSON.stringify(data.notification.payload)));
    this.notification_data = JSON.parse(JSON.stringify(data.notification.payload));
    this.page = this.notification_data.additionalData.page;
    if(this.notification_data.additionalData.user_id){
    this.userid = this.notification_data.additionalData.user_id;
    this.router.navigate([this.page], { state: { userid: this.userid} });
    }
    else if(this.notification_data.additionalData.post_id){
      this.postid = this.notification_data.additionalData.post_id;
      this.router.navigate([this.page], { state: { postid: this.postid} });
    }
    
  });

  this.oneSignal.endInit();

 // Then You Can Get Devices ID

   this.oneSignal.getIds().then(identity => {
      //  alert(identity.pushToken + " It's Push Token");
      //  alert(identity.userId + " It's Devices ID");
       localStorage.setItem("fcm_token",identity.userId);
     });

    

 
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    //   if(localStorage.getItem("is_auth") == "1"){
    //     this.router.navigateByUrl('/filter');
    //   }else{
    //     this.router.navigateByUrl('/start-page');
    //   }
    // });
  }
})
  }
}
