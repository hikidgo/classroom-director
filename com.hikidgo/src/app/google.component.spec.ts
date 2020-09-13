import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleComponent } from './google.component';

describe('GoogleComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GoogleComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GoogleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'portal'`, () => {
    const fixture = TestBed.createComponent(GoogleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('portal');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(GoogleComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to portal!');
  });
});
