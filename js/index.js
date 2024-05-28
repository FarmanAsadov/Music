document.addEventListener("DOMContentLoaded", function () {
  const musicContainer = document.getElementById("music-container");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const audio = document.getElementById("audio");
  const progress = document.getElementById("progress");
  const progressContainer = document.getElementById("progress-container");
  const title = document.getElementById("title");
  const cover = document.getElementById("cover");
  const currTime = document.getElementById("currTime");
  const durTime = document.getElementById("durTime");
  const volume = document.querySelector(".volume");
  const suffle = document.querySelector("#suffle");
  const repeat = document.querySelector("#repeat");

  // Song titles
  const songs = [
    "Xpert & Şəfiqə Axundova - Və bir də",
    "Nermine Memmedova - Ay Işığında",
    "MadTeen x RƏSSAM - Mən istədim",
    "Həsrətindən - Şəfiqə Axundova",
    "Epi - BirGünPrezidentOlsam",
    "Epi  Əkbər Novruzlu",
    "MC B.U.S - Piramida (Official Audio)",
    "Xpert - Sarışan Hallar (Official Music Video)",
    "Paster  Easy Job",
    "Rüzgar - Yenə Gedirəm",
  ];

  // default, initial index
  let songIndex = Math.floor(Math.random() * songs.length);

  loadSong(songs[songIndex]);

  function loadSong(songName) {
    title.innerText = songName;
    audio.src = `music/${songName}.mp3`;
    cover.src = `images/${songName}.jpg`;
  }

  playBtn.addEventListener("click", () => {
    let isPlaying = musicContainer.classList.contains("play");

    isPlaying ? pauseSong() : playSong();
  });

  function playSong() {
    // visual
    musicContainer.classList.add("play");
    playBtn.querySelector("svg").classList.remove("fa-play");
    playBtn.querySelector("svg").classList.add("fa-pause");

    // action
    audio.play();
  }

  function pauseSong() {
    // visual
    musicContainer.classList.remove("play");
    playBtn.querySelector("svg").classList.add("fa-play");
    playBtn.querySelector("svg").classList.remove("fa-pause");

    // action
    audio.pause();
  }

  // prev music
  function prevSong() {
    songIndex--;

    if (songIndex < 0) songIndex = songs.length - 1;

    loadSong(songs[songIndex]);

    playSong();
  }

  // next music
  function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) songIndex = 0;

    loadSong(songs[songIndex]);

    playSong();
  }

  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);

  // progress music
  audio.addEventListener("timeupdate", updateProgress);

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  progressContainer.addEventListener("click", setProgress);

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  audio.addEventListener("ended", nextSong);

  // music time
  audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const minutesCurrent = Math.floor(currentTime / 60);
    const secondsCurrent = Math.floor(currentTime % 60);
    const minutesTotal = Math.floor(duration / 60);
    const secondsTotal = Math.floor(duration % 60);

    currTime.textContent = `${minutesCurrent}:${String(secondsCurrent).padStart(
      2,
      "0"
    )}`;

    durTime.textContent = `${minutesTotal}:${String(secondsTotal).padStart(
      2,
      "0"
    )}`;
  });

  // volume
  volume.addEventListener("input", () => {
    audio.volume = volume.value;
    console.log(audio.volume);
  });

  // suffle
  suffle.addEventListener("click", () => {
    const random = Math.floor(Math.random() * songs.length);

    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[random]);

    songIndex++;

    playSong();
  });

  // repeat
  repeat.addEventListener("click", () => {
    loadSong(songs[songIndex]);

    playSong();
  });
});
