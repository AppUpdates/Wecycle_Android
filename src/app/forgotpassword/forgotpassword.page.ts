import { Component, OnInit } from '@angular/core';
import { LoadingController ,ToastController,AlertController} from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  hide: any;
  toast: any;
  res: any;
  isLoading = false;
  constructor(public showAlert: AlertController,public toastController: ToastController,public api: RestApiService, public loadingController: LoadingController, private router: Router) { }
  user = {
    email: ''
  };
  ngOnInit() {
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

  forgotpassword(){
    if(this.user.email == null || this.user.email == ''){
      this.showToast("Please enter email-id");
    }else{
      this.present();
      this.api.forgotpassword(this.user.email).then((result) => {
        this.res = result;
        console.log(this.res)
        console.log(this.res.data)
        // localStorage.setItem("user_id",this.res.data.id);
      
        this.dismiss();
        this.showToast(this.res.message);
        // localStorage.setItem('userid', result[0].id);
       
          this.router.navigateByUrl('/login');
     
        
      }, (err) => {
        console.log(err);
        this.dismiss();
        this.showToast(err.error.message);
      });
    }
  }

}
