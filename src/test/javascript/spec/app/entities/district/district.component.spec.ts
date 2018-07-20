/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PichangasTestModule } from '../../../test.module';
import { DistrictComponent } from '../../../../../../main/webapp/app/entities/district/district.component';
import { DistrictService } from '../../../../../../main/webapp/app/entities/district/district.service';
import { District } from '../../../../../../main/webapp/app/entities/district/district.model';

describe('Component Tests', () => {

    describe('District Management Component', () => {
        let comp: DistrictComponent;
        let fixture: ComponentFixture<DistrictComponent>;
        let service: DistrictService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [DistrictComponent],
                providers: [
                    DistrictService
                ]
            })
            .overrideTemplate(DistrictComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DistrictComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DistrictService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new District(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.districts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
