import { EventService } from './../services/pledges/pledge-service.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-edpledgelist',
  templateUrl: './edpledgelist.page.html',
  styleUrls: ['./edpledgelist.page.scss'],
})
export class EdpledgelistPage implements OnInit {
  public eventList: Array<any>;
  public eventListRef: firebase.firestore.DocumentReference;
  constructor(private eventService: EventService) {}

  ngOnInit() {

    this.eventService.getEventList().then(eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.id,
          name: snap.data().name,
          impact: snap.data().impact,
          pledge: snap.data().pledge,
          pledgeDetails: snap.data().pledgeDetails,
          learning: snap.data().learning
        });
        });
      });

    
    this.eventService.pullEventListAdults().then( eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.id,
          name: snap.data().name,
          impact: snap.data().impact,
          pledge: snap.data().pledge,
          pledgeDetails: snap.data().pledgeDetails,
          learning: snap.data().learning
        })
        this.eventList.forEach(snap => {
          this.eventService.createEvent(
            snap.data().name, 
            snap.data().impact, 
            snap.data().learning, 
            snap.data().pledge, 
            snap.data().pledgeDetails);
      });
      });
    });
  }
}


