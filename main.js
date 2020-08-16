const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const apiURL = 'https://api.lyrics.ovh';

form.addEventListener('submit', e=>{
    e.preventDefault();
    searchValue = search.value.trim();
    
    if (!searchValue) {
        alert('There is nothing');
    }
    else{
        searchSong(searchValue);
    }
})

 async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    showData(data);

}

function showData(data) {
    console.log(data);
    result.innerHTML = `
    <ul class="song-list">
    ${data.data.slice(0,10).map(song => `<li>
                        <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success"> <span data-artist="${song.artist.name}" data-songTitle="${song.title}"> Get Lyrics </span> </button>
                    </div>
                </div>
                </li>
    `).join('')
}
    `
}

result.addEventListener("click", e=>{
    const clickedElement = e.target;
    if (clickedElement.tagName === "span" || "button") {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json(); 
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    console.log(lyrics);

     result.innerHTML =    ` <div class="single-lyrics text-center">
                                 <h2 class="text-success mb-4"><strong>${songTitle}</strong><br>- ${artist}</h2>
                                 <pre class="lyric text-white">${lyrics}</pre>
                             </div>
                             `
}