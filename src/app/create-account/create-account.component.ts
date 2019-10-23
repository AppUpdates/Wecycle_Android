import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { LoadingController,AlertController,ToastController  } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  hide = true;
  hide_second = true;
  current: any;
  users: any;
  message: any;
  toast: any;
  res: any;
  isLoading = false;

  constructor(public api: RestApiService,public toastController: ToastController, public alertCtrl: AlertController, public loadingController: LoadingController, private router: Router) { 
    this.current='0';
  }

  user = {
    username: '',
    email: '',
    password: '', 
    reppassword: '' 
  };


// showAlert(message){
//   async presentAlert(message) {
//     const alert = await this.alertCtrl.create({
//     message: 'Wecycle',
//     subHeader: message,
//     buttons: ['OK']
//    });
//    await alert.present(); 
// }
// }


async present() {
  this.isLoading = true;
  return await this.loadingController.create({
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
  return await this.loadingController.dismiss().then(() => console.log('dismissed'));
}

  showToast(message) {
    this.toast = this.toastController.create({
      message: message,
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  HideToast(){
    this.toast = this.toastController.dismiss();
  }

  SaveUser() {
    if(this.user.username == null || this.user.username == ''){
      this.showToast("Please enter username");
    }else if(this.user.email == null || this.user.email == ''){
      this.showToast("Please enter email-id");
    }else if(this.user.password == null || this.user.password == ''){
      this.showToast("Please enter password");
    }else if(this.user.reppassword == null || this.user.reppassword == ''){
      this.showToast("Please enter repeat password");
    }else if(this.user.reppassword != this.user.password){
      this.showToast("Password and Repeat Password must be same");
    }else{
    // this.api.register(this.user.username,this.user.email,this.user.password).subscribe(res => {
    //   console.log(res);
   
    // })
    this.present();
    this.api.register(this.user.username,this.user.email,this.user.password).then((result) => {
      console.log(result);
      //
      this.dismiss();
      this.res = result;
      localStorage.setItem("email",this.user.email);
      localStorage.setItem("jwt",this.res.jwt);
      this.showToast("Check your mail for verification code");
      this.router.navigateByUrl('/verify-account');
    }, (err) => {
      this.dismiss();
      console.log(err.error);
       this.showToast(err.error.message);
      // this.presentAlert(err);
    });
  }
}

  ngOnInit() {
  }
  @Output()
  myEvent = new EventEmitter();

  PushValue(value)
  {
    //alert("push value "+value);
    this.current=value;
    
    //this.calccomponent.calculate(this.current);
  }
}
