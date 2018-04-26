/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PichangasTestModule } from '../../../test.module';
import { ProvinceDetailComponent } from '../../../../../../main/webapp/app/entities/province/province-detail.component';
import { ProvinceService } from '../../../../../../main/webapp/app/entities/province/province.service';
import { Province } from '../../../../../../main/webapp/app/entities/province/province.model';

describe('Component Tests', () => {

    describe('Province Management Detail Component', () => {
        let comp: ProvinceDetailComponent;
        let fixture: ComponentFixture<ProvinceDetailComponent>;
        let service: ProvinceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ProvinceDetailComponent],
                providers: [
                    ProvinceService
                ]
            })
            .overrideTemplate(ProvinceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProvinceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Province(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.province).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
