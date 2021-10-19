// Initiate the vaeriables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let animatedPlay = document.getElementById('animatedPlay');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let masterTime = document.getElementById('masterTime');
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    { songName: "Legion", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg", songDuration: "03:50" },
    { songName: "Song1", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpg", songDuration: "02:33" },
    { songName: "Song2", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpg", songDuration: "04:33" },
    { songName: "Song3", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg", songDuration: "04:27" },
    { songName: "Song4", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpg", songDuration: "03:28" },
    { songName: "Song5", filePath: "./songs/6.mp3", coverPath: "./covers/6.jpg", songDuration: "03:28" },
    { songName: "Song6", filePath: "./songs/7.mp3", coverPath: "./covers/7.jpg", songDuration: "04:33" },
    { songName: "Song7", filePath: "./songs/8.mp3", coverPath: "./covers/8.jpg", songDuration: "03:50" },
    { songName: "Song8", filePath: "./songs/9.mp3", coverPath: "./covers/9.jpg", songDuration: "03:28" },
    { songName: "Song9", filePath: "./songs/10.mp3", coverPath: "./covers/10.jpg", songDuration: "04:27" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    element.getElementsByClassName("time")[0].innerHTML = songs[i].songDuration;
});

// Handle Play Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        masterSongName.innerHTML = songs[songIndex].songName;
        masterTime.innerHTML = songs[songIndex].songDuration;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songItemPlay.forEach((element) => {
            if (element.id == songIndex) {
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
            }
        })
        animatedPlay.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        songItemPlay.forEach((element) => {
            if (element.id == songIndex) {
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
            }
        })
        animatedPlay.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            masterSongName.innerHTML = songs[songIndex].songName;
            masterTime.innerHTML = songs[songIndex].songDuration;
            audioElement.play();
            animatedPlay.style.opacity = 1;
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            animatedPlay.style.opacity = 0;
        }
    })
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterTime.innerHTML = songs[songIndex].songDuration;
    audioElement.play();
    animatedPlay.style.opacity = 1;
    songItemPlay.forEach((element) => {
        if (element.id == songIndex) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
        else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterTime.innerHTML = songs[songIndex].songDuration;
    audioElement.play();
    animatedPlay.style.opacity = 1;
    songItemPlay.forEach((element) => {
        if (element.id == songIndex) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
        else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    })
})

audioElement.addEventListener('ended', () => {
    document.getElementById('next').click();
})