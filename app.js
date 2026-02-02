fs = require("fs")
function importFile(fileName) {
  const data = fs.readFileSync(fileName);
  return JSON.parse(data);
}

const customers = importFile("data.json");
const prices = customers[0];
customers.splice(0, 1);

let processed = 0;
let total = 0;

function printReciept(customer) {
  processed++;
  console.log(customer);

  const receipt = customer.quantity.map((item, index) => {
    return {
      Item: prices.names[index],
      "Selliing price": prices.prices[index],
      Quantity: item,
      "Customer Cost": prices.prices[index] * item,
      "Cost to procure": prices.procure[index] * item,
      total: item * prices.prices[index],
    };
  });
  for(let index = 0; index < 4; index++){
    total += receipt[index].total;
  }

  console.table(receipt);
  return receipt;
}

function main() {
  const receipt = customers.map((customer) => printReciept(customer));

  console.log(`orders processed: ${processed}`);
  console.log(`orders total: ${total}`);
}

main();