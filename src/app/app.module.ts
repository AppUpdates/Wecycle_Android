import { NgModule } from '@angular/core';
import { BrowserModule,HAMMER_GESTURE_CONFIG  } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { GestureConfig } from '@angular/material';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Ionic4DatepickerModule } from
    '@logisticinfotech/ionic4-datepicker';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input';
import {MatIconModule, MatNativeDateModule,MatDialogModule, MatButtonToggleModule, MatSliderModule, MatRadioModule} from '@angular/material';
import { MatTabsModule } from "@angular/material/tabs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { OneSignal } from '@ionic-native/onesignal/ngx';


import { CreateAccountComponent } from './create-account/create-account.component';
import { StartpageComponent } from './startpage/startpage.component';
import { AppRegisterComponent } from './app-register/app-register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RequestFollowComponent } from './request-follow/request-follow.component';
import { RequestAcceptComponent } from './request-accept/request-accept.component';
import { ConnectionRequestComponent } from './connection-request/connection-request.component';
import { ProfileNotifyComponent } from './profile-notify/profile-notify.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';
import { MyblogComponent } from './myblog/myblog.component';
import { FilterComponent } from './filter/filter.component';
import {DialogOverviewExampleDialog} from '../app/descriptions/descriptions.component';
import {ActivitiesComponent} from './activities/activities.component';
import {CreatepostPage} from './createpost/createpost.page';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    StartpageComponent,
    AppRegisterComponent,
    WelcomeComponent,
    LoginComponent,
    ProfileDataComponent,
    VerifyAccountComponent,
    HeaderComponent,
    SettingsComponent,
    TermsConditionsComponent,
    RequestFollowComponent,
    RequestAcceptComponent,
    ConnectionRequestComponent,
    ProfileNotifyComponent,
    DescriptionsComponent,
    MyblogComponent,
    FilterComponent,
    DialogOverviewExampleDialog,
    ActivitiesComponent
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule, 
    MatButtonToggleModule, 
    MatSliderModule, 
    MatRadioModule,
    IonicModule,
    Ionic4DatepickerModule
    ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MatDatepickerModule,
    MatNativeDateModule,
    Camera,
    File,
    FileTransfer,
    FilePath,
    ImagePicker,
    OneSignal,
    SocialSharing,
    EmailComposer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
