// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import "../interfaces/IPeripheryImmutableState.sol";

/// @title Immutable state
/// @notice Immutable state used by periphery contracts
abstract contract PeripheryImmutableState is IPeripheryImmutableState {
    /// @inheritdoc IPeripheryImmutableState
    address public immutable override factory;
    /// @inheritdoc IPeripheryImmutableState
    address public immutable override WIP9;
    address public immutable override deployer;

    constructor(address _deployer, address _factory, address _WIP9) {
        deployer = _deployer;
        factory = _factory;
        WIP9 = _WIP9;
    }
}
