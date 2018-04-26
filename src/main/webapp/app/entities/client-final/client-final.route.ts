import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ClientFinalComponent } from './client-final.component';
import { ClientFinalDetailComponent } from './client-final-detail.component';
import { ClientFinalPopupComponent } from './client-final-dialog.component';
import { ClientFinalDeletePopupComponent } from './client-final-delete-dialog.component';

@Injectable()
export class ClientFinalResolvePagingParams implements Resolve<any> {

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

export const clientFinalRoute: Routes = [
    {
        path: 'client-final',
        component: ClientFinalComponent,
        resolve: {
            'pagingParams': ClientFinalResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-final/:id',
        component: ClientFinalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientFinalPopupRoute: Routes = [
    {
        path: 'client-final-new',
        component: ClientFinalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-final/:id/edit',
        component: ClientFinalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-final/:id/delete',
        component: ClientFinalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
