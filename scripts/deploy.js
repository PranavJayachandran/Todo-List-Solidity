const { ethers } = require("hardhat");

async function main() {
  const TodoList = await ethers.getContractFactory("TodoList");
  const todo = await TodoList.deploy();
  console.log("Contract deployed", todo.address);
  await todo.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
