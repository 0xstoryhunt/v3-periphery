// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./ILMPoolDeployer.sol";
import '@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3Pool.sol';

interface IAlphaHunterV3 {
    function latestPeriodEndTime() external view returns (uint256);

    function latestPeriodStartTime() external view returns (uint256);

    function setLMPoolDeployer(ILMPoolDeployer _LMPoolDeployer) external;
    function add(uint256 _allocPoint, IStoryHuntV3Pool _v3Pool, bool _withUpdate) external;

    function setRewardTokens(address[] memory _tokens) external;
    function upkeep(address _token, uint256 _amount, uint256 _duration, bool _withUpdate) external;
    function setReceiver(address _receiver) external;
    function transferOwnership(address _newOwner) external;

}
