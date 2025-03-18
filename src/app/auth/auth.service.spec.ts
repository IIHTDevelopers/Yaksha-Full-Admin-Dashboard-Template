import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  // Mocking localStorage
  beforeEach(() => {
    // Create a mock for localStorage methods
    const store: { [key: string]: string } = {};

    // Mock implementation for localStorage methods
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string) => {
      store[key] = value;
    });

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => store[key] || null);

    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation((key: string) => {
      delete store[key];
    });

    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
  });

  describe('boundary', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should save the token to localStorage and update authentication status', () => {
      const token = 'test-token';
      service.saveToken(token);

      expect(localStorage.setItem).toHaveBeenCalledWith('jwtToken', token);
      expect(service.isAuthenticated).toBeTruthy();
    });

    it('should get the token from localStorage', () => {
      const token = 'test-token';
      localStorage.setItem('jwtToken', token);

      expect(service.getToken()).toBe(token);
    });

    it('should return true if the token is valid', () => {
      const validToken = `${btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))}.${btoa(JSON.stringify({ username: 'testUser', role: 'user', exp: Math.floor(Date.now() / 1000) + 3600 }))}`;
      localStorage.setItem('jwtToken', validToken);

      expect(service.isTokenValid()).toBeTruthy();
    });

    it('should return false if the token is expired', () => {
      const expiredToken = `${btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))}.${btoa(JSON.stringify({ username: 'testUser', role: 'user', exp: Math.floor(Date.now() / 1000) - 3600 }))}`;
      localStorage.setItem('jwtToken', expiredToken);

      expect(service.isTokenValid()).toBeFalsy();
    });

    it('should decode the token and return the payload', () => {
      const token = `${btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))}.${btoa(JSON.stringify({ username: 'testUser', role: 'user', exp: Math.floor(Date.now() / 1000) + 3600 }))}`;
      localStorage.setItem('jwtToken', token);

      const decodedToken = service.decodeToken(token);
      expect(decodedToken.username).toBe('testUser');
      expect(decodedToken.role).toBe('user');
    });

    it('should return a token on valid login', () => {
      const username = 'testUser';
      const password = 'password123';

      jest.spyOn(service, 'login').mockReturnValue(of({ token: 'test-token' }));

      service.login(username, password).subscribe(response => {
        expect(response.token).toBeDefined();
      });
    });

    it('should return an error message on invalid login', () => {
      const username = 'invalidUser';
      const password = 'wrongPassword';

      jest.spyOn(service, 'login').mockReturnValue(of({ error: 'Invalid username or password' }));

      service.login(username, password).subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.message).toBe('Invalid username or password');
        }
      });
    });
  });
});
