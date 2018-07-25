import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientFinal } from 'app/shared/model/client-final.model';

@Component({
    selector: 'jhi-client-final-detail',
    templateUrl: './client-final-detail.component.html'
})
export class ClientFinalDetailComponent implements OnInit {
    clientFinal: IClientFinal;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clientFinal }) => {
            this.clientFinal = clientFinal;
        });
    }

    previousState() {
        window.history.back();
    }
}
