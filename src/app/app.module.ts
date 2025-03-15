import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { ContactpageComponent } from './Pages/contactpage/contactpage.component';
import { NavbarComponent } from './Pages/Partials/navbar/navbar.component';
import { StudentCreateComponent } from './Pages/student-create/student-create.component';
import { LoaderComponent } from './Pages/Partials/loader/loader.component';
import { StudentPageComponent } from './Pages/student-page/student-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UpdatestudentPageComponent } from './Pages/updatestudent-page/updatestudent-page.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { SidebarComponent } from './Pages/Partials/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './Pages/login/login.component';
import { AdduserComponent } from './Pages/adduser/adduser.component';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UpdateuserComponent } from './Pages/updateuser/updateuser.component'
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutPageComponent,
    ContactpageComponent,
    NavbarComponent,
    StudentCreateComponent,
    LoaderComponent,
    StudentPageComponent,
    UpdatestudentPageComponent,
    PageNotFoundComponent,
    SidebarComponent,
    LoginComponent,
    AdduserComponent,
    UpdateuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
