import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  constructor(private authService: AuthService) { }

  // Check if the user is an admin
  get isAdmin(): boolean {
    return false;
  }

  // Simulate getting the list of users
  getUsers() {
  }
}
