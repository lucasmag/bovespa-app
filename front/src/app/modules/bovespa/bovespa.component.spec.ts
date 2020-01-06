import { TestBed, async } from '@angular/core/testing';
import { BovespaComponent } from './bovespa.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BovespaComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BovespaComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bovespa-app-front'`, () => {
    const fixture = TestBed.createComponent(BovespaComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('bovespa-app-front');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(BovespaComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('bovespa-app-front app is running!');
  });
});
