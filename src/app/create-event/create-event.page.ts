import { Router } from '@angular/router';
import { EventService } from './../services/pledges/pledge-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {}

  createEvent(
    name: string,
    impact: number,
    learning: string,
    pledgeDetails: string,
    pledge: string
  ): void {
    if (
      name === undefined ||
      impact === undefined ||
      learning === undefined ||
      pledgeDetails === undefined ||
      pledge === undefined
    ) {
      return;
    }
    this.eventService.createEvent(name, impact, learning, pledgeDetails, pledge)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }
}