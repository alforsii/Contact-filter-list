document.getElementById('filterInput').addEventListener('keyup', filterNames);
document.getElementById('name').addEventListener('submit', addName);
const a_z = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '#',
];
const arrOfNames = [].sort((a, b) => a - b);
function addName() {
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  //get ul
  let ul = document.getElementById('names');
  //create form
  let newContact = `<li class="collection-item"><a href="#">${name}</a></li>`;
}

function generateTag() {
  //get ul
  let ul = document.getElementById('names');
  //get li's
  let li = document.querySelectorAll('li.collection-item');
  a_z.forEach(letter => {
    let li = document.createElement('li');
    li.classList.add('collection-header');
    li.innerHTML = `<h5>${letter}</h5>`;
    ul.appendChild(li);
  });
}

function filterNames() {
  //get input value
  let filterValue = document.getElementById('filterInput').value.toUpperCase();
  //get ul
  let ul = document.getElementById('names');
  //get li's
  let li = document.querySelectorAll('li.collection-item');
  //loop thru collection-item li's
  for (let i = 0; i < li.length; i++) {
    //there's only one elem inside li, which is a tag
    // and li[i].getElementsByTagName('a') returns array [a], so it's in 0 position
    //let's grab it
    let a = li[i].getElementsByTagName('a')[0];
    //now we need to look innerText of each a tag if match
    let name = a.innerHTML.toUpperCase();
    //now we check for match, none match display none
    if (name.indexOf(filterValue) === -1) {
      li[i].style.display = 'none';
    } else {
      li[i].style.display = '';
    }
  }
  //let's do the same with header li's
  let headerLi = document.querySelectorAll('li.collection-header');
  for (let i = 0; i < headerLi.length; i++) {
    //there's only one elem inside headerLi, which is a tag
    // and headerLi[i].getElementsByTagName('h5') returns array [h5], so it's in 0 position
    //let's grab it
    let h5 = headerLi[i].getElementsByTagName('h5')[0];
    console.log('Output for: filterNames -> h5', h5);
    //now we need to look innerText of each a tag if match
    let indexName = h5.innerHTML;
    //now we check for match, none match display none
    if (indexName.indexOf(filterValue.substr(0, 1)) === -1) {
      headerLi[i].style.display = 'none';
    } else {
      headerLi[i].style.display = '';
    }
  }
}
function sortNames() {
  //get li's
  let li = document.querySelectorAll('li.collection-item');
  //1.Get all the names and push to arrOfNames above
  for (let i = 0; i < li.length; i++) {
    //there's only one elem inside li, which is a tag
    // and li[i].getElementsByTagName('a') returns array [a], so it's in 0 position
    //let's grab it
    let a = li[i].getElementsByTagName('a')[0];
    arrOfNames.push(a.innerHTML);
  }
  //2. Sort arrOfNames
  arrOfNames.sort((a, b) => {
    return a > b ? 1 : a < b ? -1 : 0;
  });
  //3.Replace a tag inner with sorted names
  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName('a')[0];
    // a.innerHTML = '';
    a.innerHTML = `${arrOfNames[i]}`;
  }
}
sortNames();
// generateTag();
