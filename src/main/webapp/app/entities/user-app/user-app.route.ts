import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserApp } from 'app/shared/model/user-app.model';
import { UserAppService } from './user-app.service';
import { UserAppComponent } from './user-app.component';
import { UserAppDetailComponent } from './user-app-detail.component';
import { UserAppUpdateComponent } from './user-app-update.component';
import { UserAppDeletePopupComponent } from './user-app-delete-dialog.component';
import { IUserApp } from 'app/shared/model/user-app.model';

@Injectable({ providedIn: 'root' })
export class UserAppResolve implements Resolve<IUserApp> {
    constructor(private service: UserAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userApp: HttpResponse<UserApp>) => userApp.body));
        }
        return of(new UserApp());
    }
}

export const userAppRoute: Routes = [
    {
        path: 'user-app',
        component: UserAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-app/:id/view',
        component: UserAppDetailComponent,
        resolve: {
            userApp: UserAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-app/new',
        component: UserAppUpdateComponent,
        resolve: {
            userApp: UserAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-app/:id/edit',
        component: UserAppUpdateComponent,
        resolve: {
            userApp: UserAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAppPopupRoute: Routes = [
    {
        path: 'user-app/:id/delete',
        component: UserAppDeletePopupComponent,
        resolve: {
            userApp: UserAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
