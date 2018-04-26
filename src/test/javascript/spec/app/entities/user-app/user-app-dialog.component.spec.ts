/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PichangasTestModule } from '../../../test.module';
import { UserAppDialogComponent } from '../../../../../../main/webapp/app/entities/user-app/user-app-dialog.component';
import { UserAppService } from '../../../../../../main/webapp/app/entities/user-app/user-app.service';
import { UserApp } from '../../../../../../main/webapp/app/entities/user-app/user-app.model';
import { ClientFinalService } from '../../../../../../main/webapp/app/entities/client-final';
import { CampusService } from '../../../../../../main/webapp/app/entities/campus';

describe('Component Tests', () => {

    describe('UserApp Management Dialog Component', () => {
        let comp: UserAppDialogComponent;
        let fixture: ComponentFixture<UserAppDialogComponent>;
        let service: UserAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [UserAppDialogComponent],
                providers: [
                    ClientFinalService,
                    CampusService,
                    UserAppService
                ]
            })
            .overrideTemplate(UserAppDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAppDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserApp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userApp = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userAppListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserApp();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userApp = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userAppListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
