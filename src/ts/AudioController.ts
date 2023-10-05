
import { AudioWrapper } from "./AudioWrapper"
import { formatSeconds } from "./utils"

export class AudioController {
    private pCurrentArtist : HTMLParagraphElement
    private pCurrentTrack : HTMLParagraphElement
    private divCurrentArtwork : HTMLDivElement
    private spanCurrentTime : HTMLSpanElement
    private spanTotalTime : HTMLSpanElement
    private btnPlayPause : HTMLButtonElement
    private divTimeline : HTMLDivElement
    private divTimelineOverlay : HTMLDivElement
    private divProgressLine : HTMLDivElement
    
    private availableTracks : AudioWrapper[]
    private currentTrack : AudioWrapper|null


    constructor() {
        this.divCurrentArtwork = <HTMLDivElement>document.querySelector("#current-artwork")
        this.pCurrentArtist = <HTMLParagraphElement>document.querySelector("#current-artist")
        this.pCurrentTrack = <HTMLParagraphElement>document.querySelector("#current-track")
        this.btnPlayPause = <HTMLButtonElement>document.querySelector("#play-pause")
        this.spanCurrentTime = <HTMLSpanElement>document.querySelector("#ct")
        this.spanTotalTime = <HTMLSpanElement>document.querySelector("#tt")
        this.divTimeline = <HTMLDivElement>document.querySelector(".timeline")
        this.divTimelineOverlay = <HTMLDivElement>document.querySelector(".timeline-overlay")
        this.divProgressLine = <HTMLDivElement>document.querySelector(".progress-line")

        this.availableTracks = []
        this.currentTrack = null

        this.btnPlayPause.onclick = () => this.changePlayPauseState()
        this.divTimelineOverlay.onclick = (e) => this.changeTrackPosition(e)
    }

    changeTrackPosition(e : MouseEvent) {
        const track = <AudioWrapper>this.currentTrack
        const rect = this.divTimeline.getBoundingClientRect()
        const x = e.x - rect.left
        const new_time = (x / rect.width) * track.getDuration()
        this.divProgressLine.style.width = x + "px"
        track.setCurrentTime(new_time)
    }

    changePlayPauseState() {
        if(this.currentTrack == null) {
            this.currentTrack = this.availableTracks[0]
            this.playForSource(this.currentTrack.getSource())
            this.btnPlayPause.innerHTML = `<i class="icon-pause"></i>`
        } else {
            if(!this.currentTrack.isPaused()) {
                this.currentTrack.pause()
                this.btnPlayPause.innerHTML = `<i class="icon-play"></i>`
            } else {
                this.currentTrack.play()
                this.btnPlayPause.innerHTML = `<i class="icon-pause"></i>`
            }
        }
    }

    populate(tracks : AudioWrapper[]) { this.availableTracks = tracks }

    findAudioWrapperForSource(source : string) : AudioWrapper | null {
        for(let track of this.availableTracks) {
            if(track.getSource() == source) return track 
        }
        return null
    }

    fillTrackDetails() {
        if(this.currentTrack != null) {
            this.pCurrentArtist.innerHTML = this.currentTrack.getArtist()
            this.pCurrentTrack.innerHTML = this.currentTrack.getTitle()
            this.divCurrentArtwork.innerHTML = 
            `<img src="${this.currentTrack.getCover()}" />`
            this.spanCurrentTime.innerHTML = 
            formatSeconds(this.currentTrack.getCurrentTime())
            this.spanTotalTime.innerHTML =
            formatSeconds(this.currentTrack.getDuration())
        }
    }

    defineTrackEvents() {
        const track = <AudioWrapper>this.currentTrack
        track.onLoadedMetadata( () => {
            this.spanTotalTime.innerHTML = 
            formatSeconds(track.getDuration())
        } )
        track.onTimeUpdate( () => {
            this.spanCurrentTime.innerHTML = 
            formatSeconds(track.getCurrentTime())
            const rect = this.divTimeline.getBoundingClientRect()
            const w = (track.getCurrentTime() / track.getDuration()) * rect.width 
            this.divProgressLine.style.width = w + "px"
        })
    } 

    playForSource(source : string) {
        if(this.currentTrack != null && 
           !this.currentTrack.isPaused()) this.currentTrack.pause()
        this.currentTrack = <AudioWrapper> this.findAudioWrapperForSource(source)
        this.currentTrack.load_and_play()
        this.fillTrackDetails()
        this.defineTrackEvents()
        this.btnPlayPause.innerHTML = `<i class="icon-pause"></i>`
    }

}