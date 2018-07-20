/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PichangasTestModule } from '../../../test.module';
import { ClientFinalDeleteDialogComponent } from 'app/entities/client-final/client-final-delete-dialog.component';
import { ClientFinalService } from 'app/entities/client-final/client-final.service';

describe('Component Tests', () => {
    describe('ClientFinal Management Delete Component', () => {
        let comp: ClientFinalDeleteDialogComponent;
        let fixture: ComponentFixture<ClientFinalDeleteDialogComponent>;
        let service: ClientFinalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [ClientFinalDeleteDialogComponent]
            })
                .overrideTemplate(ClientFinalDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClientFinalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientFinalService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
