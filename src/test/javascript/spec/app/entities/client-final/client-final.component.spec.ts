/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PichangasTestModule } from '../../../test.module';
import { ClientFinalComponent } from '../../../../../../main/webapp/app/entities/client-final/client-final.component';
import { ClientFinalService } from '../../../../../../main/webapp/app/entities/client-final/client-final.service';
import { ClientFinal } from '../../../../../../main/webapp/app/entities/client-final/client-final.model';

describe('Component Tests', () => {

    describe('ClientFinal Management Component', () => {
        let comp: ClientFinalComponent;
        let fixture: ComponentFixture<ClientFinalComponent>;
        let service: ClientFinalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ClientFinalComponent],
                providers: [
                    ClientFinalService
                ]
            })
            .overrideTemplate(ClientFinalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientFinalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientFinalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClientFinal(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clientFinals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
