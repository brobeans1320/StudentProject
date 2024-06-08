import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { StudentGraphsComponent } from './components/student-graphs/student-graphs.component';

const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'graphs', component: StudentGraphsComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
