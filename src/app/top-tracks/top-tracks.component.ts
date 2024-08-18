import {Component, inject, OnInit} from '@angular/core';
import {JamendoApiResponse, LastfmService} from "../services/lastfm.service";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {shareReplay} from "rxjs";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-top-tracks',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe,
    NgForOf,
    NzIconDirective
  ],
  templateUrl: './top-tracks.component.html',
  styleUrl: './top-tracks.component.css'
})
export class TopTracksComponent implements OnInit{
  // topTracks: any = [];
  lastfmService = inject(LastfmService);
  // topTracks$ = this.lastfmService.getTopTracks().pipe(shareReplay(1));
  jamendoTopTracks$ = this.lastfmService.getAllTopTracks().pipe(shareReplay(1));

  private audioPlayer : HTMLAudioElement | undefined;
  currentPlaying : number | null = null;

  getDuration(duration:number){
    let minute = Math.floor(duration/60);
    let second = duration%60;
    return `${minute}:${second} min`;
  }

  playAudio(track: any) {
    if(this.audioPlayer){
      this.audioPlayer.pause();
    }
    this.audioPlayer = new Audio(track.audio);
    this.audioPlayer.play();
    this.currentPlaying = track.id;

    this.audioPlayer.onended = () =>{
      this.currentPlaying = null;
    };
  }

  pauseAudio(){
    if(this.audioPlayer){
      this.audioPlayer.pause();
      this.currentPlaying = null;
    }
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
