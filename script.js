// Your API token (for testing, paste it here temporarily)
const apiToken = "YOUR_API_TOKEN_HERE";

// Connect to Deriv API via WebSocket
const connection = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

// When connection opens
connection.onopen = () => {
  console.log("Connected to Deriv API");
};

// Handle messages from Deriv
connection.onmessage = (msg) => {
  const data = JSON.parse(msg.data);

  // Show balance response on the page
  if (data.msg_type === "balance") {
    const balanceElement = document.getElementById("clock");
    balanceElement.textContent = "Balance: " + data.balance.balance + " " + data.balance.currency;
  }
};

// Function triggered by button click
function showMessage() {
  // Authorize with your token
  connection.send(JSON.stringify({ authorize: apiToken }));

  // Request balance
  connection.send(JSON.stringify({ balance: 1 }));
}
