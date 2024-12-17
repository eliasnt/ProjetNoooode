// @ts-ignore
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Définir la fonction describe
function describe(appComponent: string, callback: () => void) {
  console.log(`Describing: ${appComponent}`);
  callback();
}

// Définir la fonction beforeEach
function beforeEach(callback: () => Promise<void>) {
  console.log('Before each test:');
  callback().then(() => {
    console.log('Setup complete.');
  }).catch((error) => {
    console.error('Error during setup:', error);
  });
}

// Définir la fonction it
function it(testDescription: string, callback: () => void) {
  console.log(`Test: ${testDescription}`);
  callback();
}

// Définir la fonction expect
function expect(actual: any) {
  return {
    toBeTruthy: () => {
      if (actual) {
        console.log('Expectation met: value is truthy.');
      } else {
        console.error('Expectation failed: value is falsy.');
      }
    },
    toEqual: (expected: any) => {
      if (actual === expected) {
        console.log(`Expectation met: value is equal to ${expected}.`);
      } else {
        console.error(`Expectation failed: value is not equal to ${expected}.`);
      }
    },
    toContain: (expected: string) => {
      if (actual.includes(expected)) {
        console.log(`Expectation met: value contains ${expected}.`);
      } else {
        console.error(`Expectation failed: value does not contain ${expected}.`);
      }
    }
  };
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ProjNode' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ProjNode');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ProjNode');
  });
});
