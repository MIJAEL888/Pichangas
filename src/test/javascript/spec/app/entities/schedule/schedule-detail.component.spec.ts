/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PichangasTestModule } from '../../../test.module';
import { ScheduleDetailComponent } from '../../../../../../main/webapp/app/entities/schedule/schedule-detail.component';
import { ScheduleService } from '../../../../../../main/webapp/app/entities/schedule/schedule.service';
import { Schedule } from '../../../../../../main/webapp/app/entities/schedule/schedule.model';

describe('Component Tests', () => {

    describe('Schedule Management Detail Component', () => {
        let comp: ScheduleDetailComponent;
        let fixture: ComponentFixture<ScheduleDetailComponent>;
        let service: ScheduleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ScheduleDetailComponent],
                providers: [
                    ScheduleService
                ]
            })
            .overrideTemplate(ScheduleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScheduleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Schedule(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.schedule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
