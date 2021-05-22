import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/userservice';
import { Router } from '@angular/router';

const REGEX_NAME = new RegExp("^[A-Z][a-z]{2,}$");

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  @ViewChildren('checkBox')
  checkBox!: QueryList<any>;
  id: any;
  userDetail!: FormGroup;
  checked: string[] = [];
  checkedDepartments: string[] = [];

  constructor(public dialogRef: MatDialogRef<UpdateEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.userDetail = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2),
      Validators.pattern('^[A-Z][a-zA-Z\\s]{2,}$')])],
      salary: ['', Validators.required],
      departments: [null, Validators.required],
      gender: ['', Validators.required],
      day: ['', Validators.required],
      year: ['', Validators.required],
      month: ['', Validators.required],
      notes: [''],
      profile: ['', Validators.required]
    });
    this.id=data.employee.id;
    this.userDetail.controls['name'].setValue(data.employee.name);
    this.userDetail.controls['salary'].setValue(data.employee.salary);
    this.userDetail.controls['gender'].setValue(data.employee.gender);
    this.userDetail.controls['profile'].setValue(data.employee.profileImage);
    this.userDetail.controls['notes'].setValue(data.employee.notes);
    var str = data.employee.startDate;
    var splited: string[] = str.split('-');
    this.userDetail.controls["day"].setValue(splited[2]);
    this.userDetail.controls["month"].setValue(this.months[parseInt(splited[1])]);
    this.userDetail.controls["year"].setValue(splited[0]);
    this.checkedDepartments = data.employee.departments;
    this.checked = this.checkedDepartments;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.getCheckbox(this.checkBox);
    var employeeDto = {
      'id': Number.parseInt(this.id),
      'name': this.userDetail.controls['name'].value,
      'salary': this.userDetail.controls['salary'].value.toString(),
      'departments': this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value + " " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'notes': this.userDetail.controls['notes'].value,
      'profileImage': this.userDetail.controls['profile'].value
    };
    console.log("employee dto in Update()", employeeDto)

    if (this.isFormValid()) {
      console.log(employeeDto.startDate + "this is start date");
      this.employeeService.updateEmployee(employeeDto, this.id).subscribe((response: any) => {
        console.log("response is " + response);
      });
      this.router.navigate([""]);
      this.dialogRef.close();
    }
  }

  isFormValid(): boolean {
    if (this.userDetail.controls['name'].valid &&
      this.userDetail.controls['salary'].valid &&
      this.checked.length > 0 &&
      this.userDetail.controls['gender'].valid &&
      this.userDetail.controls['day'].valid &&
      this.userDetail.controls['year'].valid &&
      this.userDetail.controls['month'].valid &&
      this.userDetail.controls['notes'].valid &&
      this.userDetail.controls['profile'].valid)
      return true;
    this.userDetail.markAllAsTouched();
    return false;
  }

  validatePrevious(num: Number) {
    for (var i = 0; i <= num; i++) {
      console.log(this.fields[i]);
      this.userDetail.controls[this.fields[i]].markAsTouched();
      console.log()
    }
  }

  toggleCheckBox(dept: any) {
    return (this.checkedDepartments.includes(dept)) ? true : false;
  }

  reset() {
    this.resetCheckbox(this.checkBox);
    this.userDetail.reset();
  }

  getCheckbox(checkbox: any) {
    this.checked = [];
    this.checkBox.filter(checkbox => checkbox.checked == true).forEach(data => this.checked.push(data.value));
  }

  resetCheckbox(checkbox: any) {
    this.checked = [];
    this.checkedDepartments = []; console.log("checkedDepartments in reset ", this.checkedDepartments);
    this.checkBox.filter(checkbox => checkbox.checked == true).forEach(checkbox => checkbox.checked = false);
  }

  fields: string[] = ['name', 'profile', 'gender', 'departments', 'salary', 'day', 'month', 'year', 'notes'];

  days: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28',
    '29', '30', '31'
  ];
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
  ];
  years: string[] = [
    '2010', '2011', '2012', '2013', '2014', '2016', '2017', '2018', '2019', '2020',
    '2021'
  ];
  departments: string[] = [
    'HR', 'Sales', 'Finance', 'Engineer', 'Others'
  ]

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}
