/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PichangasTestModule } from '../../../test.module';
import { CampusUpdateComponent } from 'app/entities/campus/campus-update.component';
import { CampusService } from 'app/entities/campus/campus.service';
import { Campus } from 'app/shared/model/campus.model';

describe('Component Tests', () => {
    describe('Campus Management Update Component', () => {
        let comp: CampusUpdateComponent;
        let fixture: ComponentFixture<CampusUpdateComponent>;
        let service: CampusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PichangasTestModule],
                declarations: [CampusUpdateComponent]
            })
                .overrideTemplate(CampusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CampusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampusService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Campus(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.campus = entity;
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
                    const entity = new Campus();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.campus = entity;
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
