import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  userform!: FormGroup;
  user_role: any[] = []; 
  errorMessage: string = ''; 
  
    constructor(
      private fb: FormBuilder,
      private UserService: UserService, 
      private router: Router,

    ) {}
   
    ngOnInit(): void {
      this.userform = this.fb.group({
        name: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]], 
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
        role: ['', Validators.required] 
      });
      this.getUserRole_List();
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

  public saveUser(): void {
   
    // if (this.userform.invalid) {
    //   this.userform.markAllAsTouched();
    //   return;
    // }

    const userData = this.userform.value;
    this.UserService.addUserList(userData).subscribe({
      next: (response: any) => {
        console.log(response.status);
        console.log('User added successfully:', response);
        this.router.navigate(['/about']);
      },
      error: (error: any) => {
        console.error('Error adding user:', error);
        this.errorMessage = 'Failed to add user.';
      }
    });
  }


}
