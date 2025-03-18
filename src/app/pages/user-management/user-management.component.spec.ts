import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';
import { AuthService } from '../../auth/auth.service';
import { of } from 'rxjs';

// Mock AuthService
class MockAuthService {
  getToken(): string | null {
    return 'test-token'; // Simulating that the token is present
  }

  decodeToken(token: string) {
    return { role: 'user' }; // Default to a non-admin user
  }
}

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let mockAuthService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserManagementComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }] // Use the mock AuthService
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should display user management content for an admin user', () => {
      // Mock the AuthService to simulate an admin user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'admin' });

      fixture.detectChanges(); // Trigger change detection

      const userManagementContainer = fixture.nativeElement.querySelector('.user-management-container');
      const accessDeniedMessage = fixture.nativeElement.querySelector('div:not(.user-management-container)');

      // Check if the user management content is visible for admin
      expect(userManagementContainer).toBeTruthy();
      expect(accessDeniedMessage).toBeFalsy(); // Access denied message should not be visible
    });

    it('should display access denied message for a non-admin user', () => {
      // Mock the AuthService to simulate a non-admin user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'user' });

      fixture.detectChanges(); // Trigger change detection

      const userManagementContainer = fixture.nativeElement.querySelector('.user-management-container');
      const accessDeniedMessage = fixture.nativeElement.querySelector('div:not(.user-management-container)');

      // Check if the user management content is hidden and access denied message is visible for non-admin
      expect(userManagementContainer).toBeFalsy();
      expect(accessDeniedMessage).toBeTruthy(); // Access denied message should be visible
    });

    it('should display the correct user data when users are available', () => {
      // Mock the AuthService to simulate an admin user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'admin' });

      fixture.detectChanges(); // Trigger change detection

      const userList = fixture.nativeElement.querySelectorAll('ul li');

      // Check if the users are displayed correctly
      expect(userList.length).toBe(3); // There should be 3 users in the list
      expect(userList[0].textContent).toContain('user1 - user');
      expect(userList[1].textContent).toContain('user2 - user');
      expect(userList[2].textContent).toContain('adminUser - admin');
    });
  });
});
