import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PichangasSharedModule } from "../shared";
import { HOME_ROUTE, HomeComponent } from "./";
import { HomeCalendarComponent } from "./home.calendar.component";
import {HomeService} from "./home.service";
import {BrowserModule} from "@angular/platform-browser";
import {DxSchedulerModule} from "devextreme-angular";

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        BrowserModule,
        DxSchedulerModule
    ],
    declarations: [
        HomeComponent,
        HomeCalendarComponent,
    ],
    entryComponents: [
        HomeComponent
    ],
    providers: [
        HomeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasHomeModule {}

