import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DistrictComponent } from './district.component';
import { DistrictDetailComponent } from './district-detail.component';
import { DistrictPopupComponent } from './district-dialog.component';
import { DistrictDeletePopupComponent } from './district-delete-dialog.component';

export const districtRoute: Routes = [
    {
        path: 'district',
        component: DistrictComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'district/:id',
        component: DistrictDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const districtPopupRoute: Routes = [
    {
        path: 'district-new',
        component: DistrictPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'district/:id/edit',
        component: DistrictPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'district/:id/delete',
        component: DistrictDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
