import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from "./shared/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('shree-das-app');
  showSidebar: boolean | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    // this.router.events.pipe(
    //   filter((event: any) => event instanceof NavigationEnd)
    // ).subscribe((event: any) => {
    //   const sidebarRoutes = ['/dashboard', '/UserdetailsList', 'register-user'];

    //   this.showSidebar = sidebarRoutes.some(route => event.urlAfterRedirects.includes(route));
    // });
  }
}
