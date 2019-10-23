import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
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
import { IonicModule } from '@ionic/angular';

import { CreatepostPage } from './createpost.page';

const routes: Routes = [
  {
    path: '',
    component: CreatepostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatepostPage]
})
export class CreatepostPageModule {}
