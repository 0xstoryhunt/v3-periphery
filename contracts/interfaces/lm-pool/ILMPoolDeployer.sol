// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import '@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3Pool.sol';
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(IStoryHuntV3Pool pool) external returns (ILMPool lmPool);
}
