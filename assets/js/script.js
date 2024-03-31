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
      const country = data.find((item) => item.name === countryName);
      console.log(country);
      if (country) {
        $("#country-name").text(country.name);
        $("#native-name").text(country.nativeName);
        $("#population").text(country.population.toLocaleString());
        $("#region").text(country.region);
        $("#subregion").text(country.subregion);
        $("#capital").text(country.capital);
        $("#top-domain").text(country.topLevelDomain);
        $("#currencies").text(country.currencies);
        $("#lan").text(country.languages);
        $("#badge-list").text(country.borders);
        $("#country-img").attr("src", country.flag);
      } else {
        $("#country-name").text("Country data not found.");
        $("#native-name").text("N/A");
        $("#population").text("N/A");
        $("#region").text("N/A");
        $("#subregion").text("N/A");
        $("#capital").text("N/A");
        $("#top-domain").text("N/A");
        $("#currencies").text("N/A");
        $("#lan").text("N/A");
        $(".badge-list").text("N/A");

      }
    });
  } else {
    $("#country-name").text("Country not specified");
  }
});
