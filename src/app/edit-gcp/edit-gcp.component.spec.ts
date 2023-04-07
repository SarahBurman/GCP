import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGCPComponent } from './edit-gcp.component';

describe('EditGCPComponent', () => {
  let component: EditGCPComponent;
  let fixture: ComponentFixture<EditGCPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGCPComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditGCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
