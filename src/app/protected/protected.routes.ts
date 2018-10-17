import { Routes } from "@angular/router";
import { ProtectedComponent } from "./components/protected.component";

export const ProtectedRoutes: Routes = [
  {
    path: '',
    component: ProtectedComponent
  }
];
