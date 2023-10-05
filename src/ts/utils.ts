export function createTracklistField(track : any) : string {
    return `
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

export function formatSeconds(seconds : number) : string {
    const mm = parseInt(String(seconds / 60))
    const ss = parseInt(String(seconds % 60)) 

    return `${(mm<10?"0":"") + mm}:${(ss<10 ? "0":"") + ss}`
}
