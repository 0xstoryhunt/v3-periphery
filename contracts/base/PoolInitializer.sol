// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import "@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3Factory.sol";
import "@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3Pool.sol";

import "./PeripheryImmutableState.sol";
import "../interfaces/IPoolInitializer.sol";
import "hardhat/console.sol";

/// @title Creates and initializes V3 Pools
abstract contract PoolInitializer is IPoolInitializer, PeripheryImmutableState {
    /// @inheritdoc IPoolInitializer
    function createAndInitializePoolIfNecessary(
        address token0,
        address token1,
        uint24 fee,
        uint160 sqrtPriceX96
    ) external payable override returns (address pool) {
        require(token0 < token1);
        pool = IStoryHuntV3Factory(factory).getPool(token0, token1, fee);
        console.log("PoolInitializer: pool", address(pool));
        console.log("PoolInitializer: token0", token0);
        console.log("PoolInitializer: token1", token1);
        console.log("PoolInitializer: fee", fee);

        if (pool == address(0)) {
            console.log("PoolInitializer: creating pool");
            pool = IStoryHuntV3Factory(factory).createPool(token0, token1, fee);
            console.log("PoolInitializer: pool created", address(pool));
            IStoryHuntV3Pool(pool).initialize(sqrtPriceX96);
            console.log("PoolInitializer: pool initialized");
        } else {
            (uint160 sqrtPriceX96Existing, , , , , , ) = IStoryHuntV3Pool(pool)
                .slot0();
            if (sqrtPriceX96Existing == 0) {
                console.log("PoolInitializer: initializing pool");
                IStoryHuntV3Pool(pool).initialize(sqrtPriceX96);
                console.log("PoolInitializer: pool initialized");
            }
        }
    }
}
