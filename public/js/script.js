document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
  
    // Get the custom colors from the body element
    let color1 = body.getAttribute("data-color1");
    let color2 = body.getAttribute("data-color2");
  
    // colours are from https://www.csscolorsapi.com/api/colors/group/
    // but the api does not return the hex signifier so have to add it
    if (color1 && !color1.startsWith('#')) color1 = `#${color1}`;
    if (color2 && !color2.startsWith('#')) color2 = `#${color2}`;
  
    if (color1 && color2) {
      body.style.background = color1;
    //   console.log("Custom gradient applied:", color1, color2);
    } else {
      console.log("Default background in use.");
    }

    // Scroll to the result section after the page loads
    const result = document.getElementById("result-section");

     // If result section exists, scroll to it
    if (result) {
        result.scrollIntoView({ behavior: "smooth" });
    }

    // get current year for the footer
    let currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = `${currentYear} A Box of Feelings`;


    // // Spinner logic
    // const form = document.querySelector("form");
    // const spinner = document.getElementById("loading-spinner");

    // if (form && spinner) {
    //     form.addEventListener("submit", () => {
    //         spinner.classList.remove("hidden");
    //         spinner.classList.add("visible");
    //     });
    // }
  
    body.classList.add("loaded");
});
  