const songs = [
    {
        title: "WthYou",
        artist: "Linkin Park",
        cover: "assets/cover.jpg",
        src: "assets/1.mp3",
      },
      {
          title: "Heart-Shaped Box",
          artist: "Nirvana",
          cover: "assets/cover2.jpg",
          src: "assets/2.mp3",
        }
  ];
  
  let currentSongIndex = 0;
  let isPlaying = false;
  const audio = new Audio();
  
  const songTitle = document.getElementById("songTitle");
  const artistName = document.getElementById("artistName");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.querySelector(".progress-bar");
  const progressContainer = document.querySelector(".progress-container");
  const vinylCover = document.querySelector(".vinyl-cover");
  const vinylContainer = document.querySelector(".vinyl-container");
  
  function loadSong(song) {
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    vinylCover.src = song.cover;
    audio.src = song.src;
  }
  
  function playSong() {
    isPlaying = true;
    audio.play();
    playPauseBtn.textContent = "Pause";
    document.querySelector(".vinyl").style.animationPlayState = "running";
  }
  
  function pauseSong() {
    isPlaying = false;
    audio.pause();
    playPauseBtn.textContent = "Play";
    document.querySelector(".vinyl").style.animationPlayState = "paused";
  }
  
  function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
  }
  
  function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
  }
  
  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  }
  

  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) pauseSong();
    else playSong();
  });
  
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgressBar);
  audio.addEventListener("ended", nextSong);
  

  progressContainer.addEventListener("click", (e) => {
    const progressWidth = progressContainer.clientWidth;
    const clickPosition = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickPosition / progressWidth) * duration;
  });
  

  vinylContainer.addEventListener("mouseenter", () => {
    console.log("Hovering over vinyl container");
  });
  
  vinylContainer.addEventListener("mouseleave", () => {
    console.log("Stopped hovering over vinyl container");
  });
  

  loadSong(songs[currentSongIndex]);