document.getElementById('filterInput').addEventListener('keyup', filterNames);
const arrOfNames = [];

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
  for (let i = 0; i < aTag.length; i++) arrOfNames.push(aTag[i].innerHTML);
  //2. Sort arrOfNames
  arrOfNames.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  //3.Replace a tag inner with sorted names
  for (let i = 0; i < aTag.length; i++) aTag[i].innerHTML = `${arrOfNames[i]}`;
}
sortNames();
