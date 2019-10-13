
import { EventService } from './../services/pledges/pledge-service.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../services/user/profile.service';



@Component({
  selector: 'app-edpledgelist',
  templateUrl: './edpledgelist.page.html',
  styleUrls: ['./edpledgelist.page.scss'],
})
export class EdpledgelistPage implements OnInit {
  public eventList: Array<any>;
  public eventListRef: firebase.firestore.CollectionReference;
  public userProfile: any = {};
  constructor(private eventService: EventService,
              public profileService: ProfileService ) {}

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
    

    this.eventService.pullEventListKids().then( eventListSnapshot => {
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
        console.log(this.eventList);
        /*this.eventList.forEach(
          this.eventService
          .createEvent(
            name, 
            impact, 
           learning, 
            pledge, 
            pledgeDetails);
      );*/
      });
    });
  }


  /*

copyPledges(
  id: string, 
  name: string, 
  impact: number,
  pledge: string,
  pledgeDetails: string,
  learning: string): void{
  
   this.profileService.getUserProfile().then(userProfileSnapshot => {
    var userAge = this.userProfile.data().birthDate;
    if (userAge == "11-15"){
      this.eventService.pullEventListKids().then( eventListSnapshot => {
        this.eventList = [];
        eventListSnapshot.forEach(snap => {
          this.eventList.push({
            id: snap.id,
            name: snap.data().name,
            impact: snap.data().impact,
            pledge: snap.data().pledge,
            pledgeDetails: snap.data().pledgeDetails,
            learning: snap.data().learning}
          ) 
          this.eventList.forEach(this.eventService
            .createEvent(snap.id,
                         snap.data().name,
                         snap.data().impact,
                         snap.data().pledge,
                         snap.data().pledgeDetails,
                         snap.data().learning))
          }
        
      )}
      )}

  }); 
}*/
}








