const divPlaylist = <HTMLDivElement>document.querySelector(".playlist")
const divCurrentArtwork = <HTMLDivElement>document.querySelector("#current-artwork")
const pCurrentArtist = <HTMLParagraphElement>document.querySelector("#current-artist")
const pCurrentTrack = <HTMLParagraphElement>document.querySelector("#current-track")
const btnPlayPause = <HTMLButtonElement>document.querySelector("#play-pause")
const spanCurrentTime = <HTMLSpanElement>document.querySelector("#ct")
const spanTotalTime = <HTMLSpanElement>document.querySelector("#tt")

let current_audio = new Audio()
let available_tracks: any[] = []

function formatSeconds(seconds : number) : string {
    const mm = parseInt(String(seconds / 60))
    const ss = parseInt(String(seconds % 60)) 

    return `${(mm<10?"0":"") + mm}:${(ss<10 ? "0":"") + ss}`
}


window.addEventListener("load", () => {
    fetch("./audio/audio.json").then( response =>
        response.json().then( tracks => {
            available_tracks = tracks
            divPlaylist.innerHTML = ""
            for(let track of tracks) {
                divPlaylist.innerHTML += `
                <div class="track-container">
                    <div class="track-overlay"
                    data-source="${track.source}"
                    data-artist="${track.artist}"
                    data-cover="${track.cover}"
                    data-track="${track.track}"
                    ></div>
                    <div class="thumbnail">
                        <img src="${track.cover}">
                    </div>
                    <div class="track-info">
                        <p class="artist">${track.artist}</p>
                        <p class="track-name">${track.track}</p>
                    </div>
                </div>
                `
            }
        })
    )
})

document.body.addEventListener("click", (event) => {
    const target = <HTMLElement>event.target
    if(target.classList.contains("track-overlay")) {
        const source = <string>target.getAttribute("data-source")
        const artist = <string>target.getAttribute("data-artist")
        const track = <string>target.getAttribute("data-track")
        const cover = <string>target.getAttribute("data-cover")

        pCurrentArtist.innerHTML = artist 
        pCurrentTrack.innerHTML = track 
        divCurrentArtwork.innerHTML = `<img src="${cover}" />`

        if(!current_audio.paused) {
            current_audio.pause()
        }

        current_audio = new Audio(source)
        current_audio.addEventListener("loadedmetadata", () => {
            spanTotalTime.innerHTML = formatSeconds(current_audio.duration)
            current_audio.play()
            btnPlayPause.innerHTML = "<i class='icon-pause'></i>"
            btnPlayPause.setAttribute("data-state", "playing")
        })
        current_audio.addEventListener("timeupdate", () => {
            spanCurrentTime.innerHTML = formatSeconds(current_audio.currentTime)
        })
    }
})

btnPlayPause.addEventListener("click", () => {
    const state = btnPlayPause.getAttribute("data-state")
    if(current_audio.currentSrc == undefined ||
        current_audio.currentSrc == "" ||
        current_audio.currentSrc == null) {
            current_audio = new Audio(available_tracks[0].source)
            pCurrentArtist.innerHTML = available_tracks[0].artist 
            pCurrentTrack.innerHTML = available_tracks[0].track 
            divCurrentArtwork.innerHTML = 
            `<img src="${available_tracks[0].cover}" />`

            current_audio.addEventListener("loadedmetadata", () => {
                spanTotalTime.innerHTML = formatSeconds(current_audio.duration)
                current_audio.play()
                btnPlayPause.innerHTML = "<i class='icon-pause'></i>"
                btnPlayPause.setAttribute("data-state", "playing")
            })
            current_audio.addEventListener("timeupdate", () => {
                spanCurrentTime.innerHTML = formatSeconds(current_audio.currentTime)
            })
        }

    if(state == "playing") {
        current_audio.pause()
        btnPlayPause.innerHTML = "<i class='icon-play'></i>"
        btnPlayPause.setAttribute("data-state", "paused")
    } else {
        current_audio.play()
        btnPlayPause.innerHTML = "<i class='icon-pause'></i>"
        btnPlayPause.setAttribute("data-state", "playing")
    }
})

