/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PichangasTestModule } from '../../../test.module';
import { ProvinceComponent } from '../../../../../../main/webapp/app/entities/province/province.component';
import { ProvinceService } from '../../../../../../main/webapp/app/entities/province/province.service';
import { Province } from '../../../../../../main/webapp/app/entities/province/province.model';

describe('Component Tests', () => {

    describe('Province Management Component', () => {
        let comp: ProvinceComponent;
        let fixture: ComponentFixture<ProvinceComponent>;
        let service: ProvinceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ProvinceComponent],
                providers: [
                    ProvinceService
                ]
            })
            .overrideTemplate(ProvinceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProvinceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Province(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.provinces[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
