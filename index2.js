let contacts = [];
document.querySelector('.btn').addEventListener('click', addName);
document.getElementById('filterInput').addEventListener('keyup', filterNames);
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

// 1. On load window get the contacts list from the local storage, assign contacts array from storage array list if any, create index header tags  and display all existing contacts
window.addEventListener('load', () => {
  //1.after window load assign contact with array from localStorage that was saved
  contacts = Storage.getNames();
  //2.create index header
  createHeader();
  //3.Display if any names in the storage
  displayNames();
  //4. Delete contacts
  const btns = document.querySelectorAll('.btn-danger');
  console.log('Output for: contacts', contacts);
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', deleteContact);
  }
});

//Local Storage
class Storage {
  // 1.Save all names to a local storage for reuse
  //localStorage.setItem(nameOfSavingVariable,JSON.stringify(array))
  //need to stringify to JSON to save and obviously JSON.parse(toParseJsonSting)
  static saveNames(names) {
    localStorage.setItem('contacts', JSON.stringify(names));
  }
  // 2.Get the names from local storage that we saved
  static getNames() {
    return localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : [];
  }
}

// Save, reset and display
function addName() {
  //1.Get input value
  const name = document.getElementById('name').value,
    phone = document.getElementById('phone').value;
  if (name !== '') {
    //2.If (name ) save it to contacts
    saveToContacts(name, phone, getId());
    //3.and reset contact list to none
    document.getElementById('names').innerHTML = '';
    //4.create new index headers
    createHeader();
    //5.and then display names
    displayNames();
  }
  //6. Reset input value to none
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
}

//get id
function getId() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

//Creates  <ul class="collection-header"> <h5> a_z[i] </h5> </ul>
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

// Reassigns contacts array above by adding a new contact, and Saves the created contact name and phone number to the localStorage
function saveToContacts(name, phone, _id) {
  contacts = [...contacts, { name, phone, _id }];
  Storage.saveNames(contacts);
}

// Filters Contacts list when is typed in the search input
function filterNames() {
  //get input value
  let filterValue = document.getElementById('filterInput').value.toUpperCase();
  //get li's
  let li = document.querySelectorAll('li.collection-item');
  //loop thru collection-item - li's
  for (let j = 0; j < li.length; j++) {
    //there's only one elem inside li, which is a tag
    // and li[i].getElementsByTagName('a') returns array [a], so it's in 0 position
    //let's grab it
    let a = li[j].getElementsByTagName('a')[0];
    //now we need to look innerText of each a tag if match
    let name = a.innerHTML.toUpperCase();
    //now we check for match,if no match display none, else remove display none
    name.indexOf(filterValue) === -1
      ? (li[j].style.display = 'none')
      : (li[j].style.display = '');
  }
  //let's do the same with header h5
  let indexH5 = document.querySelectorAll('ul.collection-header h5');
  for (let i = 0; i < indexH5.length; i++) {
    let indexName = indexH5[i].innerHTML; //it's already upperCase
    //now we check for match, none match display none
    indexName.indexOf(filterValue.substr(0, 1)) === -1
      ? (indexH5[i].style.display = 'none')
      : (indexH5[i].style.display = '');
  }
}

// Displays contacts from localStorage
function displayNames() {
  //index header
  let innerUlH5 = document.querySelectorAll('.collection-header h5');
  //get names
  let allNames = contacts.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name < b.name ? -1 : 0
  ); // Storage.getNames();
  //   console.log('Output for: displayNames -> allNames', allNames);
  if (allNames.length > 0) {
    for (let i = 0; i < allNames.length; i++) {
      //second loop looks for every name right place in innerUlH5.parentElement by matching it's first letters with the index headers. For example if innerUlH5 which is H5 tag innerText -if it's A and name starts with A or a will be inserted to that parent of <h5>.
      for (let j = 0; j < innerUlH5.length; j++) {
        if (
          innerUlH5[j].innerHTML === allNames[i].name.substr(0, 1).toUpperCase()
        ) {
          let newLi = document.createElement('li');
          newLi.classList.add('collection-item');
          newLi.innerHTML = `
          <a href="#">${allNames[i].name}</a>
          <button id="${allNames[i]._id}" class="btn btn-danger">Delete</button>`;
          innerUlH5[j].parentElement.appendChild(newLi);
          innerUlH5[j].parentElement.style.display = '';
        }
      }
    }
  }
}

// Delete and Update
function deleteContact(e) {
  // console.log(e.target);
  contacts = contacts.filter(contact => contact._id !== e.target.id);
  e.target.parentElement.remove();
  Storage.saveNames(contacts);
}
