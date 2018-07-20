/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PichangasTestModule } from '../../../test.module';
import { UserAppComponent } from '../../../../../../main/webapp/app/entities/user-app/user-app.component';
import { UserAppService } from '../../../../../../main/webapp/app/entities/user-app/user-app.service';
import { UserApp } from '../../../../../../main/webapp/app/entities/user-app/user-app.model';

describe('Component Tests', () => {

    describe('UserApp Management Component', () => {
        let comp: UserAppComponent;
        let fixture: ComponentFixture<UserAppComponent>;
        let service: UserAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [UserAppComponent],
                providers: [
                    UserAppService
                ]
            })
            .overrideTemplate(UserAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userApps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
