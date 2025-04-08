let data = [];

fetch('deputatlar.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    displayDeputatlar(data);
  });

function displayDeputatlar(list) {
  const container = document.getElementById("deputatList");
  container.innerHTML = "";
  list.forEach((d, i) => {
    container.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm" onclick="openModal(${i})">
          <img src="${d.foto}" class="card-img-top" alt="${d.ad}">
          <div class="card-body">
            <h5 class="card-title">${d.ad}</h5>
            <p><span class="badge bg-secondary">${d.partiya}</span></p>
            <p class="text-muted">${d.dairə}</p>
          </div>
        </div>
      </div>`;
  });
}

function filterPartiya(partiya) {
  const filtered = partiya === "Hamısı" ? data : data.filter(d => d.partiya === partiya);
  displayDeputatlar(filtered);
}

function openModal(index) {
  const d = data[index];
  document.getElementById("modalAd").innerText = d.ad;
  document.getElementById("modalDaire").innerText = d.dairə;
  document.getElementById("modalHaqqinda").innerText = d.haqqinda;
  document.getElementById("modalFoto").src = d.foto;
  new bootstrap.Modal(document.getElementById("deputatModal")).show();
}

document.getElementById("searchInput").addEventListener("input", function () {
  const val = this.value.toLowerCase();
  const filtered = data.filter(d => d.ad.toLowerCase().includes(val));
  displayDeputatlar(filtered);
});
