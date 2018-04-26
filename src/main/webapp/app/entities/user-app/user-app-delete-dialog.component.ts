import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserApp } from './user-app.model';
import { UserAppPopupService } from './user-app-popup.service';
import { UserAppService } from './user-app.service';

@Component({
    selector: 'jhi-user-app-delete-dialog',
    templateUrl: './user-app-delete-dialog.component.html'
})
export class UserAppDeleteDialogComponent {

    userApp: UserApp;

    constructor(
        private userAppService: UserAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userAppService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userAppListModification',
                content: 'Deleted an userApp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-app-delete-popup',
    template: ''
})
export class UserAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAppPopupService: UserAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userAppPopupService
                .open(UserAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
