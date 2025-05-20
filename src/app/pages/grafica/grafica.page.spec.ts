import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaPage } from './grafica.page';

describe('GraficaPage', () => {
  let component: GraficaPage;
  let fixture: ComponentFixture<GraficaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
