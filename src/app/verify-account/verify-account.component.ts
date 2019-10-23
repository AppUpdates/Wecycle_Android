import { Component, OnInit } from '@angular/core';
// import { $ } from '../../../node_modules/protractor';
import * as $ from 'jquery';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { LoadingController,AlertController,ToastController  } from '@ionic/angular';
// declare const $:any;
// declare var jQuery: any;
@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  toast: any;
  display_num: any;
  res: any;
  email: any;
  isLoading = false;

  constructor(public api: RestApiService,public toastController: ToastController, public alertCtrl: AlertController, public loadingController: LoadingController, private router: Router) { 

    this.email = localStorage.getItem("email");
  }


  ngOnInit() {
    $(".keypad .keybtn").click(function(){
      var text = $(this).text();
      if (text !== "<") {
        $(".display_num .digitHolder .numTxtbox").each(function () {
          var input_text = $(this).text();
          // console.log(input_text)
          if (!input_text) {
            $(this).text(text);
            console.log($(this).text(text));
            $(this).parents(".digitHolder").addClass("purple_circle").removeClass("cursor_class");
            $(this).parents(".digitHolder").next().addClass("cursor_class");
            return false;
          }
        });
      }
    });
    $('#clear').click(function(){
      $($(".display_num .digitHolder .numTxtbox").get().reverse()).each(function () {
        var input_text = $(this).text();
        if (input_text) {
          $(this).text("");
          $(this).parents(".digitHolder").removeClass("purple_circle");
          $(this).parents().find(".cursor_class").removeClass("cursor_class").prev().addClass("cursor_class");
          return false;
        }
      });
    })
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

  GetVerify(){
    var code = '';
    $(".display_num .digitHolder .numTxtbox").each(function () {
      var input_text = $(this).text();
      code = code + input_text;
    });

    if(code == ''){
      this.showToast("Please enter verification code");
    }else if(code.length != 4){
      this.showToast("Verification code must be 4 digit");
    }else{
    this.present();
    this.api.verify(code).then((result) => {
      this.dismiss();
      console.log(result);
      this.res = result;
      this.showToast(this.res.message);
      this.router.navigateByUrl('/welcome');
    }, (err) => {
      this.dismiss();
      console.log(err.error);
       this.showToast(err.error.message);
      // this.presentAlert(err);
    });
  }
  }

  ResendCode(){
    this.present();
    this.api.resendcode().then((result) => {
      this.dismiss();
      console.log(result);
      this.res = result;
      this.showToast(this.res.message);
    }, (err) => {
      this.dismiss();
      console.log(err.error);
       this.showToast(err.error.message);
      // this.presentAlert(err);
    });
    }

}
