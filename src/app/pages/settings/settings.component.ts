import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private authService: AuthService) { }

  // Check if the user is an admin
  get isAdmin(): boolean {
    return false;
  }
}
