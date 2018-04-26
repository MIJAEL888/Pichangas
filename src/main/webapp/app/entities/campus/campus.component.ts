import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Campus } from './campus.model';
import { CampusService } from './campus.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-campus',
    templateUrl: './campus.component.html'
})
export class CampusComponent implements OnInit, OnDestroy {
campuses: Campus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private campusService: CampusService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.campusService.query().subscribe(
            (res: HttpResponse<Campus[]>) => {
                this.campuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCampuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Campus) {
        return item.id;
    }
    registerChangeInCampuses() {
        this.eventSubscriber = this.eventManager.subscribe('campusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
