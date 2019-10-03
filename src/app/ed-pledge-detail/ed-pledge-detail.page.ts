import { EventService } from './../services/pledges/pledge-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-ed-pledge-detail',
  templateUrl: './ed-pledge-detail.page.html',
  styleUrls: ['./ed-pledge-detail.page.scss'],
})

export class EdPledgeDetailPage implements OnInit {
  public currentEvent: any = {};
  public verification = '';
  public guestPicture: string = null;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const eventId: string = this.route.snapshot.paramMap.get('id');
    this.eventService.getEventDetail(eventId).then(eventSnapshot => {
      this.currentEvent = eventSnapshot.data();
      this.currentEvent.id = eventSnapshot.id;
    });
  }
 
  verifyPledgeText(verification: string): void {
    this.eventService
      .verifyPledge(
        verification,
        this.currentEvent.id,
        this.currentEvent.price,
        this.guestPicture
      )
      .then(() => {
        this.verification = '';
        this.guestPicture = null;
      });
  }

  async takePicture(): Promise<void> {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
      this.guestPicture = profilePicture.base64String;
    } catch (error) {
      console.error(error);
    }
  }
}