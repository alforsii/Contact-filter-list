document.getElementById('filterInput').addEventListener('keyup', filterNames);
document.querySelector('.btn').addEventListener('click', addName);
let arrOfNames = [];
let contacts = [];
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
//Local Storage
class Storage {
  //1 Save all names to a local storage for reuse
  static saveNames(names) {
    //localStorage.setItem(nameOfSavingVariable,JSON.stringify(names))
    //need to stringify to JSON to save and obviously JSON.parse(toParseJsonSting)
    localStorage.setItem('contacts', JSON.stringify(names));
  }
  //2 Get the name by id from local storage that we saved
  static getNames() {
    return localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : [];
  }
}
function addName() {
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  //create tag and add the name to it
  if (name !== '') {
    saveToContacts(name, phone);
    document.getElementById('names').innerHTML = '';
    createHeader();
    displayNames();
    // generateTag(name);
  }
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
}
function createHeader() {
  let ul = document.getElementById('names');
  let innerUlH5 = document.querySelectorAll('.collection-header h5');
  for (let i = 0; i < a_z.length; i++) {
    if (innerUlH5[i] === undefined) {
      let newUl = document.createElement('ul');
      newUl.classList.add('collection-header');
      newUl.style.display = 'none';
      newUl.innerHTML = `<h5>${a_z[i]}</h5>`;
      ul.appendChild(newUl);
    }
  }
}

function saveToContacts(name, phone) {
  contacts = [...contacts, { name, phone }];
  Storage.saveNames(contacts);
}

// function generateTag(val) {
//   let innerUlH5 = document.querySelectorAll('.collection-header h5');
//   for (let i = 0; i < innerUlH5.length; i++) {
//     if (innerUlH5[i].innerHTML === val.substr(0, 1).toUpperCase()) {
//       let newLi = document.createElement('li');
//       newLi.classList.add('collection-item');
//       newLi.innerHTML = `<a href="#">${val}</a>`;
//       innerUlH5[i].parentElement.appendChild(newLi);
//       innerUlH5[i].parentElement.style.display = '';
//       return;
//     }
//   }
//   sortNames();
// }

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
    name.indexOf(filterValue) === -1
      ? (li[i].style.display = 'none')
      : (li[i].style.display = '');
  }
  //let's do the same with header li's
  let indexH5 = document.querySelectorAll('ul.collection-header h5');
  for (let i = 0; i < indexH5.length; i++) {
    let indexName = indexH5[i].innerHTML;
    //now we check for match, none match display none
    indexName.indexOf(filterValue.substr(0, 1)) === -1
      ? (indexH5[i].style.display = 'none')
      : (indexH5[i].style.display = '');
  }
}
function sortNames() {
  //get li's
  let aTag = document.querySelectorAll('li.collection-item a');
  //1.Get all the names and push to arrOfNames above
  if (aTag.length > 1) {
    for (let i = 0; i < aTag.length; i++) arrOfNames.push(aTag[i].innerHTML);
    //2. Sort arrOfNames
    arrOfNames.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    //3.Replace a tag inner with sorted names
    for (let i = 0; i < aTag.length; i++)
      aTag[i].innerHTML = `${arrOfNames[i]}`;
  }
  //   console.log('Output for: sortNames -> arrOfNames', arrOfNames);
  arrOfNames = [];
}

// sortNames();
// generateTag();
function displayNames() {
  //get names
  let allNames = contacts; // Storage.getNames();
  let innerUlH5 = document.querySelectorAll('.collection-header h5');
  console.log('Output for: displayNames -> allNames', allNames);
  if (allNames.length > 0) {
    for (let i = 0; i < allNames.length; i++) {
      // if( ul.length >1) ul
      for (let j = 0; j < innerUlH5.length; j++) {
        if (
          innerUlH5[j].innerHTML === allNames[i].name.substr(0, 1).toUpperCase()
        ) {
          let newLi = document.createElement('li');
          newLi.classList.add('collection-item');
          newLi.innerHTML = `<a href="#">${allNames[i].name}</a>`;
          innerUlH5[j].parentElement.appendChild(newLi);
          innerUlH5[j].parentElement.style.display = '';
        }
      }
    }
  }
}
window.addEventListener('load', () => {
  //after window load assign contact with sorted array from localStorage that was saved
  contacts = Storage.getNames().sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name < b.name ? -1 : 0
  );
  createHeader();
  displayNames();
});
