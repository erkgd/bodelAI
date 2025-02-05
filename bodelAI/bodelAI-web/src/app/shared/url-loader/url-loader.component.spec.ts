import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlLoaderComponent } from './url-loader.component';

describe('UrlLoaderComponent', () => {
  let component: UrlLoaderComponent;
  let fixture: ComponentFixture<UrlLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
