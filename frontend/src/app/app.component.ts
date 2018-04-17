import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isScrolled = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 106;


  constructor(private authService: AuthService, private _router: Router ) {}

  refresh(): void {
    window.location.reload();
  }




  isLoading: boolean = false;
  ngOnInit() {
    // TODO: assign proper type to event
    this._router.events.subscribe((event: any): void => {
      this.navigationInterceptor(event);
    });

    // scroll to top after router navigation
    this._router.events.subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }

  updateHeader(evt) {
    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    if(this.currPos >= this.changePos ) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  navigationInterceptor(event): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => this.isLoading = false, 100);
    }
    if (event instanceof NavigationCancel) {
      this.isLoading = false;
    }
    if (event instanceof NavigationError) {
      this.isLoading = false;
    }
  }

  onNorthAmerica() {
    this._router.navigate(['/favorite', 'north_america']);
  }
  onSouthAmerica() {
    this._router.navigate(['/favorite', 'south_america']);
  }
  onAsia() {
    this._router.navigate(['/favorite', 'asia'])
  }
  onEurope() {
    this._router.navigate(['/favorite', 'europe'])
  }
  onMiddleEast() {
    this._router.navigate(['/favorite', 'middle_east'])
  }
}
