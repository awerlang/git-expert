import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { MdChip, MdChipList } from '@angular/material';

import { TipsService, Tip } from './tips.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class AppComponent {
  constructor(private tips: TipsService) { }

  topics: string[] = this.tips.getTopics();
  actions: string[] = this.tips.getActions();

  private selectedTopic: string;
  onTopicSelected(topic: string) {
    this.selectedTopic = topic;
  }

  private selectedAction: string;
  onActionSelected(action: string) {
    this.selectedAction = action;
  }

  onChipClicked(list: MdChipList, chip: MdChip) {
    list.chips
      .filter(item => item.selected && item !== chip)
      .forEach(item => {
        item.selected = false;
      });
    chip.toggleSelected();
  }

  matchingTips: Tip[];
  onGoClick() {
    this.matchingTips = this.tips.match(this.selectedTopic, this.selectedAction);
  }
}
