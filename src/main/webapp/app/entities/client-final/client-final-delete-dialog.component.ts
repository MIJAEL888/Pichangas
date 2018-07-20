import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientFinal } from 'app/shared/model/client-final.model';
import { ClientFinalService } from './client-final.service';

@Component({
    selector: 'jhi-client-final-delete-dialog',
    templateUrl: './client-final-delete-dialog.component.html'
})
export class ClientFinalDeleteDialogComponent {
    clientFinal: IClientFinal;

    constructor(
        private clientFinalService: ClientFinalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientFinalService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clientFinal }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClientFinalDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.clientFinal = clientFinal;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
