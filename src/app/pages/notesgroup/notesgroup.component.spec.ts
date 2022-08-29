import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesgroupComponent } from './notesgroup.component';

describe('NotesgroupComponent', () => {
  let component: NotesgroupComponent;
  let fixture: ComponentFixture<NotesgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
