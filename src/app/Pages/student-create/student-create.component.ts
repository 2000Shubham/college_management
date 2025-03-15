import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/Services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {
  studentForm!: FormGroup;
  isLoading: boolean = false;
  loadingTitle: string = 'Loading...'; 
  errors: string[] = []; 

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  saveStudent(): void {
    if (this.studentForm.valid) {
      this.isLoading = true;
      this.loadingTitle = 'Saving...';

      const inputData = this.studentForm.value;

      this.studentService.saveStudent(inputData).subscribe({
        next: (res: any) => {

          this.studentForm.reset();
          this.isLoading = false;

          this.router.navigate(['/studentlist']);
        },
        error: (err: any) => {
          console.error(err, 'errors');
          this.errors = err.error.errors || ['Something went wrong!'];
          this.isLoading = false;
        }
      });
    }
  }
}
