import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Funzione1Component } from './funzione1.component';

describe('Funzione1Component', () => {
  let component: Funzione1Component;
  let fixture: ComponentFixture<Funzione1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Funzione1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Funzione1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
