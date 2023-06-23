import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentPage: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentPage = '';
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage =
          this.activatedRoute?.root.firstChild?.snapshot.data['page']!;
      }
    });
  }
}
