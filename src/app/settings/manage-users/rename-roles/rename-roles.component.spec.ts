import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { RenameRolesComponent } from './rename-roles.component';
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}
describe('RenameRolesComponent', () => {
  let component: RenameRolesComponent;
  let fixture: ComponentFixture<RenameRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameRolesComponent ],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({}),
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: {close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call the close method", async() => {
    spyOn(component, "close").and.callThrough();
    component.close();
    expect(component.valuesUpdated).toBeFalse();
    expect(component.close).toHaveBeenCalled();
  });
  it("should call the onSubmit method", async() => {
    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it("should call the editRole method", () => {
    spyOn(component, "editRole").and.callThrough();
    component.editRole(0,true);
    expect(component.editRole).toHaveBeenCalled();
    expect(component.editCurrent).toEqual([true]);
  });
});
