import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClientFinal } from './client-final.model';
import { ClientFinalService } from './client-final.service';

@Component({
    selector: 'jhi-client-final-detail',
    templateUrl: './client-final-detail.component.html'
})
export class ClientFinalDetailComponent implements OnInit, OnDestroy {

    clientFinal: ClientFinal;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clientFinalService: ClientFinalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClientFinals();
    }

    load(id) {
        this.clientFinalService.find(id)
            .subscribe((clientFinalResponse: HttpResponse<ClientFinal>) => {
                this.clientFinal = clientFinalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClientFinals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientFinalListModification',
            (response) => this.load(this.clientFinal.id)
        );
    }
}
