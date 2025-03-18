import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { of, throwError } from 'rxjs';

// Mock AuthService
class MockAuthService {
  login(username: string, password: string) {
    if (username === 'testUser' && password === 'password123') {
      return of({ token: 'test-token' });
    } else {
      return throwError({ message: 'Invalid credentials' });
    }
  }

  saveToken(token: string) {
    // Mock save token functionality
  }
}

// Mock Router
class MockRouter {
  navigate(path: string[]) { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Import FormsModule to handle ngModel
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService }, // Mock AuthService
        { provide: Router, useClass: MockRouter } // Mock Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should have a username input field', () => {
      const usernameInput = fixture.nativeElement.querySelector('#username');
      expect(usernameInput).toBeTruthy();
    });

    it('should have a password input field', () => {
      const passwordInput = fixture.nativeElement.querySelector('#password');
      expect(passwordInput).toBeTruthy();
    });

    it('should have a submit button', () => {
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });
  });
});
