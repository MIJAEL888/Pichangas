import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientFinal } from './client-final.model';
import { ClientFinalPopupService } from './client-final-popup.service';
import { ClientFinalService } from './client-final.service';

@Component({
    selector: 'jhi-client-final-delete-dialog',
    templateUrl: './client-final-delete-dialog.component.html'
})
export class ClientFinalDeleteDialogComponent {

    clientFinal: ClientFinal;

    constructor(
        private clientFinalService: ClientFinalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientFinalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clientFinalListModification',
                content: 'Deleted an clientFinal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-final-delete-popup',
    template: ''
})
export class ClientFinalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientFinalPopupService: ClientFinalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientFinalPopupService
                .open(ClientFinalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
