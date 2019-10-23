import { Component, OnInit,NgZone } from '@angular/core';
import { NavController, Events,LoadingController, ToastController,Platform,ActionSheetController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ModalController } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {

  imageURI:any;
  imageFileName:any;
  base64Image:any;
  photos: any;
  correctPath: any;
  datePickerObjPtBr: any;
  selectedDate:any;
  fromDate: any;
  myDate: any;
  datePickerObj: any;
  mydate: any;
  autocompleteItems: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  res: any;
  

  constructor(
    public modalCtrl: ModalController,
      public api: RestApiService,
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
      private zone: NgZone
      ) {
this.mydate = new Date(); 
// let disabledDates: Date[] = [
// new Date("Wednesday, December 26, 1945"), // Works with any valid Date formats like long format
// ];
this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
this.autocomplete = { input: '' };
this.autocompleteItems = [];
// this.datePickerObj = {
//           fromDate: new Date(), 
//           showTodayButton: false, 
//           closeOnSelect: true, 
//           disableWeekDays: [4],
//           mondayFirst: true,
//           setLabel: "S", 
//           todayLabel: "T", 
//           closeLabel: "C", 
//           disabledDates: disabledDates, 
//           titleLabel: "Select a Date",
//           monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
//           weeksList: ["S", "M", "T", "W", "T", "F", "S"],
//           dateFormat: "yyyy-MM-dd" ,
//           clearButton : false 
//           };

          this.datePickerObj = {
            // fromDate: new Date(),
            // inputDate: moment("1982-07-22T10:00:00").format('DD/MM/YYYY'),
            showTodayButton: false,
            closeOnSelect: true,
            setLabel: 'Ok',
            closeLabel: 'Close',
            titleLabel: 'Select a Date',
            monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            weeksList: ["S", "M", "T", "W", "T", "F", "S"],
            dateFormat: 'DD/MM/YYYY',
            clearButton: false,           
            yearInAscending: true,
           
        };
        this.GetProfileData();
       } 
  
  public imagePath;
  imgURL: any;
  toast: any;
  public message: string;
 
  user = {
    fname: '',
    lname: '',
    dob: ''
  };

  

  async openDatePicker() {
 
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 'objConfig': this.datePickerObj }
  });
  await datePickerModal.present();
  datePickerModal.onDidDismiss()
    .then((data) => {
      // this.isModalOpen = false;
      console.log(data);
      this.myDate = data.data.date;
    });
}

  GetProfileData(){
    this.api.getprofiledata().then((result) => {
      this.res = result;
      console.log(this.res);
      localStorage.setItem("user_id",this.res.data.profile.id);
      this.user.fname = this.res.data.profile.first_name;
      this.user.lname = this.res.data.profile.last_name;
      this.myDate = this.res.data.profile.dob;
      this.base64Image = "http://68.183.101.193/android/api/"+this.res.data.profile.profile;
      this.autocomplete.input = this.res.data.profile.city;

                 
    }, (err) => {
      console.log(err);
      this.showToast(err.error.message);
    });
  }

  GoToDescription() {   
   
      if(this.user.fname == null || this.user.fname == ''){
        this.showToast("Please enter first name");
      }else if(this.user.lname == null || this.user.lname == ''){
        this.showToast("Please enter last name");
      }else if(this.myDate == null || this.myDate == ''){
        this.showToast("Please select DOB");
      }else if(this.autocomplete.input == null || this.autocomplete.input == ''){
        this.showToast("Please enter city");
      }else{
        localStorage.setItem("userfname",this.user.fname);
        localStorage.setItem("userlname",this.user.lname);
        localStorage.setItem("userdob",this.myDate);
        localStorage.setItem("usercity",this.autocomplete.input);
        localStorage.setItem("userimage",this.base64Image);
        this.router.navigateByUrl('/description'); 
      }
        
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
  this.autocomplete.input = item.terms[0].value;
  console.log(this.autocomplete.input);
  this.autocompleteItems = [];

}


//   preview(files) {
//     if (files.length === 0)
//       return;
 
//     var mimeType = files[0].type;
//     if (mimeType.match(/image\/*/) == null) {
//       this.message = "Only images are supported.";
//       return;
//     }
 
//     var reader = new FileReader();
//     this.imagePath = files;
//     reader.readAsDataURL(files[0]); 
//     reader.onload = (_event) => { 
//     this.imgURL = reader.result; 
//     }
//   }
  ngOnInit() {
  }

  // takePhoto() {
  //   const options : CameraOptions = {
  //     quality: 50, // picture quality
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options) .then((imageData) => {
  //       this.base64Image = "data:image/jpeg;base64," + imageData;
  //       console.log(this.base64Image)
  //       this.photos.push(this.base64Image);
  //       this.photos.reverse();
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }

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

  async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
        buttons: [
            {
                text: 'Gallery',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}

public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    this.correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    console.log(this.correctPath);
                    this.file.readAsDataURL(this.correctPath, currentName)
                    .then(base64File => {
                        let string = base64File.split(',');
                        let img = string[1];
                        this.base64Image = base64File;
                        console.log(base64File);
                        console.log(string);
                        console.log(img);
                       
                    })
                    .catch(() => {
                      
                    })
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            this.correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            console.log(this.correctPath);
            this.file.readAsDataURL(this.correctPath, currentName)
                .then(base64File => {
                    let string = base64File.split(',');
                    let img = string[1];
                    this.base64Image = img;
                    console.log(base64File);
                    console.log(string);
                    console.log(img);
                   
                })
                .catch(() => {
                  
                })
        }
    }, (err) => {
        console.log('Error while selecting image.');
    });
}

}
