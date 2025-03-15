import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { ContactpageComponent } from './Pages/contactpage/contactpage.component';
import { StudentCreateComponent } from './Pages/student-create/student-create.component';
import { StudentPageComponent } from './Pages/student-page/student-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatestudentPageComponent } from './Pages/updatestudent-page/updatestudent-page.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { AdduserComponent } from './Pages/adduser/adduser.component';
import { UpdateuserComponent } from './Pages/updateuser/updateuser.component';
import { SidebarComponent } from './Pages/Partials/sidebar/sidebar.component';



const routes: Routes = [
  // {
  //   path: 'Dashboard',
  //   component: SidebarComponent,
  //   title: 'Home page'
  // },
  {
    path: 'Dashboard',
    component: HomepageComponent,
    title: 'Home page'
  },
  {
    path: 'adduser',
    component: AdduserComponent,
    title: 'Add User'
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'About page'
  },
  {
    path: 'contact',
    component: ContactpageComponent,
    title: 'Contact page'
  },
  {
    path: 'student/create',
    component: StudentCreateComponent,
    title: 'StudentCreate'
  },
  {
    path: 'studentlist',
    component: StudentPageComponent,
    title: 'StudentList'
  },
  {
    path: 'updatestudent/:id',
    component: UpdatestudentPageComponent,
    title: 'updateStudnet'
  },
  {
    path: 'updateuser/:id',
    component: UpdateuserComponent,
    title: 'updateuser'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'PageNotFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
