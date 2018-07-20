import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from 'app/shared';
import {
    BookingComponent,
    BookingDetailComponent,
    BookingUpdateComponent,
    BookingDeletePopupComponent,
    BookingDeleteDialogComponent,
    bookingRoute,
    bookingPopupRoute
} from './';

const ENTITY_STATES = [...bookingRoute, ...bookingPopupRoute];

@NgModule({
    imports: [PichangasSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BookingComponent,
        BookingDetailComponent,
        BookingUpdateComponent,
        BookingDeleteDialogComponent,
        BookingDeletePopupComponent
    ],
    entryComponents: [BookingComponent, BookingUpdateComponent, BookingDeleteDialogComponent, BookingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasBookingModule {}
