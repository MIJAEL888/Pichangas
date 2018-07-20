/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PichangasTestModule } from '../../../test.module';
import { FieldDetailComponent } from '../../../../../../main/webapp/app/entities/field/field-detail.component';
import { FieldService } from '../../../../../../main/webapp/app/entities/field/field.service';
import { Field } from '../../../../../../main/webapp/app/entities/field/field.model';

describe('Component Tests', () => {

    describe('Field Management Detail Component', () => {
        let comp: FieldDetailComponent;
        let fixture: ComponentFixture<FieldDetailComponent>;
        let service: FieldService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [FieldDetailComponent],
                providers: [
                    FieldService
                ]
            })
            .overrideTemplate(FieldDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Field(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.field).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
