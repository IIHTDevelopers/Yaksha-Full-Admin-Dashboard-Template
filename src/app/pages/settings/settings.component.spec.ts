import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { AuthService } from '../../auth/auth.service';
import { of } from 'rxjs';

// Mock AuthService
class MockAuthService {
  getToken(): string | null {
    return 'test-token'; // Simulating that the token is present
  }

  decodeToken(token: string) {
    return { role: 'user' }; // Simulating a non-admin user initially
  }
}

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let mockAuthService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }] // Use the mock AuthService
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should display access denied message for a non-admin user', () => {
      // Mock the AuthService to simulate a non-admin user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'user' });

      fixture.detectChanges(); // Trigger change detection

      const settingsContainer = fixture.nativeElement.querySelector('.settings-container');
      const accessDeniedMessage = fixture.nativeElement.querySelector('div:not(.settings-container)');

      // Check if the settings content is hidden and access denied message is visible for non-admin
      expect(settingsContainer).toBeFalsy();
      expect(accessDeniedMessage).toBeTruthy(); // Access denied message should be visible
    });

    it('should contain the correct content in the settings section for admin', () => {
      // Mock the AuthService to simulate an admin user
      jest.spyOn(mockAuthService, 'decodeToken').mockReturnValue({ role: 'admin' });

      fixture.detectChanges(); // Trigger change detection

      const settingsSection = fixture.nativeElement.querySelector('.settings-section');
      const h3 = settingsSection.querySelector('h3');
      const p = settingsSection.querySelector('p');

      // Check if the settings section contains the correct content
      expect(settingsSection).toBeTruthy();
      expect(h3.textContent).toContain('Application Settings');
      expect(p.textContent).toContain('Change the application settings here.');
    });
  });
});
