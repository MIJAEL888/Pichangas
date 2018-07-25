import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campus } from 'app/shared/model/campus.model';
import { CampusService } from './campus.service';
import { CampusComponent } from './campus.component';
import { CampusDetailComponent } from './campus-detail.component';
import { CampusUpdateComponent } from './campus-update.component';
import { CampusDeletePopupComponent } from './campus-delete-dialog.component';
import { ICampus } from 'app/shared/model/campus.model';

@Injectable({ providedIn: 'root' })
export class CampusResolve implements Resolve<ICampus> {
    constructor(private service: CampusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((campus: HttpResponse<Campus>) => campus.body));
        }
        return of(new Campus());
    }
}

export const campusRoute: Routes = [
    {
        path: 'campus',
        component: CampusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campus/:id/view',
        component: CampusDetailComponent,
        resolve: {
            campus: CampusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campus/new',
        component: CampusUpdateComponent,
        resolve: {
            campus: CampusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campus/:id/edit',
        component: CampusUpdateComponent,
        resolve: {
            campus: CampusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campusPopupRoute: Routes = [
    {
        path: 'campus/:id/delete',
        component: CampusDeletePopupComponent,
        resolve: {
            campus: CampusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
