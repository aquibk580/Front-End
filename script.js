console.log("Welcome to spotify");
// Initialize the varaibles
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {SongName: "Moye moye" , filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {SongName: "Tera Mera" , filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {SongName: "Let me" , filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {SongName: "Jaane vo" , filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {SongName: "Vrdaan" , filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {SongName: "Tu hai kaha" , filePath: "songs/6.mp3", coverPath: "covers/6.jpg"}
]
songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
})
// audioElement.play();

//Media play/pause click
masterPlay.addEventListener('click',()=>{
   if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
   }
   else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle')
    masterPlay.classList.add('fa-play-circle')
    gif.style.opacity = 0;
   }
})
//Liten to events
audioElement.addEventListener('timeupdate', ()=>{
     //update seekbar
     progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
     myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
     })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
  element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
  })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5)
    {
        songIndex = 0;
    }
    else{
       songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex = 0;
    }
    else{
       songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-play-circle');
    masterPlay.classList.remove('fa-pause-circle');
})
