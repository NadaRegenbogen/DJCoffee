"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioController = void 0;
const utils_1 = require("./utils");
class AudioController {
    constructor() {
        this.divCurrentArtwork =
            document.querySelector("#current-artwork");
        this.pCurrentArtist =
            document.querySelector("#current-artist");
        this.pCurrentTrack =
            document.querySelector("#current-track");
        this.btnPlayPause =
            document.querySelector("#play-pause");
        this.spanCurrentTime =
            document.querySelector("#ct");
        this.spanTotalTime =
            document.querySelector("#tt");
        this.divTimeline =
            document.querySelector(".timeline");
        this.divTimelineOverlay =
            document.querySelector(".timeline-overlay");
        this.divProgressLine =
            document.querySelector(".progress-line");
        this.availableTracks = [];
        this.currentTrack = null;
        this.btnPlayPause.onclick = () => this.changePlayPauseState();
        this.divTimelineOverlay.onclick = (e) => this.changeTrackPosition(e);
    }
    changeTrackPosition(e) {
        const track = this.currentTrack;
        const rect = this.divTimeline.getBoundingClientRect();
        const x = e.x - rect.left;
        const new_time = (x / rect.width) * track.getDuration();
        this.divProgressLine.style.width = x + "px";
        track.setCurrentTime(new_time);
    }
    changePlayPauseState() {
        if (this.currentTrack == null) {
            this.currentTrack = this.availableTracks[0];
            this.playForSource(this.currentTrack.getSource());
            this.btnPlayPause.innerHTML = `<i class="icon-pause"></i>`;
        }
        else {
            if (!this.currentTrack.isPaused()) {
                this.currentTrack.pause();
                this.btnPlayPause.innerHTML = `<i class="icon-play"></i>`;
            }
            else {
                this.currentTrack.play();
                this.btnPlayPause.innerHTML = `<i class="icon-pause"></i>`;
            }
        }
    }
    populate(tracks) { this.availableTracks = tracks; }
    findAudioWrapperForSource(source) {
        for (let track of this.availableTracks) {
            if (track.getSource() == source)
                return track;
        }
        return null;
    }
    fillTrackDetails() {
        if (this.currentTrack != null) {
            this.pCurrentArtist.innerHTML = this.currentTrack.getArtist();
            this.pCurrentTrack.innerHTML = this.currentTrack.getTitle();
            this.divCurrentArtwork.innerHTML =
                `<img src="${this.currentTrack.getCover()}" />`;
            this.spanCurrentTime.innerHTML =
                (0, utils_1.formatSeconds)(this.currentTrack.getCurrentTime());
            this.spanTotalTime.innerHTML =
                (0, utils_1.formatSeconds)(this.currentTrack.getDuration());
        }
    }
    defineTrackEvents() {
        const track = this.currentTrack;
        track.onLoadedMetadata(() => {
            this.spanTotalTime.innerHTML =
                (0, utils_1.formatSeconds)(track.getDuration());
        });
        track.onTimeUpdate(() => {
            this.spanCurrentTime.innerHTML =
                (0, utils_1.formatSeconds)(track.getCurrentTime());
            const rect = this.divTimeline.getBoundingClientRect();
            const w = (track.getCurrentTime() / track.getDuration()) * rect.width;
            this.divProgressLine.style.width = w + "px";
        });
    }
    playForSource(source) {
        if (this.currentTrack != null &&
            !this.currentTrack.isPaused())
            this.currentTrack.pause();
        this.currentTrack = this.findAudioWrapperForSource(source);
        this.currentTrack.load_and_play();
        this.fillTrackDetails();
        this.defineTrackEvents();
        this.btnPlayPause.innerHTML = `<i class="icon-pause"></i>`;
    }
}
exports.AudioController = AudioController;
//# sourceMappingURL=AudioController.js.map