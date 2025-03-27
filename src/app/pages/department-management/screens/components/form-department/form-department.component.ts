import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IDepartmentForm,
  formMode,
} from '@vks/app/pages/department-management/models';
import {
  DepartmentCode,
  IDropdownItem,
  RoleAccount,
} from '@vks/app/shared/models';
@Component({
  selector: 'vks-form-department',
  templateUrl: './form-department.component.html',
  styleUrl: './form-department.component.scss',
})
export class FormDepartmentComponent implements OnChanges {
  listDepartments: IDropdownItem[] = Object.values(DepartmentCode).map(
    (code) => ({
      label: code,
      value: code,
    })
  );

  listRoles: IDropdownItem[] = Object.values(RoleAccount).map((role) => ({
    label: role,
    value: role,
  }));

  @Input()
  mode: formMode = formMode.CREATE;

  @Input()
  errors: Record<keyof IDepartmentForm, string[]> = {
    id: [],
    departmentId: [],
    fullName: [],
    roleId: [],
    organizationName: [],
  };

  @Input()
  departmentDetail: Partial<IDepartmentForm> = {
    departmentId: '',
    fullName: '',
    roleId: '',
    organizationName: '',
  };

  @Output()
  unActiveForm = new EventEmitter();

  @Output() forward = new EventEmitter<IDepartmentForm>();

  submitted = false;

  departmentForm: FormGroup = this.formBuilder.group({
    departmentId: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
    organizationName: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  // ngOnInit(): void {
  //   if (this.mode === formMode.EDIT) {
  //     this.departmentForm.patchValue(this.departmentDetail);
  //   }
  //   console.log('departmentDetail', this.departmentDetail);
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['departmentDetail'] && this.mode === formMode.EDIT) {
      this.departmentForm.patchValue(changes['departmentDetail'].currentValue);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.departmentForm.valid) {
      this.submitted = false;
      this.forward.emit(this.departmentForm.value);
    } else {
      this.submitted = true;
      this.departmentForm.markAllAsTouched();
    }
  }

  onCloseModal() {
    this.unActiveForm.emit();
    this.resetForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.departmentForm.get(fieldName);
    return (field?.errors?.required &&
      field.touched &&
      this.submitted) as boolean;
  }

  resetForm() {
    this.submitted = false;
    this.departmentForm.reset();

    Object.keys(this.departmentForm.controls).forEach((key) => {
      const control = this.departmentForm.get(key) as FormControl;
      control.markAsPristine();
      control.markAsUntouched();
      control.updateValueAndValidity();
    });
  }
}
