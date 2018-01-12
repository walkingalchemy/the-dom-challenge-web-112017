let counter = document.querySelector("#counter")
let likes = document.querySelector(".likes")
let store = {}
let counting; //on purpose
let paused; // also on purpose
///////
function increment(){
  counter.innerText = parseInt(counter.innerText) + 1
}
function decrement(){
  counter.innerText = parseInt(counter.innerText) - 1
}

function like (event) {
  let like = document.createElement("li")
  if (store[counter.innerText]) {
    store[counter.innerText] += 1
    document.getElementById(`${counter.innerText}like`).innerText = `${counter.innerText} has been liked ${store[counter.innerText]} times.`
  } else {
    store[counter.innerText] = 1
    like.innerText = `${counter.innerText} has been liked ${store[counter.innerText]} times.`
    like.id = `${counter.innerText}like`
    likes.append(like)
  }
}

function comment(event) {
  event.preventDefault()
  if (!paused) {
    let comment = document.createElement("p")
    comment.innerText = `${document.querySelector(`input[type=text]`).value}`
    document.querySelector(`input[type=text]`).value = ''
    document.getElementById('list').append(comment)
  }
}

function pause() {
  if (paused) {
    unsetPaused()
  } else {
    setPaused()
  }
}

function unsetPaused() {
  // unset paused
  paused = false
  // change button text
  document.getElementById('pause').innerText = 'pause'
  // increment on interval
  counting = setInterval(increment, 1000)
  // increment on click
  document.getElementById('+').addEventListener("click", increment)
  //decrement on click
  document.getElementById('-').addEventListener("click", decrement)
  // create or increment likes
  document.getElementById('<3').addEventListener("click", like)

}



function setPaused() {
  // set paused
  paused = true
  // change button text
  document.getElementById('pause').innerText = 'resume'
  // stop increment on interval
  clearInterval(counting)
  // increment on click
  document.getElementById('+').removeEventListener("click", increment)
  //decrement on click
  document.getElementById('-').removeEventListener("click", decrement)
  // create or increment likes
  document.getElementById('<3').removeEventListener("click", like)
}


////////
document.addEventListener("DOMContentLoaded", function() {
  unsetPaused()
  // pause
  document.getElementById('pause').addEventListener("click", pause)
  // create comment
  document.getElementById('comment-form').addEventListener('submit', comment)

})
