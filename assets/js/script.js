$(document).ready(function () {
  $.getJSON("../../data.json", function (data) {
    $.each(data, function (index, item) {
      // แก้ไขที่นี่
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
    // Select Option
    let regions = new Set();
    $.each(data, function (index, item) {
      regions.add(item.region);
    });
    regions.forEach((region) => {
      if (region) {
        $("#filter-region").append(
          `<option value="${region}">${region}</option>`
        );
      }
    });
    $("#search-country").on("keyup", function () {
      let searchTerm = $(this).val().toLowerCase();
      $("#country-list a").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
      });
    });
    // Input Filter
    $("#filter-region").on("change", function () {
      let region = $(this).val();
      $("#country-list a").filter(function () {
        if (region === "") {
          $(this).show(); // แสดงทั้งหมดถ้าไม่มี region เลือก
        } else {
          $(this).toggle($(this).find(".region").text() === region);
        }
      });
    });
  });
});
// Page
$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("country");
  // console.log(countryName);
  if (countryName) {
    $.getJSON("../../data.json", function (data) {
      const country = data.find((item) => item.name === countryName);
      // console.log(country);
      if (country) {
        $("#country-name").text(country.name);
        $("#native-name").text(country.nativeName);
        $("#population").text(country.population.toLocaleString());
        $("#region").text(country.region);
        $("#subregion").text(country.subregion);
        $("#capital").text(country.capital);
        $("#top-domain").text(country.topLevelDomain);
        // Currencies
        // console.log(country.currencies);
        const currency = country.currencies;
        const currencyStrings = currency.map((item) => {
          return `${item.code}`;
        });
        const currencyText = currencyStrings.join(", ");
        $("#currencies").text(currencyText);
        // Language
        // console.log(country.languages);
        const lang = country.languages;
        const langStrings = lang.map((item) => {
          return `${item.name}`;
        });
        const langText = langStrings.join(", ");
        $("#lan").text(langText);
        // Border Country
        // console.log(country.borders);
        const border = country.borders;
        border.forEach((borderCode) => {
          const country = data.find(
            (countryItem) => countryItem.alpha3Code === borderCode
          );
          if (country) {
            $("#badge-list").append(`<div>${country.name}</div>`);
          } else {
            console.log(`No country found for code: ${borderCode}`);
          }
        });

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
// Darkmode
$(document).ready(function () {
  let isDarkmode = localStorage.getItem("isDarkmode") === "true";
  const toggleDarkmode = () => {
    if (!isDarkmode) {
      $("header").css({
        "background-color": "var(--dark-blue)",
        "color": "white",
      });
      $("#darkmode").text("Light mode");
      $("body").css({
        "background-color": "var(--very-dark-blue)",
        "color": "white",
      });
      $(this).html('<ion-icon name="sunny"></ion-icon>Light mode');
      $("header button, .country-info").css({ "color": "white" });
      $(".input-wrapper").css({ "background-color": "var(--dark-blue)" });
      $("#country-list a > div").css("background-color", "var(--dark-blue)");
      $(".btn").css({
        "background-color": "var(--dark-blue)",
        "color": "white",
      });
      $("#badge-list div").css({
        "background-color": "var(--dark-blue)",
        "color": "white",
      });
      isDarkmode = true;
    } else {
      $("header").css({ "background-color": "var(--white)", "color": "black" });
      $("#darkmode").text("Dark mode");
      $("body").css({
        "background-color": "var(--light-gray)",
        "color": "var(--black)",
      });
      $(this).html('<ion-icon name="moon"></ion-icon>Dark mode');
      $("header button, .country-info").css({ "color": "black" });
      $(".input-wrapper").css({ "background-color": "var(--white)" });
      $("#country-list a > div").css("background-color", "var(--white)");
      $(".btn").css({
        "background-color": "var(--white)",
        "color": "black",
      });
      $("#badge-list div").css({
        "background-color": "var(--white)",
        "color": "black",
      });
      isDarkmode = false;
    }
  };
  toggleDarkmode();
  $("#darkmode").click(function(e) {
    e.preventDefault();
    toggleDarkmode();
  })
});
