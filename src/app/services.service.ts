import { Injectable,OnInit } from '@angular/core';
declare const $:any;
@Injectable({
  providedIn: 'root'
})
export class ServicesService implements OnInit {
  images=[
    {name:'Astrid'},
    {name:'Filippa'},
    {name:'Felix'},
    {name:'Marcus'},
    {name:'Astrid'},
    {name:'Filippa'},
    {name:'Felix'},
    {name:'Marcus'},
    {name:'Astrid'},
    {name:'Filippa'},
    {name:'Felix'},
    {name:'Marcus'}
  ]
  getowl():void{
    // $(document).ready(function(){
    //   $('.owl-carousel').owlCarousel({
    //     loop:false,
    //     margin:0,
    //     nav:false,
    //     responsive:{
    //         0:{
    //             items:3
    //         },
    //         361:{
    //             items:3.5
    //         },
    //         376:{
    //           items:4.5
    //         },
    //         568:{
    //           items:5
    //         }
    //     }
    //   });
    // });
  }
  constructor() { }
  ngOnInit(){
    
  }
}
