import { Component, OnInit } from '@angular/core';
import { BusinessesService } from './../services/businesses.service';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.page.html',
  styleUrls: ['./businesses.page.scss'],
})
export class BusinessesPage implements OnInit {
  public businessName: string;
  public suggestionId: string;

  constructor(private businesses: BusinessesService) { }

  ngOnInit() {}

  getBusinesses(){
    this.businesses.addBusiness(this.businessName,
      this.suggestionId );
  }

}
