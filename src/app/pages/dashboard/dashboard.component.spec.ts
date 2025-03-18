import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../auth/auth.service';
import { of } from 'rxjs';

// Mock AuthService
class MockAuthService {
  getToken(): string | null {
    return 'test-token'; // Simulating the presence of a token
  }

  decodeToken(token: string) {
    return { role: 'user' }; // Simulating a non-admin user
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockAuthService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }] // Mock the AuthService
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should display "General User" content for a non-admin user', () => {
      // Mock the AuthService to simulate a general user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'user' });

      fixture.detectChanges(); // Trigger change detection

      const userInfoDiv = fixture.nativeElement.querySelector('.user-info');
      const adminInfoDiv = fixture.nativeElement.querySelector('.admin-info');

      // Check if the general user content is visible
      expect(userInfoDiv).toBeTruthy();
      expect(adminInfoDiv).toBeFalsy(); // Admin content should not be visible
    });

    it('should display "Admin Dashboard" content for an admin user', () => {
      // Mock the AuthService to simulate an admin user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'admin' });

      fixture.detectChanges(); // Trigger change detection

      const userInfoDiv = fixture.nativeElement.querySelector('.user-info');
      const adminInfoDiv = fixture.nativeElement.querySelector('.admin-info');

      // Check if the admin content is visible
      expect(adminInfoDiv).toBeTruthy();
      expect(userInfoDiv).toBeFalsy(); // General user content should not be visible
    });

    it('should contain "Manage Users" and "Settings" links in the admin view', () => {
      // Mock the AuthService to simulate an admin user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'admin' });

      fixture.detectChanges(); // Trigger change detection

      const manageUsersLink = fixture.nativeElement.querySelector('a[routerLink="/user-management"]');
      const settingsLink = fixture.nativeElement.querySelector('a[routerLink="/settings"]');

      // Check if the admin links are present
      expect(manageUsersLink).toBeTruthy();
      expect(settingsLink).toBeTruthy();
    });
  });
});
