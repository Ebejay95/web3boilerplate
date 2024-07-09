const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const START_COUNT = 0;

module.exports = buildModule("CounterModule", (m) => {
  const count = m.getParameter("count", START_COUNT);

  const counter = m.contract("Counter", [], {
	count: count
  });

  return { counter };
});
