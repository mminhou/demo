import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../_animation/fade_in_animation';


@Component({
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
  animations: [fadeInAnimation],
})
export class StudyComponent {
      @HostBinding('@routeAnimation') fadeInAnimation = true;

}

