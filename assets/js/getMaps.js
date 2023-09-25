 // Inisialisasi peta dengan koordinat tengah
 var map = L.map("map").setView(
    [-7.762041142701557, 110.4092787954242],
    5
  );

  // Tambahkan peta dasar OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Tambahkan kontrol skala
  L.control.scale().addTo(map);

  var marker;

  // Fungsi untuk menampilkan marker di peta
  function showMarker(x, y, popupText) {
    if (marker) {
      map.removeLayer(marker);
    }
    marker = L.marker([x, y]).addTo(map);
    marker.bindPopup(popupText).openPopup(); //Menampilkan popup
    map.setView([x, y], 15); // Geser tampilan peta ke marker
  }

  // Tangani pengiriman formulir koordinat
  document
    .getElementById("coordinate-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      var x = parseFloat(document.getElementById("x-coordinate").value);
      var y = parseFloat(document.getElementById("y-coordinate").value);

      // Periksa apakah koordinat yang dimasukkan adalah angka yang valid
      if (!isNaN(x) && !isNaN(y)) {
        showMarker(x, y, `x: ${x}, y : ${y} => benar kan ?`);
      } else {
        alert("Masukkan koordinat yang valid.");
      }
    });
  // Fungsi untuk menampilkan konten yang dipilih
  function showContent(contentId) {
    var widgets = document.querySelectorAll(".widget");
    widgets.forEach(function (widget) {
      widget.style.display = "none"; // Sembunyikan semua widget terlebih dahulu
    });
    document.getElementById(contentId).style.display = "block"; // Tampilkan widget yang sesuai
  }

  // Inisialisasi Chart.js untuk grafik kurva
  var ctx = document.getElementById("lineChart").getContext("2d");
  var lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
      datasets: [
        {
          label: "Grafik Dummy",
          data: [10, 15, 7, 12, 8, 14],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Bulan",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Nilai",
          },
        },
      },
    },
  });