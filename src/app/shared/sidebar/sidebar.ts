import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth-service';
import { LogoutComponent } from '../../core/auth/logout/logout';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,LogoutComponent], // Required for navigation
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit {
  userRole: string | null = '';
  showSidebar: boolean = false;
  activeTab: string = 'userMaster';
  //isUserRegistration: boolean = false;

  constructor(
         private authService: AuthService,
        private router: Router
  ) {

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: any) => {
    //   this.setActiveTabFromUrl(event.urlAfterRedirects);
    // });
  }

  ngOnInit(): void {
    // Get role from our common service
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'Admin') {
      this.activeTab= 'sadasya';
    }
  }

  // private setActiveTabFromUrl(url: string) {
  //   if (url.includes('/user-master')) {
  //     this.activeTab = 'userMaster';
  //   } else if (url.includes('/sadasya-registration')) {
  //     this.activeTab = 'sadasya';
  //   } else if (url.includes('/business-problems')) {
  //     this.activeTab = 'problems';
  //   } else {
  //     // Default जर रोल Admin असेल तर
  //     if (this.userRole === 'Admin') {
  //       this.activeTab = 'sadasya';
  //     }
  //   }
  // }

  userMarster() {
    this.activeTab = 'userMaster';
    this.router.navigate(['/dashboard']);
  }

  businessMaster() {
    this.activeTab = 'businessMaster';
    alert("businessMaster was clicked!");
  }

  sadasyaMahiti() {
    this.activeTab = 'sadasya';
    this.router.navigate(['/UserdetailsList']);
  }

  userRegristration() {
    //this.isUserRegistration = true;
    this.activeTab = 'registration';
    this.router.navigate(['/register-user']);
  }
}
