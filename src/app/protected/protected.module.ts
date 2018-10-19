import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtectedService } from './protected.service';
import { ProtectedComponent } from "./components/protected.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ProtectedComponent],
  providers: [ProtectedService]
})
export class ProtectedModule {
}
