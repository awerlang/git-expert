import { Component } from '@angular/core';
import { MdChip } from '@angular/material';

import { TipsService, Tip } from './tips.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  matchingTips: Tip[];
  onGoClick() {
    this.matchingTips = this.tips.match(this.selectedTopic, this.selectedAction);
  }
}
