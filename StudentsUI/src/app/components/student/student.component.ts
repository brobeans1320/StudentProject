import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  title = 'Students.UI';
  student?: Student;
  students: Student[] = [];
  isCreateStudent: boolean = false;
  isEditStudent: boolean = false;
  studentToEdit?: Student;
  selectedStudent: Student = {} as Student;
  newStudent: Student = {} as Student;

  constructor(private studentService: StudentService, public dialog: MatDialog) {}

  displayedColumns: string[] = ['firstName', 'lastName', 'major', 'actions'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getStudents();
  }

  async getStudents() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.dataSource.data = data.sort((a, b) =>
        a.major.localeCompare(b.major)
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  createStudent(student: Student) {
    this.studentService.createStudent(student).subscribe({
      next: () => {
        this.getStudents();
        this.isCreateStudent = false;
        this.newStudent = {} as Student;
      },
    });
  }

  updateStudent() {
    if (this.selectedStudent) {
      this.studentService.updateStudent(this.selectedStudent).subscribe({
        next: () => {
          this.getStudents();
          this.isEditStudent = false;
          this.selectedStudent = {} as Student;
        },
      });
    }
  }

  deleteStudent(student: Student) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(student).subscribe({
          next: () => this.getStudents(),
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showCreateForm() {
    this.isCreateStudent = true;
    this.newStudent = {} as Student;
  }

  submitCreateStudentForm() {
    this.createStudent(this.newStudent);
  }

  cancelCreate() {
    this.isCreateStudent = false;
    this.newStudent = {} as Student;
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
  }

  editStudent(student: Student) {
    this.selectedStudent = { ...student };
    this.isEditStudent = true;
  }

  cancelEdit() {
    this.isEditStudent = false;
    this.selectedStudent = {} as Student;
  }
}
