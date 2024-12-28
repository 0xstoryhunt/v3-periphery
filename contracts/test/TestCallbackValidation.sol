// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import '../libraries/CallbackValidation.sol';

contract TestCallbackValidation {
    function verifyCallback(
        address deployer,
        address tokenA,
        address tokenB,
        uint24 fee
    ) external view returns (IStoryHuntV3Pool pool) {
        return CallbackValidation.verifyCallback(deployer, tokenA, tokenB, fee);
    }
}
