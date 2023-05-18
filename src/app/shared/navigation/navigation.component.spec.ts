import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { NavigationComponent } from './navigation.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        BackendApiService,
        KeycloakService,
        AuthenticationService,       
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
