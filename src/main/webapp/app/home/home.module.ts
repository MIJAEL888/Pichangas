import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {PichangasEntityModule} from "../entities/entity.module";

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
        HomeComponent
    ],
    providers: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasHomeModule {}
