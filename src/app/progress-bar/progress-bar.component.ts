import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrackList} from "../top-tracks/track.model";
import {CustomDurationPipe} from "../custom-duration.pipe";
import {NgIf} from "@angular/common";
import {TimeFormatPipe} from "../time-format.pipe";

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    CustomDurationPipe,
    NgIf,
    TimeFormatPipe
  ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() track! : TrackList;
  @Input() data! : {
    progress: number,
    currentTime: number,
    currentPlaying: number | null,
  }
  @Output() seekAudio = new EventEmitter();

  seekSong (event: MouseEvent){
    if(this.data.currentPlaying === this.track.id){
      this.seekAudio.emit(event);
    }
  }

}
