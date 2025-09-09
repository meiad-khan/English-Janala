const loadLessons = ()=>{
  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then(res => res.json())
  .then(json => displayLessons(json.data))
}


const removeActive = ()=>{
  const buttons = document.querySelectorAll(".lesson-btn");
  // console.log(buttons);
  buttons.forEach(btn=>{
    btn.classList.remove("active");
  })
}


const manageSpinner = (status)=>{
  if(status){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  }else{
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}


const loadLevelWords = (id)=>{
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    removeActive();
    const btnClicked = document.getElementById(`btn-lesson-${id}`);
    btnClicked.classList.add("active");
    displayWords(data.data)
  });
}



const loadWordDetail = async(id) =>{
  const url =  `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  // console.log(details.data);
  displayWordDetails(details.data);
}


// {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }


const createElement = (arr)=>{
  const htmlElements = arr.map(el => `<span class ="btn">${el}</span>`);
  return (htmlElements.join(" "));
}

const displayWordDetails = (word) =>{
  // console.log(word);
  const modalContainer = document.getElementById('modal-container');
  // console.log(modalContainer);
  modalContainer.innerHTML=`
    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
    <h3 class="text-xl font-semibold">Meaning</h3>
    <p>${word.meaning}</p>
    <p class="text-xl font-semibold">Example</p>
    <p>${word.sentence} </p>
    <p>সমার্থক শব্দ গুলো</p>
    <div class ="flex items-center gap-2">
    ${createElement(word.synonyms)}
    </div>
  `;
  // <span class="btn">${word.synonyms[0]} </span>
  //   <span class="btn">${word.synonyms[1]}</span>
  //   <span class="btn">${word.synonyms[2]}</span>

  document.getElementById('my_modal_5').showModal();
}

const displayWords = (words)=>{
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  if(words.length === 0){
    wordContainer.innerHTML = `
    <div class="text-center col-span-full space-y-6 font-bangla">
      <img src="assets/alert-error.png" alt="" class="mx-auto">
      <p class="text-3xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="text-5xl font-bold ">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    manageSpinner(false);
    return;
  }
// console.log(words);
words.forEach(word =>{
  // console.log(word);
  const wordCard = document.createElement('div');
  wordCard.innerHTML=`
  <div class="bg-white py-10 px-9 text-center space-y-4 rounded-xl shadow-sm">
      <h2 class="font-bold text-2xl">${word.word? word.word:"শব্দ পাওয়া যায়নি"}</h2>
    <p class="font-semibold text-xl">Meaning /Pronounciation</p>
    <h3 class="font-bangla text-2xl font-medium">"${word.meaning? word.meaning:"শব্দ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation: "pronunciation পাওয়া যায়নি"}"</h3>
    <div class="flex justify-between items-center">
      <div><button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF75]"><i class="fa-solid fa-circle-info"></i></button></div>
      <div><button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF75]"><i class="fa-solid fa-volume-high"></i></button></div>
    </div>

    </div>
  `;
  wordContainer.appendChild(wordCard);
})
manageSpinner(false);
}


const displayLessons = (lessons) =>{
// console.log(lessons);
const levelContainer = document.getElementById("level-container");
// levelContainer.innerHTML = '';
for(let lesson of lessons){
  // console.log(lesson);
  const btnDiv = document.createElement('div');
  btnDiv.innerHTML =`
  <button id="btn-lesson-${lesson.level_no}" onclick = "loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
  <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
  </button>
  `;
  levelContainer.appendChild(btnDiv);
  // console.log(btnDiv);
}
}
loadLessons();