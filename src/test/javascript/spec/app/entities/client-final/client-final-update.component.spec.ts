/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PichangasTestModule } from '../../../test.module';
import { ClientFinalUpdateComponent } from 'app/entities/client-final/client-final-update.component';
import { ClientFinalService } from 'app/entities/client-final/client-final.service';
import { ClientFinal } from 'app/shared/model/client-final.model';

describe('Component Tests', () => {
    describe('ClientFinal Management Update Component', () => {
        let comp: ClientFinalUpdateComponent;
        let fixture: ComponentFixture<ClientFinalUpdateComponent>;
        let service: ClientFinalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ClientFinalUpdateComponent]
            })
                .overrideTemplate(ClientFinalUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClientFinalUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientFinalService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ClientFinal(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clientFinal = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ClientFinal();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clientFinal = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
