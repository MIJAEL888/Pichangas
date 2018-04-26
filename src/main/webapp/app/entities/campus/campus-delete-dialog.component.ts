import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Campus } from './campus.model';
import { CampusPopupService } from './campus-popup.service';
import { CampusService } from './campus.service';

@Component({
    selector: 'jhi-campus-delete-dialog',
    templateUrl: './campus-delete-dialog.component.html'
})
export class CampusDeleteDialogComponent {

    campus: Campus;

    constructor(
        private campusService: CampusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campusListModification',
                content: 'Deleted an campus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campus-delete-popup',
    template: ''
})
export class CampusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campusPopupService: CampusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.campusPopupService
                .open(CampusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
