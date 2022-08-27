import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComedoresComponent } from './comedores.component';

describe('ComedoresComponent', () => {
  let component: ComedoresComponent;
  let fixture: ComponentFixture<ComedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
