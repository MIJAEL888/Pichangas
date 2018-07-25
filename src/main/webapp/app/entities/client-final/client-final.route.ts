import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientFinal } from 'app/shared/model/client-final.model';
import { ClientFinalService } from './client-final.service';
import { ClientFinalComponent } from './client-final.component';
import { ClientFinalDetailComponent } from './client-final-detail.component';
import { ClientFinalUpdateComponent } from './client-final-update.component';
import { ClientFinalDeletePopupComponent } from './client-final-delete-dialog.component';
import { IClientFinal } from 'app/shared/model/client-final.model';

@Injectable({ providedIn: 'root' })
export class ClientFinalResolve implements Resolve<IClientFinal> {
    constructor(private service: ClientFinalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((clientFinal: HttpResponse<ClientFinal>) => clientFinal.body));
        }
        return of(new ClientFinal());
    }
}

export const clientFinalRoute: Routes = [
    {
        path: 'client-final',
        component: ClientFinalComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-final/:id/view',
        component: ClientFinalDetailComponent,
        resolve: {
            clientFinal: ClientFinalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-final/new',
        component: ClientFinalUpdateComponent,
        resolve: {
            clientFinal: ClientFinalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-final/:id/edit',
        component: ClientFinalUpdateComponent,
        resolve: {
            clientFinal: ClientFinalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientFinalPopupRoute: Routes = [
    {
        path: 'client-final/:id/delete',
        component: ClientFinalDeletePopupComponent,
        resolve: {
            clientFinal: ClientFinalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientFinals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
