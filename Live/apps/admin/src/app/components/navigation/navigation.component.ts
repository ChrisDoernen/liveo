import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../src/environments/environment";

@Component({
  selector: "navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  public version: string = environment.version;
  public revision: string = environment.revision;
  
  constructor(public router: Router) {
  }

  ngOnInit() {
  }

}
