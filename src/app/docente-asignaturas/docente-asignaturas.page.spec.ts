import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteAsignaturasPage } from './docente-asignaturas.page';

describe('DocenteAsignaturasPage', () => {
  let component: DocenteAsignaturasPage;
  let fixture: ComponentFixture<DocenteAsignaturasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteAsignaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
