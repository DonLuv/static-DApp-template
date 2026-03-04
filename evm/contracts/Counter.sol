// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title Counter — Example contract for the DApp template
contract Counter {
  uint256 public count;

  event CountChanged(uint256 newCount, address indexed changedBy);

  function increment() external {
    count++;
    emit CountChanged(count, msg.sender);
  }

  function decrement() external {
    require(count > 0, "Counter: cannot decrement below zero");
    count--;
    emit CountChanged(count, msg.sender);
  }
}
