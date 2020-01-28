document.getElementById('filterInput').addEventListener('keyup', filterNames);
document.getElementById('name').addEventListener('submit', addName);

function addName() {
  let name = document.getElementById('name').value;
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
}
