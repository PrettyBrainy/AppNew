
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
  public eventListCopy: Array<any>;
  public pledgeList: Array<any>;
  public eventListRef: firebase.firestore.CollectionReference;
  public userProfile: any = {};
  public hideButton: boolean=false;
  public hideText: boolean=false;
  public hidePledges: boolean=true;
  public oneList: Array<any>;
  public doesExistRef: boolean = false;
  public doesExistArray: Array<any>;
  constructor(private eventService: EventService,
              public profileService: ProfileService) {}

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
  }
    
  getUserAge(){
    this.profileService.getUserProfile().then((userProfileSnapshot) => {
      if (userProfileSnapshot.data()) {
        var userAge = String(userProfileSnapshot.data().birthDate);
        return userAge;
      }
    });
  }


startEdModule(){
  this.hideButton=true;
  this.hideText=true;
  this.hidePledges=false;

  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      var userAge = String(userProfileSnapshot.data().birthDate);}
        console.log(userAge);
        this.eventListCopy = [];
          
        if (userAge == "16-18"){
          this.eventService.pullEventListKids().then( eventListSnapshot => {
            this.oneList = [];
            eventListSnapshot.forEach(snap => {
              this.oneList.push({
                id: snap.id,
                name: snap.data().name,
                impact: snap.data().impact,
                pledge: snap.data().pledge,
                pledgeDetails: snap.data().pledgeDetails,
                learning: snap.data().learning 
              })
        
              console.log(this.oneList);
              this.pledgeList = Object["values"](this.oneList[0]);
              for( let n = 0; n<5; n+=6){
                this.eventService.createEvent(
                  this.pledgeList[n+1], 
                  this.pledgeList[n+2], 
                  this.pledgeList[n+3], 
                  this.pledgeList[n+4], 
                  this.pledgeList[n+5],);
              }
              console.log(this.pledgeList);
              })
            })
          }
    })
}


doesExist(){
this.doesExistArray = [];
this.doesExistArray.push(this.eventService.getEventList())
console.log(this.doesExistArray.length);
if (this.doesExistArray.length > 0){
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

} else {
this.startEdModule();
}
}
}







