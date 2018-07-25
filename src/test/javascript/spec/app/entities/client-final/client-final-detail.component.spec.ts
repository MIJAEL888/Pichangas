/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PichangasTestModule } from '../../../test.module';
import { ClientFinalDetailComponent } from 'app/entities/client-final/client-final-detail.component';
import { ClientFinal } from 'app/shared/model/client-final.model';

describe('Component Tests', () => {
    describe('ClientFinal Management Detail Component', () => {
        let comp: ClientFinalDetailComponent;
        let fixture: ComponentFixture<ClientFinalDetailComponent>;
        const route = ({ data: of({ clientFinal: new ClientFinal(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ClientFinalDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ClientFinalDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClientFinalDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.clientFinal).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
