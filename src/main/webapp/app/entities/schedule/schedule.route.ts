import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ScheduleComponent } from './schedule.component';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { SchedulePopupComponent } from './schedule-dialog.component';
import { ScheduleDeletePopupComponent } from './schedule-delete-dialog.component';

export const scheduleRoute: Routes = [
    {
        path: 'schedule',
        component: ScheduleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'schedule/:id',
        component: ScheduleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schedulePopupRoute: Routes = [
    {
        path: 'schedule-new',
        component: SchedulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'schedule/:id/edit',
        component: SchedulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'schedule/:id/delete',
        component: ScheduleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
