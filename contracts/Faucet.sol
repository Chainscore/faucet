// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {

  mapping(address => uint) lastRequest;

  address public token;
  constructor(address _token){
    token = _token;
  }

  function request() external {
    require(lastRequest[msg.sender] - block.timestamp > 60);
    lastRequest[msg.sender] = block.timestamp;

    IERC20(token).transfer(msg.sender, 10 * 10**18);
  }

  receive() external payable {
  }
}
