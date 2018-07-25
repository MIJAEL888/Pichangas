import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampus } from 'app/shared/model/campus.model';

@Component({
    selector: 'jhi-campus-detail',
    templateUrl: './campus-detail.component.html'
})
export class CampusDetailComponent implements OnInit {
    campus: ICampus;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ campus }) => {
            this.campus = campus;
        });
    }

    previousState() {
        window.history.back();
    }
}
