import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditqueryComponent } from './editquery.component';

describe('EditqueryComponent', () => {
  let component: EditqueryComponent;
  let fixture: ComponentFixture<EditqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
