"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioWrapper = void 0;
class AudioWrapper {
    constructor(audio_data) {
        this.artist = audio_data.artist;
        this.track = audio_data.track;
        this.source = audio_data.source;
        this.cover = audio_data.cover;
        this.audio = new Audio();
    }
    load_and_play() {
        if (this.audio.currentSrc == undefined ||
            this.audio.currentSrc == null ||
            this.audio.currentSrc == "") {
            this.audio = new Audio(this.source);
        }
        if (this.audio.paused) {
            this.audio.currentTime = 0;
            this.audio.play();
        }
    }
    play() { this.audio.play(); }
    pause() { this.audio.pause(); }
    getCurrentTime() {
        if (isNaN(this.audio.currentTime))
            return 0;
        return this.audio.currentTime;
    }
    getDuration() {
        if (isNaN(this.audio.duration))
            return 0;
        return this.audio.duration;
    }
    isPaused() { return this.audio.paused; }
    getSource() { return this.source; }
    getArtist() { return this.artist; }
    getTitle() { return this.track; }
    getCover() { return this.cover; }
    setCurrentTime(time) { this.audio.currentTime = time; }
    onLoadedMetadata(callback) {
        this.audio.addEventListener("loadedmetadata", callback);
    }
    onTimeUpdate(callback) {
        this.audio.addEventListener("timeupdate", callback);
    }
}
exports.AudioWrapper = AudioWrapper;
//# sourceMappingURL=AudioWrapper.js.map