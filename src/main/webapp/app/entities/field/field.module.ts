import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from '../../shared';
import {
    FieldService,
    FieldPopupService,
    FieldComponent,
    FieldDetailComponent,
    FieldDialogComponent,
    FieldPopupComponent,
    FieldDeletePopupComponent,
    FieldDeleteDialogComponent,
    fieldRoute,
    fieldPopupRoute,
    FieldResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fieldRoute,
    ...fieldPopupRoute,
];

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldComponent,
        FieldDetailComponent,
        FieldDialogComponent,
        FieldDeleteDialogComponent,
        FieldPopupComponent,
        FieldDeletePopupComponent,
    ],
    entryComponents: [
        FieldComponent,
        FieldDialogComponent,
        FieldPopupComponent,
        FieldDeleteDialogComponent,
        FieldDeletePopupComponent,
    ],
    providers: [
        FieldService,
        FieldPopupService,
        FieldResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasFieldModule {}
