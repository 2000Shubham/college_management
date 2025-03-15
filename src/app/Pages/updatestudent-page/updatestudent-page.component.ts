import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatestudent-page',
  templateUrl: './updatestudent-page.component.html',
  styleUrls: ['./updatestudent-page.component.css']
})
export class UpdatestudentPageComponent implements OnInit {
  studentupdateForm!: FormGroup;
  errorMessage: string = '';
  studentId!: number;

  // For ngModel binding
  name: string = '';
  course: string = '';
  email: string = '';
  phone: string = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentupdateForm = this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.studentId = +this.route.snapshot.params['id'];
    this.getStudentListById(this.studentId);
  }

  public getStudentListById(id: number): void {
    this.studentService.getStudentListById(id).subscribe({
      next: (data: any) => {
        const student = data.response_data[0];
        console.log(student);
        if (student) {
          this.studentupdateForm.patchValue(student);
          this.name = student.name;
          this.course = student.course;
          this.email = student.email;
          this.phone = student.phone;
        } else {
          this.errorMessage = 'Student not found.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching student by ID:', error);
        this.errorMessage = 'Failed to load student details.';
      }
    });
  }

  public updateStudent(): void {
    if (this.studentupdateForm.valid) {
      const updatedStudent = this.studentupdateForm.value;
      this.studentService.updateStudent(this.studentId, updatedStudent).subscribe({
        next: () => {
          Swal.fire({
            title: "Updated!",
            text: "Student updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6", 
            timer: 1500, 
          }).then(() => {
            this.router.navigate(['/studentlist']);
          });
          console.log('Student updated successfully');
        },
        error: (error: any) => {
          console.error('Error updating student:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update student.",
            icon: "error",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#d33",
          });
          this.errorMessage = 'Failed to update student.';
        }
      });
    } else {
      console.error('Form is invalid');
      Swal.fire({
        title: "Form Invalid",
        text: "Please fill in all required fields correctly.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#f39c12",
      });
    }
  }
}  
