import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserApp } from './user-app.model';
import { UserAppService } from './user-app.service';

@Component({
    selector: 'jhi-user-app-detail',
    templateUrl: './user-app-detail.component.html'
})
export class UserAppDetailComponent implements OnInit, OnDestroy {

    userApp: UserApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userAppService: UserAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserApps();
    }

    load(id) {
        this.userAppService.find(id)
            .subscribe((userAppResponse: HttpResponse<UserApp>) => {
                this.userApp = userAppResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserApps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userAppListModification',
            (response) => this.load(this.userApp.id)
        );
    }
}
