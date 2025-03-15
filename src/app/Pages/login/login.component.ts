import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  view: boolean = false;
  loading: boolean = false;

  constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
  
      ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }

  Login() {
    if (this.loginForm.valid) {
      this.view = true;
      this.loading = true;

      const loginData = this.loginForm.value; 

      this.authService.login(loginData).subscribe({
        next: (response: any) => {
          console.log(response)
          if (response.response_data) {
            localStorage.setItem('authToken', response.response_data); 
            Swal.fire('Success', 'Login successful!', 'success');
            this.router.navigate(['/dashboard']); 
          } else {
            Swal.fire('Error', 'Invalid credentials!', 'error');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          Swal.fire('Error', 'Login failed. Try again!', 'error');
        },
        complete: () => {
          this.loading = false;
        }
      });

    } else {
      this.view = false;
      this.loginForm.markAllAsTouched(); 
     // Swal.fire('Error', 'Please enter valid credentials!', 'error');
    }
  }
//   Login() {
//     if (this.loginForm.valid) {
//       this.view = true;
//       this.loading = true;
//   }
// }

}
