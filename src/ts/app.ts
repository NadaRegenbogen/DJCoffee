import { AudioWrapper } from './AudioWrapper';
import { AudioController } from './AudioController';
import { createTracklistField } from './utils'

const divPlaylist = <HTMLDivElement>document.querySelector(".playlist")
let controller : AudioController = new AudioController()

window.addEventListener("load", () => {
    fetch("./audio/audio.json").then( response =>
          response.json().then( tracks => {
        let available_tracks : AudioWrapper[] = []
            divPlaylist.innerHTML = ""
            for(let track of tracks) {
                available_tracks.push(new AudioWrapper(track))
                divPlaylist.innerHTML += createTracklistField(track)
            } 
            controller.populate(available_tracks)
        })
    )
})

document.body.addEventListener("click", (event) => {
    const target = <HTMLElement> event.target
    if(target.classList.contains("track-overlay")) {
    const source = <string>target.getAttribute("data-source")
    controller.playForSource(source)
    }
})

