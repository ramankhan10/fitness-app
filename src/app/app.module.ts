import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DateAdapter,MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import {MaterialPersianDateAdapter,PERSIAN_DATE_FORMATS} from './persian-dateadapter';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.components';
import { AuthService } from './auth/auth.service';
import {TrainingService} from './training/training.service';
import { PersianDatePipe } from './persian-date.pipe';
import { TranslationPipe } from './translation.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {PersianPaginatorIntl}from './pagination.translate';
import { AngularFireModule } from '@angular/fire/compat';
import { evnironment } from "../environments/environment";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
    PersianDatePipe,
    TranslationPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(evnironment.firebase)
  ],
  providers: [{provide:MatPaginatorIntl,useClass:PersianPaginatorIntl},{
    provide:DateAdapter,useClass:MaterialPersianDateAdapter,deps:[MAT_DATE_LOCALE]
  },{
    provide:MAT_DATE_FORMATS,useValue:PERSIAN_DATE_FORMATS
  },AuthService,TrainingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
