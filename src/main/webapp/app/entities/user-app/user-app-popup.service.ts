import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserApp } from './user-app.model';
import { UserAppService } from './user-app.service';

@Injectable()
export class UserAppPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userAppService: UserAppService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.userAppService.find(id)
                    .subscribe((userAppResponse: HttpResponse<UserApp>) => {
                        const userApp: UserApp = userAppResponse.body;
                        if (userApp.dateReg) {
                            userApp.dateReg = {
                                year: userApp.dateReg.getFullYear(),
                                month: userApp.dateReg.getMonth() + 1,
                                day: userApp.dateReg.getDate()
                            };
                        }
                        this.ngbModalRef = this.userAppModalRef(component, userApp);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userAppModalRef(component, new UserApp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userAppModalRef(component: Component, userApp: UserApp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userApp = userApp;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
