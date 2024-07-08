require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
};

const { task } = require("hardhat/config");
const { exec } = require("child_process");

task("compile", "Compiles the entire project, building all artifacts", async (taskArgs, hre, runSuper) => {
  await runSuper();
  exec('node updateEnv.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error updating .env: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
