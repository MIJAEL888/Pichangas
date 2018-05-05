import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {HomeModel} from "./home.model";
import {Client, ClientService} from "../entities/client";
import {Campus, CampusService} from "../entities/campus";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    homeModel: HomeModel;
    clients:  Client[];
    campuses: Campus[];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private clientsService: ClientService,
        private campusService: CampusService
    ) {
    }

    ngOnInit() {
        this.homeModel = new HomeModel();
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.clientsService.getAll().subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; },
            (res: HttpErrorResponse) => this.onError(res.message));
        this.campusService.query().subscribe((res: HttpResponse<Client[]>) => { this.campuses = res.body; },
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    private onError(error: any) {
        console.log(error.message, null, null);
    }
}
