import { Component, OnInit } from '@angular/core';
// import { $ } from '../../../node_modules/protractor';
import { RestApiService } from '../rest-api.service';

import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  addClass=true;
  categorytype: any;
  res: any;
  selected: any;
  toggle_value: any;
  

  clicked(event) {
    this.addClass=!this.addClass
  }
  constructor(private router: Router,public api: RestApiService) { 
    this.GetRideType();
    this.toggle_value = 1;
  }

  ngOnInit() {
    $('.mat-button-toggle').click(function(){
      $(this).parents('.mat-button-toggle-group').find('.mat-button-toggle').removeClass('active');
    })
  } 

  GetRideType(){
    console.log(this.filter_value);
    this.api.getridepost().then((result) => {
      // this.openDialog();
      this.res = result;
      this.categorytype = this.res.data;     
      console.log(this.selected);
  
    }, (err) => {
      console.log(err);    
    });
  }

  filter_value(value){
    console.log(value);
    this.toggle_value = value;
  }
  Search(){
    this.router.navigate(['/activity'], { state: { ride_type: this.selected , filter_value_data: this.toggle_value} });
  }

}
