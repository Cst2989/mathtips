import { Routes, RouterModule }   from '@angular/router';
import { HomeComponent } from './home/home.component'

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'app',
        loadChildren: './mathbet/mathbet.module#MathBetModule',
    }
];

export const routing = RouterModule.forRoot(appRoutes);
