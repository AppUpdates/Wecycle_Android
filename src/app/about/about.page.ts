import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @HostListener("windowcroll", ["$event"]) onWindowScroll($event) {
    const div = document.getElementById("shadow");
    if (window.pageYOffset > 10) {
      div.classList.add("bottom_shadow");
    } else {
      div.classList.remove("bottom_shadow");
    }
  }
}
