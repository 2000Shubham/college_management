import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent {

  // dataSource!: MatTableDataSource<Student>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  students: any[] = []; 
  errorMessage: string = ''; 

  constructor(private studentService: StudentService, private router: Router) {}
 
  ngOnInit(): void {
    this.getStudentList();
  }

  public editStudent(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to edit the details for this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Edit",
        //   text: "Your file has been Edit.",
        //   icon: "success"
        // });
        // If the user confirms, navigate to the edit page
        this.router.navigate(['/updatestudent', id]);
      }
    });
  }



  public getStudentList(): void {
    this.studentService.getStudentList().subscribe({
      next: (data: any) => {
        this.students = data.response_data;
        console.log(this.students);
      },
      error: (error: any) => {
        console.error('Error fetching student list:', error);
        this.errorMessage = 'Failed to load student list.';
      }
    });
  }

  

  public deleteStudent(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete the details for this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        this.studentService.deleteStudentById(id).subscribe({
          next: (data: any) => {
            const res = data.response_status;
            if (res === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Student Deleted',
                text: 'The student has been successfully deleted.',
                confirmButtonText: 'OK'
              });
              this.router.navigate(['/studentlist']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.',
                confirmButtonText: 'OK'
              }).then(() => {
                // You can perform other operations here if needed
              });
            }
          },
          error: (err) => {
            console.error('Error deleting student:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while deleting the student.',
              confirmButtonText: 'OK'
            }).then(() => {
              // You can perform other operations here if needed
            });
          }
        });
      }
    });
  }
  
  

  // public getStudentListById(id:number): void {
  //   this.studentService.getStudentListById(id).subscribe({
  //     next: (data: any) => {
  //       this.students = data.response_data;
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching student list:', error);
  //       this.errorMessage = 'Failed to load student list.';
  //     }
  //   });
  // }

  // public getStudentListById(id: number): void {
  //   this.studentService.getStudentListById(id).subscribe({
  //     next: (data: any) => {
  //       const student = data.response_data;
  //       console.log("1");
  //       if (student) {
  //         console.log('Fetched student details:', student);
  //       } else {
  //         this.errorMessage = 'Student not found.';
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching student by ID:', error);
  //       this.errorMessage = 'Failed to load student details.';
  //     }
  //   });
  // }

}


