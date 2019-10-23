import { Component,Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NavController, Events,LoadingController, ToastController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';


// import { $ } from '../../../node_modules/protractor';
// declare var $:any;

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css']
})


export class DescriptionsComponent{
  
  animal: string;
  name: string;
  user: any;
  res: any;
  firstname: any;
  lastname: any;
  dob: any;
  city: any;
  profile: any;
  description: any;
  base64Image: any;
  toast: any;

  constructor(private router: Router,public toastCtrl: ToastController,public dialog: MatDialog,public events:Events,public api: RestApiService) {
    this.GetProfileData();
  }  
  ngOnInit(){
   
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '390px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  GetProfileData(){
    this.api.getprofiledata().then((result) => {
      this.res = result;
      console.log(this.res);
      this.description = this.res.data.profile.description;   
               
    }, (err) => {
      console.log(err);
      this.showToast(err.error.message);
    });
  }

  UpdateProfile(){
    console.log(this.description);
    this.firstname = localStorage.getItem("userfname");
    this.lastname = localStorage.getItem("userlname");
    this.dob = localStorage.getItem("userdob");
    this.city = localStorage.getItem("usercity");
    this.base64Image = localStorage.getItem("userimage");
    if(this.description == null || this.description == ''){
      this.showToast("Please enter discription");
    }else{
      this.api.updateprofile(this.firstname,this.lastname,this.dob,this.city,this.base64Image,this.description).then((result) => {
        // this.openDialog();
        this.res = result;
        console.log(this.res);
        localStorage.setItem("jwt",this.res.jwt);
        localStorage.setItem("profile_pic",this.res.data.profile.profile);  
        this.showToast(this.res.message);
        this.router.navigateByUrl('/filter'); 

      }, (err) => {
        console.log(err);  
        this.showToast(err);  
      });
    }
    }
  }

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./descriptions.component.css']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  

}