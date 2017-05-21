import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaderboardModal } from './leaderboard-modal';

@NgModule({
  declarations: [
    LeaderboardModal,
  ],
  imports: [
    IonicPageModule.forChild(LeaderboardModal),
  ],
  exports: [
    LeaderboardModal
  ]
})
export class LeaderboardModalModule {}
