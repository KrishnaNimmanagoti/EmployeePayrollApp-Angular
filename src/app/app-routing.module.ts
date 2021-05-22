import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee-component/create-employee/create-employee.component';
import { EmployeeListComponent } from './employee-component/employee-list/employee-list.component';

const routes: Routes = [
  {path:"create-employee",component:CreateEmployeeComponent},
  {path:"",component:EmployeeListComponent},
  {path: "create-employee/:id", component: CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
