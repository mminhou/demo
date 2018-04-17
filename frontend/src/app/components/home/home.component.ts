import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../_animation/fade_in_animation';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // make fade in animation available to this component
})
export class HomeComponent {

  constructor() {
  }
  // Information
  backend = [
    {
      name: 'Django',
      description: 'Django is a free and open source web application framework, written in Python.'
    },
    {
      name: 'Django Rest Framework',
      description: 'Django REST framework is a powerful and flexible toolkit for building Web APIs.'
    }
  ]

  frontend = [
    {
      name: 'Angularjs2',
      description: 'AngularJS2 is a structural framework for dynamic web apps. AngularJS is what HTML would have been, had it been designed for applications.'
    },
    {
      name: 'Angular2 Material',
      description: 'AngularJS Material is both a UI Component framework and a reference implementation of Google\u2019s Material Design Specification.'
    }
  ]
}

