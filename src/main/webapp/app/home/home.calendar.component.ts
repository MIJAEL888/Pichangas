import { Component, OnInit } from '@angular/core';
import {Client, ClientService} from "../entities/client";
import {Campus, CampusService} from "../entities/campus";
import {HomeModel} from "./home.model";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {JhiAlertService} from "ng-jhipster";
import {Field, FieldService} from "../entities/field";
import {Appointment, HomeService} from "./home.service";
import {Account, AccountService, Principal} from "../shared";
import {ROLE_ADMIN, ROLE_USER} from "../app.constants";

@Component({
  selector: 'jhi-home-calendar',
  templateUrl: './home.calendar.component.html',
  styles: []
})
export class HomeCalendarComponent implements OnInit {
    currentAccount: Account;
    homeModel: HomeModel;
    clients:  Client[];
    campuses: Campus[];
    fields: Field[];
    appointmentsData: Appointment[];
    currentDate: Date = new Date(2017, 4, 25);

    constructor(
        private principal: Principal,
        private accountService: AccountService,
        private clientsService: ClientService,
        private campusService: CampusService,
        private fieldService: FieldService,
        private jhiAlertService: JhiAlertService,
        private homeService: HomeService
    ) {
    }

    ngOnInit() {

        this.homeModel = new HomeModel();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.homeModel.clientId =  this.currentAccount.clientDto.id;

            if (this.principal.hasAnyAuthority([ROLE_ADMIN]))
                this.clientsService.getAll().subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; },
                    (res: HttpErrorResponse) => this.onError(res.message));
            if (this.principal.hasAnyAuthority([ROLE_USER]) && this.currentAccount){
                this.listCapmus(this.currentAccount.clientDto.id)
            }
        });
        this.appointmentsData = this.homeService.getAppointments();
    }

    onChangeClient(clientId: number){
        console.log(clientId);
       this.listCapmus(clientId);
    }

    onChangeCampus(campusId: number){
        console.log(campusId);
        if (campusId)
        this.fieldService.getByCampus(campusId).subscribe((res: HttpResponse<Client[]>) => { this.fields = res.body; },
            (res: HttpErrorResponse) => this.onError(res.message));
        else {
            this.fields = null;
            this.homeModel.fieldId = null;
        }
    }
    private listCapmus(clientId: number){
        if (clientId)
            this.campusService.getAllByClient(clientId).subscribe((res: HttpResponse<Client[]>) => { this.campuses = res.body; },
                (res: HttpErrorResponse) => this.onError(res.message));
        else {
            this.campuses = null;
            this.homeModel.campusId =null;
        }
    }
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
