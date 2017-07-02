import { RouterModule, Routes } from "@angular/router";

import { WatchsComponent } from "./watchs/watchs.component";
import { AuthenticationComponent } from "./auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/watchs', pathMatch: 'full' },
    { path: 'watchs', component: WatchsComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);