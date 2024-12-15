// script.js
const tracks = [
    {
        title: "Jatt Mehkama",
        artist: "Yo Yo Honey Singh",
        src: "media/Jatt Mehkma.mp3",
        image: "images/jutt-mehkama-song.jpg"
    },
    {
        title: "52 Bars",
        artist: "Karan Aujla",
        src: "media/52 Bars - (Raag.Fm).mp3",
        image: "images/52-bars-song.jpg"
    },
    {
        title: "Don't Look",
        artist: "Karan Aujla",
        src: "media/Dont Look.mp3",
        image: "images/dont-look-song.jpg"
    },
    {
        title: "IDK How",
        artist: "Karan Aujla",
        src: "media/Idk How - (Raag.Fm).mp3",
        image: "images/IDK-how-song.jpg"
    },
    {
        title: "Lalkara",
        artist: "Diljit Dosanjh ",
        src: "media/Lalkara - (Raag.Fm).mp3",
        image: "images/lalkara-song.jpg"
    },
    {
        title: "On Top 2",
        artist: "Karan Aujla",
        src: "media/On Top 2 - (Raag.Fm).mp3",
        image: "images/on-top2-song.jpg"
    },
    {
        title: "Sifar Safar",
        artist: "Karan Aujla",
        src: "media/Sifar Safar - (Raag.Fm).mp3",
        image: "images/sifar-safar-song.jpg"
    },
    {
        title: "Wavy",
        artist: "Karan Aujla",
        src: "media/Wavy - (Raag.Fm).mp3",
        image: "images/wavy-song.jpg"
    },
    {
        title: "Winning Speech",
        artist: "Karan Aujla",
        src: "media/Winning Speech - (Raag.Fm).mp3",
        image: "images/winning-speech-song.jpg"
    },
        {
        title: "YKWIM",
        artist: "Karan Aujla",
        src: "media/Ykwim - (Raag.Fm).mp3",
        image: "images/YKWIM-song.jpg"
    }
];
let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeBar = document.getElementById("volume-bar");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const trackImage = document.getElementById("track-image");

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackImage.src = track.image;
}

function playPauseTrack() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶️";
    } else {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = "⏸";
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playPauseTrack();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playPauseTrack();
}

playPauseBtn.addEventListener("click", playPauseTrack);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});

window.onload = () => loadTrack(currentTrackIndex);


// Reference to the playlist container
const playlistContainer = document.getElementById("playlist");

// Function to dynamically create playlist
function populatePlaylist() {
    tracks.forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${track.title} - ${track.artist}`;
        li.classList.add("playlist-item");

        // Add click event to play the selected track
        li.addEventListener("click", () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playPauseTrack();
        });

        playlistContainer.appendChild(li);
    });
}

// Call the function to populate the playlist on page load
window.onload = () => {
    loadTrack(currentTrackIndex);
    populatePlaylist();
};

