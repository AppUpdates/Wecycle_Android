import { Component, OnInit } from '@angular/core';
import { LoadingController ,ToastController,AlertController} from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  hide: any;
  toast: any;
  res: any;
  isLoading = false;

  constructor(public showAlert: AlertController,public toastController: ToastController,public api: RestApiService, public loadingController: LoadingController, private router: Router) { }

  user = {
    email: '',
    password: ''
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


  Login() {
    if(this.user.email == null || this.user.email == ''){
      this.showToast("Please enter email-id");
    }else if(this.user.password == null || this.user.password == ''){
      this.showToast("Please enter password");
    }else{
      this.present();
      this.api.login(this.user.email,this.user.password).then((result) => {
        this.res = result;
        console.log(this.res)
        console.log(this.res.data)
        // localStorage.setItem("user_id",this.res.data.id);
        localStorage.setItem("jwt",this.res.jwt);
        localStorage.setItem("is_auth","1");
        localStorage.setItem("is_notification",this.res.data.is_notification);
        this.dismiss();
        this.showToast(this.res.message);
        // localStorage.setItem('userid', result[0].id);
        if(this.res.data.is_profile_update == 0){
          this.router.navigateByUrl('/profile');
        }else{
          this.router.navigateByUrl('/filter');
        }
        
      }, (err) => {
        console.log(err);
        this.dismiss();
        this.showToast(err.error.message);
      });
    }
 
  }

  ngOnInit() {
  }

}
