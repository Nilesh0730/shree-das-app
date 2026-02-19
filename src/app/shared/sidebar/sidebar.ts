import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth-service';
import { LogoutComponent } from '../../core/auth/logout/logout';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get role from our common service
    this.userRole = this.authService.getUserRole();
  }
}
