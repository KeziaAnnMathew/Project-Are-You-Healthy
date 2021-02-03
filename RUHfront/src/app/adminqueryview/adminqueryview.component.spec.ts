import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminqueryviewComponent } from './adminqueryview.component';

describe('AdminqueryviewComponent', () => {
  let component: AdminqueryviewComponent;
  let fixture: ComponentFixture<AdminqueryviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminqueryviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminqueryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
