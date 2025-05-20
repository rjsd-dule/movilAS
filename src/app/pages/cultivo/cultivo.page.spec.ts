import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CultivoPage } from './cultivo.page';

describe('CultivoPage', () => {
  let component: CultivoPage;
  let fixture: ComponentFixture<CultivoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
