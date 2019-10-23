import { Component, OnInit,NgZone } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NavController, Events,LoadingController, ToastController,ActionSheetController,Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
declare var google;
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit {

  res: any;
  base64Image: any;
  toast: any;
  correctPath: any;
  options: any;
  imageResponse: any;
  imagearray: any;
  categorytype: any;
  selected: any;
  autocompleteItems: any;
  GoogleAutocomplete: any;
  autocomplete: any;

  constructor(  public api: RestApiService,
    public loadingController: LoadingController,
    private router: Router,
    public navCtrl: NavController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private file: File,
    public events:Events,
    public platform : Platform,
    public actionSheetCtrl: ActionSheetController,
    public filePath: FilePath,
    public imagePicker: ImagePicker,
    private zone: NgZone) {

      this.GetRideType();
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
     }
  post = {
    postname: '',
    discription: ''
  };

  ngOnInit() {
  }

  CreatePost(){

    if(this.post.postname == null || this.post.postname == ''){
      this.showToast("Please enter post name");
    }else if(this.selected == null || this.selected == ''){
      this.showToast("Please select ride type");
    }
    // else if(this.post.discription == null || this.post.discription ==''){
    //   this.showToast("Please enter post description");
    // }
    else if(this.autocomplete.input == null || this.autocomplete.input == ''){
      this.showToast("Please enter city/country");
    }
    // else if(this.imagearray == null || this.imagearray == ''){
    //   this.showToast("Please select post images");
    // }    
    else{
      this.api.createpost(this.post.postname,this.post.discription,this.autocomplete.input,this.imagearray,this.selected).then((result) => {
        // this.openDialog();
        this.res = result;
        console.log(this.res);
        this.showToast(this.res.message);
        this.router.navigateByUrl('/activity');
    
      }, (err) => {
        console.log(err);    
         this.showToast(err);
      });
    }

  }

  GetRideType(){
    this.api.getridepost().then((result) => {
      // this.openDialog();
      this.res = result;
      this.categorytype = this.res.data;
      console.log(this.res);
  
    }, (err) => {
      console.log(err);    
    });
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

  back(){
    alert("1")
  }

  getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      //maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagearray = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        var currentName = results[i].substr(results[i].lastIndexOf('/') + 1);
        this.correctPath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
        console.log(currentName);
        this.file.readAsDataURL(this.correctPath , currentName)
        .then(base64File => {
            let string = base64File.split(',');
            let img = string[1];
            this.base64Image = img;
            console.log(base64File);
            console.log(string);
            console.log(img);
            this.imageResponse.push('data:image/jpeg;base64,' +this.base64Image);        
            this.imagearray.push(base64File); 
        })
        .catch(() => {
          
        })
       
      }
    }, (err) => {
      alert(err);
    });
  }


  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          console.log(predictions);
          if (predictions !== null) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
      });
  }

  selectSearchResult(item) {
    console.log(item);
    console.log(item.description);
    this.autocomplete.input =  item.terms[0].value;
    console.log(this.autocomplete.input);
    this.autocompleteItems = [];

  }


}
  

 


