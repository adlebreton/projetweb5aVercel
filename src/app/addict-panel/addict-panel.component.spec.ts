import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictPanelComponent } from './addict-panel.component';

describe('AddictPanelComponent', () => {
  let component: AddictPanelComponent;
  let fixture: ComponentFixture<AddictPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddictPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddictPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
