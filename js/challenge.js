//counter
//plus and minus for manual counter input
//like button, display for total likes PER NUMBER on counter
//comment box, displays previous comments
//pause button

let counterGlobal = 0; //use onload to grab from local storage if you like
const likeArray = [0];
let currentSecond = 0;
let paused = false;

function increment(){
  if (!paused) {
    updateUI();
    counterGlobal++;
    currentSecond = counterGlobal;
    if (likeArray.length === counterGlobal) {likeArray.push(0);}
  }
}

document.getElementById("plus").addEventListener("click", overrideIncrement);
function overrideIncrement() {
  if (!paused) {
    updateUI();
    counterGlobal++;
    currentSecond = counterGlobal;
    if(likeArray.length <= counterGlobal) {likeArray.push(0);}
  }
}

document.getElementById("minus").addEventListener("click", decrement)
function decrement() {
  if (!paused) {
    updateUI();
    if (counterGlobal > 0){counterGlobal--;}
    currentSecond = counterGlobal;
  }
}

document.getElementById("heart").addEventListener("click", like);
function like(){
  if (!paused) {
    likeArray[currentSecond] += 1;
    updateUI();
  }
}

function updateUI() {
  document.getElementById("counter").innerText = currentSecond;
  let likes = likeArray[currentSecond];
  likeList = document.querySelector(".likes");
  let likeInstance = likeList.children[currentSecond];
  if (likeInstance === undefined) {
    likeInstance = document.createElement("li");
    likeList.appendChild(likeInstance);
  }
  likeInstance.innerText = `number: ${currentSecond}, likes for that number: ${likes}`;
}

document.getElementById("comment-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const commentValue = event.target.children[0].value;
  const commentLocation = document.createElement("li");
  commentLocation.innerText = commentValue;
  document.getElementById("list").appendChild(commentLocation);
});

intervalID = setInterval(increment, 1000);

document.getElementById("pause").addEventListener("click", pauseUnpause);
function pauseUnpause() {
  let pauseButton = document.getElementById("pause");
  let isPaused = pauseButton.innerText;
  if (isPaused === "pause") {
    paused = true;
    pauseButton.innerText = "resume";
    clearInterval(intervalID);
  }
  else {
    paused = false;
    pauseButton.innerText = "pause"
    intervalID = setInterval(increment, 1000);    
  }
}