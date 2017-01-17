/* tslint:disable:no-unused-variable */

import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule, MdChip } from '@angular/material';

import { AppComponent } from './app.component';
import { TipsService } from './tips.service';

const tipsService = {
  getTopics() {
    return ['changes', 'branches', 'commits', 'remotes'];
  },

  getActions() {
    return ['revert', 'add', 'delete', 'list', 'merge', 'update'];
  },

  match(topic, action) {
    if (!topic || !action) {
      return [];
    }

    return [
      {
        topic: 'changes',
        action: 'revert',
        title: 'Reverter arquivo modificado',
        command: 'git checkout <path/to/file>',
      }
    ];
  }
};

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: TipsService, useValue: tipsService }],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render topics', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect([].map.call(compiled.querySelectorAll('.topics md-chip'), it => it.textContent))
      .toEqual(['changes', 'branches', 'commits', 'remotes']);
  }));

  it('should render actions', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect([].map.call(compiled.querySelectorAll('.actions md-chip'), it => it.textContent))
      .toEqual(['revert', 'add', 'delete', 'list', 'merge', 'update']);
  }));

  describe('Go!', () => {

    let fixture: ComponentFixture<AppComponent>;
    let goBtn: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      el = fixture.debugElement.nativeElement;
      goBtn = fixture.debugElement.query(By.css('.go'));

      fixture.detectChanges();
    });

    it('should render no results', async(() => {
      goBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(el.querySelector('h4').textContent).toEqual('No results');
    }));

    it('should render results', async(() => {
      const topicChip: DebugElement = fixture.debugElement.query(By.css('.topics')).query(By.directive(MdChip));
      const actionChip: DebugElement = fixture.debugElement.query(By.css('.actions')).query(By.directive(MdChip));

      topicChip.triggerEventHandler('click', null);
      actionChip.triggerEventHandler('click', null);

      goBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(el.querySelector('h4').textContent).toEqual('One tip found');
    }));

  });
});
