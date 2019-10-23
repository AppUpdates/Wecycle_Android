import { Component, OnInit, HostListener } from "@angular/core";
@Component({
  selector: "app-terms-conditions",
  templateUrl: "./terms-conditions.component.html",
  styleUrls: ["./terms-conditions.component.css"]
})
export class TermsConditionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @HostListener("windowcroll", ["$event"]) onWindowScroll($event) {
    const div = document.getElementById("shadow");
    if (window.pageYOffset > 10) {
      div.classList.add("bottom_shadow");
    } else {
      div.classList.remove("bottom_shadow");
    }
  }
}
