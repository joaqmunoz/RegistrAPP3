import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuDocPage } from './recu-doc.page';

describe('RecuDocPage', () => {
  let component: RecuDocPage;
  let fixture: ComponentFixture<RecuDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
