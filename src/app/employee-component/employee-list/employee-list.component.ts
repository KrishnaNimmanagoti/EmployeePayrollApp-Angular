import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userservice'
import { MatDialog} from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['profileImage', 'name', 'gender', 'department', 'salary', 'startDate', 'notes', 'id'];
  employees: any = [];

  constructor(private employeeService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employeeService.getEmployeeList().subscribe((response: any) => {
      console.log("Response is ====> ", response)
      this.employees = response;
      console.log(this.employees)
    })
  }

  deleteEmployee(id: any) {
    console.log(id);
    this.employeeService.deleteEmployee(id)
      .subscribe((response: any) => {
        console.log("Response is ====> ", response)
        this.reloadData();
      })
  }

  updateEmployee(employee: any) {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: {
        employee
      }
    });
  }

  getEmpbyid(id: any) {
    for (let employee of this.employees) {
      if (employee.id == id) {
        console.log(employee)
        return employee;
      }
    }
  }
}