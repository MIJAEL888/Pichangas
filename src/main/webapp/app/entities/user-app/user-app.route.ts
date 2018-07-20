import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserAppComponent } from './user-app.component';
import { UserAppDetailComponent } from './user-app-detail.component';
import { UserAppPopupComponent } from './user-app-dialog.component';
import { UserAppDeletePopupComponent } from './user-app-delete-dialog.component';

@Injectable()
export class UserAppResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const userAppRoute: Routes = [
    {
        path: 'user-app',
        component: UserAppComponent,
        resolve: {
            'pagingParams': UserAppResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-app/:id',
        component: UserAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAppPopupRoute: Routes = [
    {
        path: 'user-app-new',
        component: UserAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-app/:id/edit',
        component: UserAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-app/:id/delete',
        component: UserAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
