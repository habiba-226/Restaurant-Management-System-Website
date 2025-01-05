// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  updateEmployeeDashboard();
});

function updateEmployeeDashboard() {
  const storedData = JSON.parse(localStorage.getItem('customerData'));

  if (storedData) {
      document.getElementById('customerCount').innerText = storedData.customers;
      document.getElementById('incomeAmount').innerText = '£' + storedData.income.toFixed(2);
  } else {
      console.log('No customer data found.');
  }

  createCharts();
}

const ordersData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
      label: 'Number of Orders',
      data: [15, 20, 25, 30, 35, 40, 45], // Example orders data
      backgroundColor: 'rgba(54, 162, 235, 0.2)', 
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
  }]
};

const incomeData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
      label: 'Income (£)',
      data: [150, 200, 250, 300, 350, 400, 450], // Example income data
      backgroundColor: 'rgba(255, 99, 132, 0.2)', 
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
  }]
};

// Create charts
function createCharts() {
  const ctxOrders = document.getElementById('ordersChart').getContext('2d');
  const ordersChart = new Chart(ctxOrders, {
      type: 'bar',
      data: ordersData,
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  const ctxIncome = document.getElementById('incomeChart').getContext('2d');
  const incomeChart = new Chart(ctxIncome, {
      type: 'bar',
      data: incomeData,
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}


function updateCustomerData(orderAmount) {
  let customerData = JSON.parse(localStorage.getItem('customerData')) || { customers: 25, income: 1500.0 };

  customerData.customers += 1;
  customerData.income += orderAmount;

  localStorage.setItem('customerData', JSON.stringify(customerData));

  console.log('Updated Customer Data:', customerData);
}


updateCustomerData(30);


document.getElementById('backButton').addEventListener('click', function() {
  window.location.href = "../index.html";
});