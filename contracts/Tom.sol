// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tom {
	uint public cool = 0;

	function incrementTom() public {
		cool = cool + 10;
	}
}