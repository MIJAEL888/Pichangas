import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CampusComponent } from './campus.component';
import { CampusDetailComponent } from './campus-detail.component';
import { CampusPopupComponent } from './campus-dialog.component';
import { CampusDeletePopupComponent } from './campus-delete-dialog.component';

export const campusRoute: Routes = [
    {
        path: 'campus',
        component: CampusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campus/:id',
        component: CampusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campusPopupRoute: Routes = [
    {
        path: 'campus-new',
        component: CampusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campus/:id/edit',
        component: CampusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campus/:id/delete',
        component: CampusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
