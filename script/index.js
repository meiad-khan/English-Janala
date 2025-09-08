const loadLessons = ()=>{
  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then(res => res.json())
  .then(json => displayLessons(json.data))
}


const loadLevelWords = (id)=>{
  const url = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayWords(data.data));
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
      <div><button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF75]"><i class="fa-solid fa-circle-info"></i></button></div>
      <div><button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF75]"><i class="fa-solid fa-volume-high"></i></button></div>
    </div>

    </div>
  `;
  wordContainer.appendChild(wordCard);


})
}


const displayLessons = (lessons) =>{
// console.log(lessons);
const levelContainer = document.getElementById("level-container");
// levelContainer.innerHTML = '';
for(let lesson of lessons){
  // console.log(lesson);
  const btnDiv = document.createElement('div');
  btnDiv.innerHTML =`
  <button onclick = "loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary">
  <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
  </button>
  `;
  levelContainer.appendChild(btnDiv);
  // console.log(btnDiv);
}
}
loadLessons();