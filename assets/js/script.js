$(document).ready(function () {
  $.getJSON("../../data.json", function (data) {
    $.each(data, function (index, item) {
      $("#country-list").append(`
          <a href="page.html?country=${encodeURIComponent(item.name)}">
              <figure><img src="${
                item.flag
              }" alt="Flag of ${item.name}"></figure>
              <div class="info">
                  <h2 class="country-name">${item.name}</h2>
                  <div class="contxt">
                      <p>Population: <span class="population">${item.population.toLocaleString()}</span></p>
                      <p>Region: <span class="region">${item.region}</span></p>
                      <p>Capital: <span class="capital">${
                        item.capital
                      }</span></p>
                  </div>
              </div>
          </a>
        `);
    });
  });
});
// Page
$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("country");
  console.log(countryName);
  if (countryName) {
    $.getJSON("../../data.json", function (data) {
      // ใช้ find หรือเทคนิคการค้นหาเพื่อหาข้อมูลของประเทศที่ต้องการจาก JSON
      const country = data.find((item) => item.name === countryName);
      if (country) {
        // แสดงข้อมูลประเทศที่พบ
        $("#country-name").text(country.name);
        $("#population").text(country.population.toLocaleString());
        $("#region").text(country.region);
        $("#capital").text(country.capital);
      } else {
        // กรณีไม่พบข้อมูลประเทศ
        $("#country-name").text("Country data not found.");
        $("#population").text("N/A");
        $("#region").text("N/A");
        $("#capital").text("N/A");
      }
    });
  } else {
    $("#country-name").text("Country not specified");
  }
});
