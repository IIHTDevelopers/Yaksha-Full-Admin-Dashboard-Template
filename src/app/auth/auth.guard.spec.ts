import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

// Mock AuthService
class MockAuthService {
  isTokenValid() {
    return true;
  }
}

// Mock Router
class MockRouter {
  navigate(path: string[]) { }
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Use RouterTestingModule for routing testing
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService }, // Mock AuthService
        { provide: Router, useClass: MockRouter } // Mock Router
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    mockAuthService = TestBed.inject(AuthService);
    mockRouter = TestBed.inject(Router);
  });

  describe('business', () => {
    it('should be created', () => {
      expect(authGuard).toBeTruthy();
    });

    it('should allow access if the token is valid', () => {
      // Mock the method to return true (valid token)
      jest.spyOn(mockAuthService, 'isTokenValid').mockReturnValue(true);

      const canActivate = authGuard.canActivate({} as any, {} as any);

      // Assert that canActivate returns true
      expect(canActivate).toBe(true);
    });

    it('should deny access and navigate to login if the token is invalid', () => {
      // Mock the method to return false (invalid token)
      jest.spyOn(mockAuthService, 'isTokenValid').mockReturnValue(false);

      // Spy on the router's navigate method
      jest.spyOn(mockRouter, 'navigate');

      const canActivate = authGuard.canActivate({} as any, {} as any);

      // Assert that canActivate returns false
      expect(canActivate).toBe(false);
      // Assert that the router navigates to the login page
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should call isTokenValid once when checking access', () => {
      // Mock the method to return true (valid token)
      jest.spyOn(mockAuthService, 'isTokenValid').mockReturnValue(true);

      authGuard.canActivate({} as any, {} as any);

      // Ensure isTokenValid was called once
      expect(mockAuthService.isTokenValid).toHaveBeenCalledTimes(1);
    });
  });
});
