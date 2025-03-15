import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  updateuser!: FormGroup;
  user_role: any[] = [];
  errorMessage: string = '';
  userId!: number;
  name: any;
  password: any;
  email: any;
  role_name: any;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.updateuser = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role_name: ['', Validators.required]
    });
    this.getUserRole_List();
    this.userId = +this.route.snapshot.params['id'];
   // this.getUserListId(this.userId);
    setTimeout(() => this.getUserListId(this.userId), 500);
    
  }

  public getUserListId(id: number): void {
    // alert(id);
    this.UserService.getUserListById(id).subscribe({
      next: (data: any) => {
        const User = data.response_data[0];
        console.log(User);
        if (User) {
          this.updateuser.patchValue({
            name: User.name,
            password: User.password,
            email: User.email,
            phone: User.phone,
            role_name: Number(User.role_id)  
          });
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

  public getUserRole_List(): void {
    this.UserService.getUser_role().subscribe({
      next: (data: any) => {
        this.user_role = data.response_data;
        console.log(this.user_role);
      },
      error: (error: any) => {
        console.error('Error fetching student list:', error);
        this.errorMessage = 'Failed to load student list.';
      }
    });
  }

 public updateUser(): void {
    if (this.updateuser.valid) {
      const updatedUser = this.updateuser.value;
      this.UserService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          Swal.fire({
            title: "Updated!",
            text: "User updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6", 
            timer: 1500, 
          }).then(() => {
            this.router.navigate(['/about']);
          });
          console.log('User updated successfully');
        },
        error: (error: any) => {
          console.error('Error updating User:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update User.",
            icon: "error",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#d33",
          });
          this.errorMessage = 'Failed to User student.';
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
