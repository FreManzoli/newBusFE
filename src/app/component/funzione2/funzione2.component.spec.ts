import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Funzione2Component } from './funzione2.component';

describe('Funzione2Component', () => {
  let component: Funzione2Component;
  let fixture: ComponentFixture<Funzione2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Funzione2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Funzione2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
