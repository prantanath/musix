import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {LastfmService} from "../services/lastfm.service";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {interval, map, shareReplay, Subscription, takeWhile} from "rxjs";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {CustomDurationPipe} from "../custom-duration.pipe";
import {TimeFormatPipe} from "../time-format.pipe";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";

@Component({
  selector: 'app-top-tracks',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe,
    NgForOf,
    NzIconDirective,
    CustomDurationPipe,
    TimeFormatPipe,
    ProgressBarComponent
  ],
  templateUrl: './top-tracks.component.html',
  styleUrl: './top-tracks.component.css'
})
export class TopTracksComponent implements OnInit {
  // topTracks: any = [];
  lastfmService = inject(LastfmService);
  // topTracks$ = this.lastfmService.getTopTracks().pipe(shareReplay(1));
  jamendoTopTracks$ = this.lastfmService.getAllTopTracks().pipe(shareReplay(1));

  private audioPlayer: HTMLAudioElement | undefined;
  private sub: Subscription | null = null;
  currentPlaying: number | null = null;
  songDuration: number = 0;
  currentTime: number = 0;
  progress: number = 0;

  parentData = {
    progress: this.progress,
    currentTime: this.currentTime,
    currentPlaying: this.currentPlaying,

  }

  makeChanges() {
    this.parentData = {
      currentPlaying: this.currentPlaying,
      currentTime: this.currentTime,
      progress: this.progress
    };
  }

  playAudio(track: any) {
    if (this.audioPlayer) {
      this.stopAudio();
    }
    this.audioPlayer = new Audio(track.audio);
    this.audioPlayer.play();
    this.currentPlaying = track.id;

    this.audioPlayer.onloadedmetadata = () => {
      this.songDuration = this.audioPlayer?.duration || 0;
      this.startTimer();
    };
    this.audioPlayer.ontimeupdate = () => {
      this.currentTime = this.audioPlayer?.currentTime || 0;
      this.progress = (this.currentTime / this.songDuration) * 100;
      this.makeChanges();
    };

    this.audioPlayer.onended = () => {
      this.currentPlaying = null;
    };
  }

  stopAudio() {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.currentPlaying = null;
    }
    this.resetTimer();
  }

  private startTimer() {
    this.sub = interval(1000).pipe(
      map(() => this.audioPlayer?.currentTime || 0),
      takeWhile(currentTime => currentTime <= this.songDuration)
    ).subscribe(currentTime => {
      this.currentTime = currentTime;
      this.progress = (this.currentTime / this.songDuration) * 100;
    });
  }

  private resetTimer() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
    this.currentTime = 0;
    this.progress = 0;
  }

  seek(event: MouseEvent) {
    if (!this.audioPlayer) return;
    const bar = event.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    this.audioPlayer.currentTime = (clickX / rect.width) * this.songDuration;
    this.progress = (this.currentTime / this.songDuration) * 100;
  }

  ngOnInit() {
    // this.lastfmService.getAllTopTracks().subscribe({
    //   next: data => {
    //     this.topTracks = data.response;
    //     console.log(data);
    //   }
    // });
  }


}
