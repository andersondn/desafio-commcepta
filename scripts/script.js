// Aguarda o carregamento da página 
document.addEventListener("DOMContentLoaded", async () => {

  function loadData() {
    return new Promise((resolve, reject) => {
      fetch('./data/dados.json')
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));

    })

  }

  function showData(data) {
    const employeeGrid = document.querySelector('.employee-grid');
    employeeGrid.innerHTML = data.map(employee => {
      return `<a> 
    <div data-employee-id="${employee.id}" class="employee-card">
    <div class="employee-photo">
      <img src="assets/img/${employee.foto}">
      <div class="badge">${employee.id}</div>
    </div>
    <div class="details">
      <div class="name">${employee.nome}</div>
      <div class="role">${employee.cargo}</div>
    </div>
  </div>
  </a>`
    }).join('')

  }

  function updateDetailsCard(empoyeeData) {
    const detailCard = document.querySelector('.employee-details');

    detailCard.classList.remove('animate-card');
    detailCard.offsetWidth;
    detailCard.classList.add('animate-card');

    setTimeout(() => {
      detailCard.querySelector('.employee-photo')
        .innerHTML = `<img src="assets/img/${empoyeeData.foto}">`
      detailCard.querySelector('.name')
        .innerHTML = empoyeeData.nome
      detailCard.querySelector('.role')
        .innerHTML = empoyeeData.cargo
      detailCard.querySelector('.age')
        .innerHTML = empoyeeData.idade
    }, 250)

  }





  ///
  const navBarToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.menu');
  navBarToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });


  /// Carrega arquivo JSON e exibe na tela
  const employeeList = await loadData()
  showData(employeeList)

  //Processa os cliques nos cards
  document.querySelectorAll('.employee-grid .employee-card').forEach(item => {
    item.addEventListener('click', event => {
      const employeeCard = event.target.closest(".employee-card")
      //Remove a classe "active" dos outros itens
      document.querySelectorAll('.employee-card').forEach(item => {
        item.classList.remove('active');
      })
      const { employeeId } = employeeCard.dataset;
      const [employeeData] = employeeList.filter(employee => employee.id == employeeId)

      updateDetailsCard(employeeData)
      employeeCard.classList.add('active');

    })
  })


  ///Ativa o primeiro card
  document.querySelector(".employee-grid .employee-card").click()


});




