import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Campus } from './campus.model';
import { CampusService } from './campus.service';

@Component({
    selector: 'jhi-campus-detail',
    templateUrl: './campus-detail.component.html'
})
export class CampusDetailComponent implements OnInit, OnDestroy {

    campus: Campus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private campusService: CampusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampuses();
    }

    load(id) {
        this.campusService.find(id)
            .subscribe((campusResponse: HttpResponse<Campus>) => {
                this.campus = campusResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campusListModification',
            (response) => this.load(this.campus.id)
        );
    }
}
