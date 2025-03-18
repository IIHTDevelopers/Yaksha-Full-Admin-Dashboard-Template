import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './components/navbar/navbar.component'; // Assuming you have a NavbarComponent

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],  // Import RouterTestingModule to handle routing
            declarations: [AppComponent, NavbarComponent]  // Declare the AppComponent and NavbarComponent
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app component', () => {
            expect(component).toBeTruthy();
        });

        it('should have a navbar component', () => {
            const navbarElement = fixture.nativeElement.querySelector('app-navbar');
            expect(navbarElement).toBeTruthy();
        });

        it('should have a router-outlet', () => {
            const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
            expect(routerOutlet).toBeTruthy();
        });
    });
});
