/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PichangasTestModule } from '../../../test.module';
import { DistrictDetailComponent } from '../../../../../../main/webapp/app/entities/district/district-detail.component';
import { DistrictService } from '../../../../../../main/webapp/app/entities/district/district.service';
import { District } from '../../../../../../main/webapp/app/entities/district/district.model';

describe('Component Tests', () => {

    describe('District Management Detail Component', () => {
        let comp: DistrictDetailComponent;
        let fixture: ComponentFixture<DistrictDetailComponent>;
        let service: DistrictService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [DistrictDetailComponent],
                providers: [
                    DistrictService
                ]
            })
            .overrideTemplate(DistrictDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DistrictDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DistrictService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new District(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.district).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
