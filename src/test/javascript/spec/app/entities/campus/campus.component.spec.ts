/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PichangasTestModule } from '../../../test.module';
import { CampusComponent } from '../../../../../../main/webapp/app/entities/campus/campus.component';
import { CampusService } from '../../../../../../main/webapp/app/entities/campus/campus.service';
import { Campus } from '../../../../../../main/webapp/app/entities/campus/campus.model';

describe('Component Tests', () => {

    describe('Campus Management Component', () => {
        let comp: CampusComponent;
        let fixture: ComponentFixture<CampusComponent>;
        let service: CampusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [CampusComponent],
                providers: [
                    CampusService
                ]
            })
            .overrideTemplate(CampusComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Campus(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
