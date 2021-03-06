import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../rest-api.service";
import { DataService } from "../data.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  url = environment.base_url;
  products: any;

  constructor(private rest: RestApiService, private data: DataService) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get(this.url + "/products");
      data["success"]
        ? (this.products = data["products"])
        : this.data.error("Could not fetch products");
    } catch (error) {
      this.data.error(error["message"]);
    }
  }
}
