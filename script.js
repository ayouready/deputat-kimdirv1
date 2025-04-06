fetch('deputatlar.json')
  .then(response => response.json())
  .then(data => {
    deputatlariGoster(data);

    document.getElementById("searchBox").addEventListener("input", function (e) {
      const sorgu = e.target.value.toLowerCase();
      const filtrlenmis = data.filter(d =>
        d.ad.toLowerCase().includes(sorgu) ||
        d.partiya.toLowerCase().includes(sorgu) ||
        d.daire.toLowerCase().includes(sorgu)
      );
      deputatlariGoster(filtrlenmis);
    });
  });

function deputatKart(deputat) {
  return `
    <div class="card">
      <h3>${deputat.ad}</h3>
      <p><strong>Partiya:</strong> ${deputat.partiya}</p>
      <p><strong>Dairə:</strong> ${deputat.daire}</p>
      <p>${deputat.haqqinda}</p>
    </div>
  `;
}

function deputatlariGoster(list) {
  const container = document.getElementById("deputatList");
  container.innerHTML = list.map(deputatKart).join("");
}
