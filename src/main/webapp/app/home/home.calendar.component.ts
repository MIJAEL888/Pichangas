import {Component, OnInit, ViewChild} from '@angular/core';
import {Client, ClientService} from "../entities/client";
import {Campus, CampusService} from "../entities/campus";
import {HomeModel} from "./home.model";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {JhiAlertService} from "ng-jhipster";
import {Field, FieldService} from "../entities/field";
import {Account, AccountService, Principal} from "../shared";
import {ROLE_ADMIN, ROLE_USER} from "../app.constants";
import {Booking, BookingService} from "../entities/booking";
import {DxSchedulerComponent} from "devextreme-angular";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'jhi-home-calendar',
  templateUrl: './home.calendar.component.html',
  styles: []
})
export class HomeCalendarComponent implements OnInit {
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    currentAccount: Account;
    homeModel: HomeModel;
    clients:  Client[];
    campuses: Campus[];
    fields: Field[];
    bookings: Booking[];
    currentDate: Date = new Date();

    constructor(
        private principal: Principal,
        private accountService: AccountService,
        private clientsService: ClientService,
        private campusService: CampusService,
        private fieldService: FieldService,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit() {

        this.homeModel = new HomeModel();
        this.principal.identity().then((account) => {
            this.currentAccount = account;

            if (this.principal.hasAnyAuthority([ROLE_ADMIN])){
                this.clientsService.getAll().subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; },
                    (res: HttpErrorResponse) => this.onError(res.message));
            }else{
                this.homeModel.clientId =  this.currentAccount.clientDto.id;
                this.listCapmus(this.currentAccount.clientDto.id)
            }
        });
        //this.scheduler.min = ;
    }

    onChangeClient(clientId?: number){
       this.listCapmus(clientId);
    }

    onChangeCampus(campusId?: number){
        if (campusId){
            this.fieldService.getByCampus(campusId).subscribe((res: HttpResponse<Client[]>) => { this.fields = res.body; },
                (res: HttpErrorResponse) => this.onError(res.message));
        }
        else {
            this.fields = null;
            this.homeModel.fieldId = null;
        }
    }

    onChangeField(fieldId?: number){
        console.log("field id : "+ fieldId);
        if(fieldId){
            this.bookingService.getByField(fieldId).subscribe(
                (res: HttpResponse<Booking[]>) => {
                    this.bookings = res.body;
                    this.scheduler.instance.repaint();
                    //this.scheduler.instance.addAppointment()
                },
                (res: HttpErrorResponse) => this.onError(res.message));

        }
    }

    onAppointmentFormCreated (e) {
        var form = e.form;
        form.itemOption("startDate", {
            //helpText: "Select a date between May 11 and 27",
            editorOptions: {
                //min: new Date(),
                type: 'time',
                // value: 'yyyy-MM-ddTHH:mm:ss'
            }
        });
        form.itemOption("endDate", {
            //helpText: "Select a date between May 11 and 27",
            editorOptions: {
                //min: new Date(),
                type: 'time',
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
        // form.itemOption("startDate", {  label: {
        //                  text: "Moviesdfasdf"
        //              }});
        form.itemOption("allDay", { visible: false });
        form.itemOption("recurrenceRule", { visible: false });
    }

    onAppointmentAdded(e){
        console.log("Added Data : " +e);
        console.log("List of booking : " + this.bookings);
    }
    onAppointmentAdding(e){
        e.appointmentData.fieldId = this.homeModel.fieldId;
        e.appointmentData.startHour = 12;
        e.appointmentData.endHour = 13;
        console.log(this.datePipe.transform(e.appointmentData.startDate, 'yyyy-MM-dd'));
        this.bookingService.create(e.appointmentData).subscribe(
            (res: HttpResponse<Booking>) => {e.appointmentData = res.body;},
            (res: HttpErrorResponse) => {this.onError(res.message); e.cancel = true}
        );
        console.log("Added Data : " +e);
        console.log("List of booking : " + this.bookings);
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
