import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  res: any;
  isLoading:any;
  comments: any;
  toast: any;
  postid: any;
  commenttext: any;
  user_pic: any;
  isenabled:boolean=false;

  constructor(public api:RestApiService,public navctrl: NavController,
    public loadingCtrl: LoadingController,public toastCtrl: ToastController,
    private router: Router) {
      this.postid = this.router.getCurrentNavigation().extras.state.postid;
      this.user_pic = "http://68.183.101.193/android/api/"+localStorage.getItem("profile_pic");
      this.GetCommentList(this.postid);

      
     }

  ngOnInit() {
   
  }


  showVal(quantity){  
    if(this.commenttext !== ''){
      //enable the button
      this.isenabled=true; 
      }else{
      //disable the button
      this.isenabled=false;
      }
  }

  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  GetCommentList(postid){
    this.present();
    this.api.getcommentlist(postid).then((result) => {
      // this.openDialog();
      this.res = result;
      this.comments = this.res.data;
      //console.log(this.res.data.post_media[0]);
      
      //this.comments.push(this.res.data);
      //this.mypost=JSON.stringify(this.res.data);
      
      console.log(this.comments);
      this.dismiss();
  }, (err) => {
      this.dismiss();
      console.log(err);  
     
        this.showToast("There are no post available");
    
     
    });
  }

  postcomment(){
    this.present();

    this.api.usercommentpost(this.postid,this.commenttext).then((result) => {
      // this.openDialog();
      this.res = result;
      if(this.res.success){
        this.GetCommentList(this.postid);
      }
      //console.log(this.res.data.post_media[0]);
      //this.comments = this.res.data;
      //this.comments.push(this.res.data);
      //this.mypost=JSON.stringify(this.res.data);
      
      //console.log(this.comments);
      this.dismiss();
  }, (err) => {
      this.dismiss();
      console.log(err);  
     
        this.showToast("There are no comments available");
    
     
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
