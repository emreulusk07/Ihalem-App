import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BidComponent } from './bid/bid.component';
import { BidDetailComponent } from './bid/bid-detail/bid-detail.component';
import { BidAddComponent } from './bid/bid-add/bid-add.component';
import { RegisterComponent } from './register/register.component';
import { PhotoComponent } from './photo/photo.component';
import { OfferComponent } from './offer/offer.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { OfferAddComponent } from './offer/offer-add/offer-add.component';
import { LoginComponent } from './login/login.component';
import { BidSearchPipe } from './bid/bid-search.pipe';
import { DpDatePickerModule } from 'ng2-date-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BidComponent,
    BidDetailComponent,
    BidAddComponent,
    RegisterComponent,
    PhotoComponent,
    OfferComponent,
    OfferDetailComponent,
    OfferAddComponent,
    LoginComponent,
    BidSearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    DpDatePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
