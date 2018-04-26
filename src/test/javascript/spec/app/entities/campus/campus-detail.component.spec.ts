/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PichangasTestModule } from '../../../test.module';
import { CampusDetailComponent } from '../../../../../../main/webapp/app/entities/campus/campus-detail.component';
import { CampusService } from '../../../../../../main/webapp/app/entities/campus/campus.service';
import { Campus } from '../../../../../../main/webapp/app/entities/campus/campus.model';

describe('Component Tests', () => {

    describe('Campus Management Detail Component', () => {
        let comp: CampusDetailComponent;
        let fixture: ComponentFixture<CampusDetailComponent>;
        let service: CampusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [CampusDetailComponent],
                providers: [
                    CampusService
                ]
            })
            .overrideTemplate(CampusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Campus(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
