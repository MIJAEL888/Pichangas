import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'jhi-schedule-detail',
    templateUrl: './schedule-detail.component.html'
})
export class ScheduleDetailComponent implements OnInit, OnDestroy {

    schedule: Schedule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scheduleService: ScheduleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchedules();
    }

    load(id) {
        this.scheduleService.find(id)
            .subscribe((scheduleResponse: HttpResponse<Schedule>) => {
                this.schedule = scheduleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scheduleListModification',
            (response) => this.load(this.schedule.id)
        );
    }
}
