const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const START_COUNT = 0;

module.exports = buildModule("TomModule", (m) => {
  const cool = m.getParameter("cool", START_COUNT);

  const tomContract = m.contract("Tom", [], {
	cool: cool
  });

  return { tomContract };
});
