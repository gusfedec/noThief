import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { GetUserFromEmail } from '../get-user-from-email.pipe';
import { LogoutComponent } from '../logout/logout.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PrincipalPageRoutingModule],
  declarations: [PrincipalPage, GetUserFromEmail, LogoutComponent],
})
export class PrincipalPageModule {}
