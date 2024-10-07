let myFriends = [
    {
      thName: "Moahmed",
      age: 23,
      title: "React Developer",
      is_available: false,
      skills: ["❌React-Router-Dom", "❌React Fiber"],
    },
    {
      thName: "Mohamed",
      age: 23,
      title: "React Developer",
      is_available: true,
      skills: ["React-Router-Dom", "React Fiber✅ "],
    },
    {
      thName: "Moahmed",
      age: 23,
      title: "React Developer",
      is_available: true,
      skills: ["React-Router-Dom ✅", "React Fiber"],
    },
];

// Loop through the array using forEach
myFriends.forEach(({ thName, title, is_available, skills }) => {
  console.log(`Name: ${thName}`);
  console.log(`Title: ${title}`);
  
  // Check if is_available is true, then print skills
  if (is_available) {
    console.log(`Skills: ${skills.join(", ")}`);
  }
  
  console.log('-------------------');
});



/////////////////////////////////////////////////////////////////




const audio = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause");
const stopButton = document.getElementById("stop");
const swapButton = document.getElementById("swap");
const loopButton = document.getElementById("loop");
const shuffleButton = document.getElementById("shuffle");
const fasterButton = document.getElementById("faster");
const slowerButton = document.getElementById("slower");
const volumeControl = document.getElementById("volume");
const fileInput = document.getElementById("file-input");
const trackList = document.getElementById("track-list");

let sounds = [];
let currentSoundIndex = 0;
let isPlaying = false;
let isLooping = false;

const dbRequest = indexedDB.open("MP3PlayerDB", 1);

dbRequest.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore("mp3files", { keyPath: "name" });
};


// Function to clear all tracks from IndexedDB
const clearAllTracks = (db) => {
  const transaction = db.transaction("mp3files", "readwrite");
  const store = transaction.objectStore("mp3files");
  const clearRequest = store.clear(); // This clears the entire store

  clearRequest.onsuccess = () => {
    sounds = [];  // Clear in-memory sounds array as well
    renderTrackList();  // Update the UI
  };
};

// On DB open success
dbRequest.onsuccess = (event) => {
  const db = event.target.result;

  // Clear all tracks every time the page is loaded
  clearAllTracks(db); 

  // Load the stored tracks (which will now be empty)
  loadStoredTracks(db);
};

// Destructuring assignment for state variables
const getState = () => {
  const [currentSound, volume, playbackRate] = [sounds[currentSoundIndex], audio.volume, audio.playbackRate];
  return { currentSound, volume, playbackRate };
};

// Load stored tracks from IndexedDB
const loadStoredTracks = (db) => {
  const transaction = db.transaction("mp3files", "readonly");
  const store = transaction.objectStore("mp3files");
  const request = store.getAll();

  request.onsuccess = () => {
    sounds = request.result;
    renderTrackList();
  };
};

// Save MP3 file to IndexedDB (Fixing Transaction Issue)
const saveTrackToIndexedDB = (file, db) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const mp3Data = {
      name: file.name,
      data: reader.result,
    };

    // Transaction moved inside the onload event to keep it active
    const transaction = db.transaction("mp3files", "readwrite");
    const store = transaction.objectStore("mp3files");
    store.add(mp3Data);

    sounds.push(mp3Data);  // Add to in-memory sounds array
    renderTrackList();  // Update UI
  };
};

// Load the MP3 file from user upload
fileInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  const db = dbRequest.result;

  files.forEach(file => {
    saveTrackToIndexedDB(file, db);
  });
});

// Render the track list in the UI
const renderTrackList = () => {
  trackList.innerHTML = "";
  sounds.forEach((sound, index) => {
    const li = document.createElement("li");
    li.textContent = sound.name;
    li.addEventListener("click", () => playSelectedTrack(index));
    trackList.appendChild(li);
  });
};

const playSelectedTrack = (index) => {
  currentSoundIndex = index;
  const { currentSound } = getState();
  if (currentSound) {
    audio.src = currentSound.data;
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = "Pause";
  }
};

// Play or pause the sound
playPauseButton.addEventListener("click", () => {
  if (!isPlaying) {
    const { currentSound } = getState();
    if (currentSound) {
      audio.src = currentSound.data;
      audio.play();
      playPauseButton.textContent = "Pause";
      isPlaying = true;
    }
  } else {
    audio.pause();
    playPauseButton.textContent = "Play";
    isPlaying = false;
  }
});

// Stop the sound
stopButton.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  playPauseButton.textContent = "Play";
});

// Swap between two sounds
swapButton.addEventListener("click", () => {
  if (sounds.length > 0) {
    currentSoundIndex = (currentSoundIndex + 1) % sounds.length;
    const { currentSound } = getState();
    if (isPlaying && currentSound) {
      audio.src = currentSound.data;
      audio.play();
    }
  }
});

// Toggle looping
loopButton.addEventListener("click", () => {
  isLooping = !isLooping;
  audio.loop = isLooping;
  loopButton.textContent = `Loop: ${isLooping ? "On" : "Off"}`;
});

// Shuffle play (random sound)
shuffleButton.addEventListener("click", () => {
  if (sounds.length > 0) {
    currentSoundIndex = Math.floor(Math.random() * sounds.length);
    const { currentSound } = getState();
    if (isPlaying && currentSound) {
      audio.src = currentSound.data;
      audio.play();
    }
  }
});

// Speed up the sound
fasterButton.addEventListener("click", () => {
  audio.playbackRate += 0.1;
});

// Slow down the sound
slowerButton.addEventListener("click", () => {
  audio.playbackRate = Math.max(0.1, audio.playbackRate - 0.1);
});

// Volume control
volumeControl.addEventListener("input", (e) => {
  const volume = e.target.value;
  audio.volume = volume;
});

// Auto-play the next track when the current one ends
audio.addEventListener("ended", () => {
  if (!isLooping) {
    currentSoundIndex = (currentSoundIndex + 1) % sounds.length;  // Increment the track index
    if (sounds[currentSoundIndex]) {
      const { currentSound } = getState();
      audio.src = currentSound.data;  // Load the next track
      audio.play();  // Automatically play the next track
      playPauseButton.textContent = "Pause";
    } else {
      isPlaying = false;
      playPauseButton.textContent = "Play";
    }
  }
});



