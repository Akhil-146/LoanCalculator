//handle submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  //hide results and show loader
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateResult, 2000);
});

function calculateResult() {
  //ui vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  //compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    //hide loader
    document.getElementById("loading").style.display = "none";
    //show results
    document.getElementById("results").style.display = "block";
  } else {
    //hide loader
    document.getElementById("loading").style.display = "none";
    //hide results
    document.getElementById("results").style.display = "none";
    showError("Please check your numbers");
  }
}

function showError(msg) {
  //get UI elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //create error element
  const errDiv = document.createElement("div");
  errDiv.className = "alert alert-danger";
  errDiv.appendChild(document.createTextNode(msg));

  //append before the heading
  card.insertBefore(errDiv, heading);

  //clear error after 3sec
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
