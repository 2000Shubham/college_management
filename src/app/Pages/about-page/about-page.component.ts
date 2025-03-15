import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {
  users: any;
  errorMessage!: string;

 

   constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
  }
  public getUserList(): void {
    this.UserService.getUserList().subscribe({
      next: (data: any) => {
        this.users = data.response_data;
        console.log(this.users);
      },
      error: (error: any) => {
        console.error('Error fetching student list:', error);
        this.errorMessage = 'Failed to load student list.';
      }
    });
  }

 public editUser(id: number): void {
  // alert(id);
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
        this.router.navigate(['/updateuser', id]);
      }
    });
  }


 public deleteUserById(id: number): void {
  // alert(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete the details for this User?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        this.UserService.deleteUser(id).subscribe({
          next: (data: any) => {
            const res = data.response_status;
            if (res === 200) {
              Swal.fire({
                icon: 'success',
                title: 'User Deleted',
                text: 'The User has been successfully deleted.',
                confirmButtonText: 'OK'
              });
              this.router.navigate(['/about']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.',
                confirmButtonText: 'OK'
              }).then(() => {
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
            });
          }
        });
      }
    });
  }
}
