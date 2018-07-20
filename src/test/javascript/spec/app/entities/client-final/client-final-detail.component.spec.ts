/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PichangasTestModule } from '../../../test.module';
import { ClientFinalDetailComponent } from '../../../../../../main/webapp/app/entities/client-final/client-final-detail.component';
import { ClientFinalService } from '../../../../../../main/webapp/app/entities/client-final/client-final.service';
import { ClientFinal } from '../../../../../../main/webapp/app/entities/client-final/client-final.model';

describe('Component Tests', () => {

    describe('ClientFinal Management Detail Component', () => {
        let comp: ClientFinalDetailComponent;
        let fixture: ComponentFixture<ClientFinalDetailComponent>;
        let service: ClientFinalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ClientFinalDetailComponent],
                providers: [
                    ClientFinalService
                ]
            })
            .overrideTemplate(ClientFinalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientFinalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientFinalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClientFinal(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clientFinal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
