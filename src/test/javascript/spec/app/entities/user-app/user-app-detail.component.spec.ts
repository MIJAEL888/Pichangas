/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PichangasTestModule } from '../../../test.module';
import { UserAppDetailComponent } from '../../../../../../main/webapp/app/entities/user-app/user-app-detail.component';
import { UserAppService } from '../../../../../../main/webapp/app/entities/user-app/user-app.service';
import { UserApp } from '../../../../../../main/webapp/app/entities/user-app/user-app.model';

describe('Component Tests', () => {

    describe('UserApp Management Detail Component', () => {
        let comp: UserAppDetailComponent;
        let fixture: ComponentFixture<UserAppDetailComponent>;
        let service: UserAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [UserAppDetailComponent],
                providers: [
                    UserAppService
                ]
            })
            .overrideTemplate(UserAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userApp).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
