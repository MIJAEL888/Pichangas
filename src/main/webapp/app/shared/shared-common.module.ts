import { NgModule } from '@angular/core';

import { PichangasSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PichangasSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PichangasSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PichangasSharedCommonModule {}
