import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProvinceComponent } from './province.component';
import { ProvinceDetailComponent } from './province-detail.component';
import { ProvincePopupComponent } from './province-dialog.component';
import { ProvinceDeletePopupComponent } from './province-delete-dialog.component';

export const provinceRoute: Routes = [
    {
        path: 'province',
        component: ProvinceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Provinces'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'province/:id',
        component: ProvinceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Provinces'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const provincePopupRoute: Routes = [
    {
        path: 'province-new',
        component: ProvincePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Provinces'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'province/:id/edit',
        component: ProvincePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Provinces'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'province/:id/delete',
        component: ProvinceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Provinces'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];