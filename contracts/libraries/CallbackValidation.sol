// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3Pool.sol';
import './PoolAddress.sol';

/// @notice Provides validation for callbacks from StoryHunt V3 Pools
library CallbackValidation {
    /// @notice Returns the address of a valid StoryHunt V3 Pool
    /// @param factory The contract address of the StoryHunt V3 factory
    /// @param tokenA The contract address of either token0 or token1
    /// @param tokenB The contract address of the other token
    /// @param fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
    /// @return pool The V3 pool contract address
    function verifyCallback(
        address factory,
        address tokenA,
        address tokenB,
        uint24 fee
    ) internal view returns (IStoryHuntV3Pool pool) {
        return verifyCallback(factory, PoolAddress.getPoolKey(tokenA, tokenB, fee));
    }

    /// @notice Returns the address of a valid StoryHunt V3 Pool
    /// @param deployer The contract address of the StoryHunt V3 deployer
    /// @param poolKey The identifying key of the V3 pool
    /// @return pool The V3 pool contract address
    function verifyCallback(
        address deployer,
        PoolAddress.PoolKey memory poolKey
    ) internal view returns (IStoryHuntV3Pool pool) {
        pool = IStoryHuntV3Pool(PoolAddress.computeAddress(deployer, poolKey));
        require(msg.sender == address(pool));
    }
}
