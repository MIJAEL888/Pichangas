import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PichangasClientModule } from './client/client.module';
import { PichangasCampusModule } from './campus/campus.module';
import { PichangasFieldModule } from './field/field.module';
import { PichangasDepartmentModule } from './department/department.module';
import { PichangasDistrictModule } from './district/district.module';
import { PichangasProvinceModule } from './province/province.module';
import { PichangasScheduleModule } from './schedule/schedule.module';
import { PichangasBookingModule } from './booking/booking.module';
import { PichangasClientFinalModule } from './client-final/client-final.module';
import { PichangasUserAppModule } from './user-app/user-app.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PichangasClientModule,
        PichangasCampusModule,
        PichangasFieldModule,
        PichangasDepartmentModule,
        PichangasDistrictModule,
        PichangasProvinceModule,
        PichangasScheduleModule,
        PichangasBookingModule,
        PichangasClientFinalModule,
        PichangasUserAppModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasEntityModule {}
