import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderComponentModal } from './place-order-modal.component';

describe('PlaceOrderComponentModal', () => {
  let component: PlaceOrderComponentModal;
  let fixture: ComponentFixture<PlaceOrderComponentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceOrderComponentModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
