import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Check if the user is authenticated
  get isAuthenticated(): boolean {
    return false;
  }

  // Perform logout action
  logout(): void {
  }
}
