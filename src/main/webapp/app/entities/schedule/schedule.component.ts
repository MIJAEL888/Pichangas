import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-schedule',
    templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
schedules: Schedule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scheduleService: ScheduleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.scheduleService.query().subscribe(
            (res: HttpResponse<Schedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSchedules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Schedule) {
        return item.id;
    }
    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
