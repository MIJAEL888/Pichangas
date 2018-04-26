/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PichangasTestModule } from '../../../test.module';
import { ScheduleComponent } from '../../../../../../main/webapp/app/entities/schedule/schedule.component';
import { ScheduleService } from '../../../../../../main/webapp/app/entities/schedule/schedule.service';
import { Schedule } from '../../../../../../main/webapp/app/entities/schedule/schedule.model';

describe('Component Tests', () => {

    describe('Schedule Management Component', () => {
        let comp: ScheduleComponent;
        let fixture: ComponentFixture<ScheduleComponent>;
        let service: ScheduleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ScheduleComponent],
                providers: [
                    ScheduleService
                ]
            })
            .overrideTemplate(ScheduleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScheduleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Schedule(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.schedules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
