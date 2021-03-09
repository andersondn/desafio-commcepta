
// const init = {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     mode: 'cors',
//     cache: 'default'
// }

// let request = new Request(, init)

function loadData() {
  return new Promise((resolve, reject) => {
    fetch('./data/dados.json')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));

  })

}


function showData(data) {
  //  console.log(data)
  var app = document.querySelector('#result');
  app.innerHTML = '<ul>' + data.map(function (wizard) {
    return '<li>' + wizard.nome + '</li>';
  }).join('') + '</ul>';
}


document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadData()
  // showData(data)
  console.log(data)


  let navBarToggle = document.querySelector('.menu-toggle');
  let mainNav = document.querySelector('.menu');

  navBarToggle.addEventListener('click', function () {
      console.log('toggle')
      mainNav.classList.toggle('active');
  });



});


