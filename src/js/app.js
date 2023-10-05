"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AudioWrapper_1 = require("./AudioWrapper");
const AudioController_1 = require("./AudioController");
const utils_1 = require("./utils");
const divPlaylist = document.querySelector(".playlist");
let controller = new AudioController_1.AudioController();
window.addEventListener("load", () => {
    fetch("./audio/audio.json").then(response => response.json().then(tracks => {
        let available_tracks = [];
        divPlaylist.innerHTML = "";
        for (let track of tracks) {
            available_tracks.push(new AudioWrapper_1.AudioWrapper(track));
            divPlaylist.innerHTML += (0, utils_1.createTracklistField)(track);
        } // end for loop
        controller.populate(available_tracks);
    }));
});
document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("track-overlay")) {
        const source = target.getAttribute("data-source");
        controller.playForSource(source);
    }
});
//# sourceMappingURL=app.js.map