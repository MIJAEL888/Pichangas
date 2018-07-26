import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';

import { ClientService } from '../entities/client';
import { CampusService } from '../entities/campus';
import { HomeModel } from './home.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { FieldService } from '../entities/field';
import { ROLE_ADMIN, ROLE_USER } from '../app.constants';
import { BookingService } from '../entities/booking';
import { DxSchedulerComponent } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { IBooking } from 'app/shared/model/booking.model';
import { IClient } from 'app/shared/model/client.model';
import { ICampus } from 'app/shared/model/campus.model';
import { IField } from 'app/shared/model/field.model';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'jhi-home-calendar',
    templateUrl: './home.calendar.component.html',
    styles: []
})
export class HomeCalendarComponent implements OnInit {
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    currentAccount: Account;
    homeModel: HomeModel;
    clients: IClient[];
    campuses: ICampus[];
    fields: IField[];
    bookings: IBooking[];
    currentDate: Date = new Date();

    constructor(
        private principal: Principal,
        private clientsService: ClientService,
        private campusService: CampusService,
        private fieldService: FieldService,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.homeModel = new HomeModel();
        this.principal.identity().then(account => {
            this.currentAccount = account;

            if (this.currentAccount.authorities.includes(ROLE_ADMIN)) {
                this.clientsService.getAll().subscribe(
                    (res: HttpResponse<IClient[]>) => {
                        this.clients = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            } else {
                this.homeModel.clientId = this.currentAccount.clientDto.id;
                this.listCapmus(this.currentAccount.clientDto.id);
            }
        });
        //this.scheduler.min = ;
    }

    onChangeClient(clientId?: number) {
        this.listCapmus(clientId);
    }

    onChangeCampus(campusId?: number) {
        if (campusId) {
            this.fieldService.getByCampus(campusId).subscribe(
                (res: HttpResponse<IClient[]>) => {
                    this.fields = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.fields = null;
            this.homeModel.fieldId = null;
        }
    }

    onChangeField(fieldId?: number) {
        console.log('field id : ' + fieldId);
        if (fieldId) {
            // this.bookingService.getByField(fieldId).subscribe(
            //     (res: HttpResponse<IBooking[]>) => {
            //         this.bookings = res.body;
            //         this.scheduler.instance.repaint();
            //         //this.scheduler.instance.addAppointment()
            //     },
            //     (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    onAppointmentFormCreated(e) {
        var form = e.form;
        form.itemOption('startDate', {
            label: { text: 'Hora Inicio' },
            //helpText: "Select a date between May 11 and 27",
            editorOptions: {
                //min: new Date(),
                type: 'time'
                // value: 'yyyy-MM-ddTHH:mm:ss'
            }
        });
        form.itemOption('endDate', {
            label: { text: 'Hora Fin' },
            //helpText: "Select a date between May 11 and 27",
            editorOptions: {
                //min: new Date(),
                type: 'time'
                // value: 'yyyy-MM-ddTHH:mm:ss'
            }
        });
        // By default, fields that show timezones are hidden
        // To show them, use the code below
        // form.option("items", [{
        //     label: {
        //         text: "Moviesdfasdf"
        //     },
        //     dataField: "startDate"
        // }]);
        form.itemOption('text', { label: { text: 'Descripcion' } });
        form.itemOption('description', { label: { text: 'Comentario' } });
        form.itemOption('allDay', { visible: false });
        form.itemOption('recurrenceRule', { visible: false });
        // form.buttonOptions();
    }

    onAppointmentAdded(e) {
        console.log('Added Data : ' + e);
        console.log('List of booking : ' + JSON.stringify(this.bookings));
    }
    onAppointmentAdding(e) {
        e.appointmentData.fieldId = this.homeModel.fieldId;
        e.appointmentData.startHour = e.appointmentData.startDate.getHours();
        e.appointmentData.endHour = e.appointmentData.endDate.getHours();
        //e.appointmentData.endDate.setMinutes(59, 59, 0);
        //console.log(this.datePipe.transform(e.appointmentData.startDate, 'yyyy-MM-dd HH:mm'));
        var creating = true;
        this.bookingService.create(e.appointmentData).subscribe(
            (res: HttpResponse<IBooking>) => {
                e.appointmentData = res.body;
                creating = false;
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                e.cancel = true;
                creating = false;
            }
        );
    }

    onAppointmentUpdating(e) {
        this.bookingService.update(e.appointmentData).subscribe(
            (res: HttpResponse<IBooking>) => {
                e.appointmentData = res.body;
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                e.cancel = true;
            }
        );
    }
    onAppointmentDeleting(e) {
        this.bookingService.delete(e.appointmentData.id).subscribe(
            (res: HttpResponse<any>) => {
                this.jhiAlertService.success(res.toString());
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                e.cancel = true;
            }
        );
    }

    private listCapmus(clientId: number) {
        if (clientId)
            this.campusService.getAllByClient(clientId).subscribe(
                (res: HttpResponse<IClient[]>) => {
                    this.campuses = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        else {
            this.campuses = null;
            this.homeModel.campusId = null;
        }
    }
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
