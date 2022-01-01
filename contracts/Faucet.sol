// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {

  mapping(address => uint) lastRequest;
  event Sent(address);

  address public token;
  uint public tokenLimit;
  uint public timeLimit;

  constructor(address _token, uint _tokenLimit, uint _timeLimit){
    token = _token;
    tokenLimit = _tokenLimit;
    timeLimit = _timeLimit;
  }

  function request() external {
    require(block.timestamp - lastRequest[msg.sender] > timeLimit, "Time Limit");
    require(IERC20(token).balanceOf(msg.sender) < tokenLimit, "Token Limit");
    lastRequest[msg.sender] = block.timestamp;

    IERC20(token).transfer(msg.sender, tokenLimit);
    emit Sent(msg.sender);
  }

  function updateTokenLimit(uint newTokenLimit) external onlyOwner {
    tokenLimit = newTokenLimit;
  }

  function updateTimeLimit(uint newTimeLimit) external onlyOwner {
    timeLimit = newTimeLimit;
  }

  receive() external payable {}
}
