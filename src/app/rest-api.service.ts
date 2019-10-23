import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';


const apiUrl = "http://68.183.101.193/android/api/";
//const apiUrl = "http://api.zippopotam.us/";

let headers: any = new HttpHeaders();
headers.append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  loading: any;

  constructor(private http: HttpClient,public loadingCtrl: LoadingController ) { }


  login(email,password) {
    let logindata = {
      "email": email,
      "password": password,
      "fcm_token":localStorage.getItem("fcm_token")
    }
    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'login.php', JSON.stringify(logindata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(username,email,password) {
    let signupdata = {
      "username": username,
      "email": email,
      "password": password
    }
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl+'signup.php', JSON.stringify(signupdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
 


    // let header = new HttpHeaders();
    // header.append('Content-Type', 'application/json');
    // return this.http.post(apiUrl + "signup.php", signupdata, { headers: header });
  }

  updateprofile(firstname,lastname,dob,city,profile,description) {
    let profiledata = {
      "firstname": firstname,
      "lastname": lastname,
      "dob": dob,
      "city": city,
      "profile": profile,
      "description": description,      
      "jwt": localStorage.getItem("jwt")
    }
    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'update_profile.php', JSON.stringify(profiledata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  userprofile(data) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl+'userprofile.php', JSON.stringify(data)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  verify(code) {
    let verifydata = {
      "verification_code": code,
      "jwt": localStorage.getItem("jwt")
    }
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl+'verify_user.php', JSON.stringify(verifydata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  resendcode() {
    let verifydata = {
      "jwt": localStorage.getItem("jwt")
    }
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl+'resend_verification_code.php', JSON.stringify(verifydata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getridepost() {
    let verifydata = {
      "jwt": localStorage.getItem("jwt")
    }
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl+'get_all_category.php', JSON.stringify(verifydata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  createpost(postname,description,location,image,typeid) {
    let postdata =
    {
      "catid": typeid,
      "postname": postname,
      "description": description,
      "location": location,
      "post_media":image,
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'create_post.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getprofiledata(){
    let postdata =
    {
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'view_profile.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getuserprofiledata(userid){
    let postdata =
    {
      "user_id":userid,
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'view_profile.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getallpost(ride_type='',filter_value_data='',user_id='') {
    let postdata =
    {
      is_filter_value: filter_value_data,
      "jwt": localStorage.getItem("jwt"),
      "category_ids": ride_type,
      "user_id":user_id
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'get_all_post.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getpostdetail(post_id='') {
    let postdata =
    {
      "post_id": post_id,
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'get_post_detail.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  followuser(userid){
    let postdata =
    {
      "follow_user_id": userid,
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'follow_user.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  connection_request(){
    let postdata =
    {
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'connection_request.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  action_request(userid,status){
    let postdata =
    {
      "is_confirm": status,
      "follow_user_id": userid,
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'follow_user.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  likeunlikepost(postid,is_like){
    let postdata =
    {
      "post_id": postid,
      "is_like":is_like,
      "jwt": localStorage.getItem("jwt")
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'likeunlike_post.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  forgotpassword(email) {
    let postdata =
    {
      "email": email
    }

    return new Promise((resolve, reject) => {
          this.http.post(apiUrl+'forgot_password.php', JSON.stringify(postdata)).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

    getUserAllActivity(){
       let postdata = {
         "jwt": localStorage.getItem("jwt")
       }
       return new Promise((resolve, reject) => {
         this.http.post(apiUrl+'get_all_user_activity.php', JSON.stringify(postdata)).subscribe(res => {
             resolve(res);
           }, (err) => {
             reject(err);
           });
       });
     }

   getcommentlist(post_id) {
       let postdata =
       {
         "post_id": post_id,
         "jwt": localStorage.getItem("jwt"),

       }

       return new Promise((resolve, reject) => {
             this.http.post(apiUrl+'get_post_comments.php', JSON.stringify(postdata)).subscribe(res => {
             resolve(res);
           }, (err) => {
             reject(err);
           });
       });
     }

   usercommentpost(post_id,comment_text){
       let postdata =
       {
         "post_id": post_id,
         "comment":comment_text,
         "jwt": localStorage.getItem("jwt"),

       }

       return new Promise((resolve, reject) => {
             this.http.post(apiUrl+'user_comment_post.php', JSON.stringify(postdata)).subscribe(res => {
             resolve(res);
           }, (err) => {
             reject(err);
           });
       });
     }

     changepassword(current_password,password) {
      let signupdata = {
        "current_password": current_password,
        "new_password": password,
        "jwt": localStorage.getItem("jwt")
      }
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl+'change_password.php', JSON.stringify(signupdata)).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
   
    }

    enablenotification(notify){
      let is_notify = '0';
      if(notify){
        is_notify = '1';
      }
      let notifydata = {
        "is_notification": is_notify,
        "jwt": localStorage.getItem("jwt")
      }

      localStorage.setItem("is_notification",is_notify);
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl+'enable_notification.php', JSON.stringify(notifydata)).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }

    logout(){
      let data = {
        "jwt": localStorage.getItem("jwt"),
        "fcm_token":localStorage.getItem("fcm_token")
      } 
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl+'logout.php', JSON.stringify(data)).subscribe(res => {
            resolve(res);
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
      });
    }
    
  
}


