// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;
import {Script} from "forge-std/Script.sol";
import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";

import "../contracts/NonfungiblePositionManager.sol";
import "@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3Pool.sol";
import "@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3PoolDeployer.sol";
import "@0xstoryhunt/v3-core/contracts/interfaces/IStoryHuntV3Factory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "../contracts/SwapRouter.sol";
import "../contracts/interfaces/ISwapRouter.sol";
import "../contracts/interfaces/INonfungiblePositionManager.sol";
import "../contracts/lens/StoryHuntInterfaceMulticall.sol";
import "../contracts/lens/Quoter.sol";
import "../contracts/lens/QuoterV2.sol";
import "../contracts/lens/TickLens.sol";
import "../contracts/lens/Multicall2.sol";
import "../contracts/libraries/NFTDescriptor.sol";
import "../contracts/NonfungibleTokenPositionDescriptor.sol";
import "../contracts/interfaces/lm-pool/IAlphaHunterV3.sol";
import "../contracts/interfaces/lm-pool/ILMPoolDeployer.sol";
import "../contracts/interfaces/external/IWIP9.sol";

contract Deployment is Script {
    address WIP_ADDRESS = vm.envAddress("WIP_ADDRESS");
    address WALLET_ADDRESS = vm.envAddress("DEPLOYER");
    address USDC_ADDRESS = vm.envAddress("USDC_ADDRESS");
    address WETH_ADDRESS = vm.envAddress("WETH_ADDRESS");

    //periphery
    address V3_POOL_DEPLOYER = vm.envAddress("V3_POOL_DEPLOYER");
    address V3_FACTORY_CONTRACT = vm.envAddress("V3_FACTORY_CONTRACT");

    //periphery
    address MULTICALL_ADDRESS = vm.envAddress("MULTICALL_ADDRESS");
    address QUOTER_ADDRESS = vm.envAddress("QUOTER_ADDRESS");
    address MULTICALL2 = vm.envAddress("MULTICALL2");
    address QUOTERV2_ADDRESS = vm.envAddress("QUOTERV2_ADDRESS");
    address TICKLENS = vm.envAddress("TICKLENS");
    address NFT_POSITION_DESCRIPTOR_ADDRESS =
        vm.envAddress("NFT_POSITION_DESCRIPTOR_ADDRESS");
    address NFT_POSITION_MANAGER_ADDRESS =
        vm.envAddress("NFT_POSITION_MANAGER_ADDRESS");
    address SWAP_ROUTER_ADDRESS = vm.envAddress("SWAP_ROUTER_ADDRESS");

    //lm
    address ALPHA_HUNTER_ADDRESS = vm.envAddress("ALPHA_HUNTER_ADDRESS");
    address LM_POOL_DEPLOYER_ADDRESS =
        vm.envAddress("LM_POOL_DEPLOYER_ADDRESS");

    bytes32 NATIVE_CURRENCY_LABEL = vm.envBytes32("NATIVE_CURRENCY_LABEL");

    address RECEIVER = vm.envAddress("RECEIVER_ADDRESS");
    address REWARD_TOKEN = vm.envAddress("REWARD_TOKEN");

    address MULTISIG = vm.envAddress("MULTISIG_ADDRESS");

    uint256 UPKEEP_PERIOD = vm.envUint("UPKEEP_PERIOD");
    uint256 UPKEEP_AMOUNT = vm.envUint("UPKEEP_AMOUNT");

    SwapRouter router;
    uint256 internal deployerPrivateKey;
    StoryHuntInterfaceMulticall storyHuntInterfaceMulticall;
    IStoryHuntV3Factory storyHuntV3Factory;

    constructor() {
        deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        storyHuntV3Factory = IStoryHuntV3Factory(V3_FACTORY_CONTRACT);
    }

    modifier broadcast(uint256 privateKey) {
        vm.startBroadcast(privateKey);

        _;

        vm.stopBroadcast();
    }

    function stringToBytes32(
        string memory source
    ) public pure returns (bytes32 result) {
        require(bytes(source).length <= 32, "String too long for bytes32");
        assembly {
            result := mload(add(source, 32))
        }
    }

    function deployContracts() public broadcast(deployerPrivateKey) {
        StoryHuntInterfaceMulticall storyHuntInterfaceMulticall = new StoryHuntInterfaceMulticall();
        console.log("MULTICALL_ADDRESS=", address(storyHuntInterfaceMulticall));

        Multicall2 multicall2 = new Multicall2();
        console.log("MULTICALL2=", address(multicall2));

        TickLens tickLens = new TickLens();
        console.log("TICKLENS=", address(tickLens));

        QuoterV2 quoterV2 = new QuoterV2(
            V3_POOL_DEPLOYER,
            V3_FACTORY_CONTRACT,
            WIP_ADDRESS
        );
        console.log("QUOTERV2_ADDRESS=", address(quoterV2), ";");

        Quoter quoter = new Quoter(
            V3_POOL_DEPLOYER,
            V3_FACTORY_CONTRACT,
            WIP_ADDRESS
        );
        console.log("QUOTER_ADDRESS=", address(quoter), ";");

        NonfungibleTokenPositionDescriptor nonfungibleTokenPositionDescriptor = new NonfungibleTokenPositionDescriptor(
                WIP_ADDRESS,
                stringToBytes32("WIP")
            );
        require(
            stringToBytes32("WIP") == NATIVE_CURRENCY_LABEL,
            "Invalid native currency label"
        );
        console.log(
            "NFT_POSITION_DESCRIPTOR_ADDRESS=",
            address(nonfungibleTokenPositionDescriptor)
        );

        NonfungiblePositionManager nonfungiblePositionManager = new NonfungiblePositionManager(
                V3_POOL_DEPLOYER,
                V3_FACTORY_CONTRACT,
                WIP_ADDRESS,
                address(nonfungibleTokenPositionDescriptor)
            );
        console.log(
            "NFT_POSITION_MANAGER_ADDRESS=",
            address(nonfungiblePositionManager)
        );

        SwapRouter swapRouter = new SwapRouter(
            V3_POOL_DEPLOYER,
            V3_FACTORY_CONTRACT,
            WIP_ADDRESS
        );
        console.log("SWAP_ROUTER_ADDRESS=", address(swapRouter));
    }

    function setLMPoolDeployerInFactory() public broadcast(deployerPrivateKey) {
        IStoryHuntV3Factory storyHuntV3Factory = IStoryHuntV3Factory(
            V3_FACTORY_CONTRACT
        );
        storyHuntV3Factory.setLmPoolDeployer(LM_POOL_DEPLOYER_ADDRESS);
    }

    function setLMPoolDeployerInAlphaHunter()
        public
        broadcast(deployerPrivateKey)
    {
        IAlphaHunterV3 alphaHunter = IAlphaHunterV3(ALPHA_HUNTER_ADDRESS);
        ILMPoolDeployer poolDeployer = ILMPoolDeployer(
            LM_POOL_DEPLOYER_ADDRESS
        );
        alphaHunter.setLMPoolDeployer(poolDeployer);
    }

    function addReceiver() public broadcast(deployerPrivateKey) {
        IERC20(REWARD_TOKEN).approve(ALPHA_HUNTER_ADDRESS, type(uint256).max);
        IAlphaHunterV3 alphaHunter = IAlphaHunterV3(ALPHA_HUNTER_ADDRESS);
        alphaHunter.setReceiver(RECEIVER);
    }

    function transferOwnershipFactory() public broadcast(deployerPrivateKey) {
        IStoryHuntV3Factory storyHuntV3Factory = IStoryHuntV3Factory(
            V3_FACTORY_CONTRACT
        );
        storyHuntV3Factory.transferOwnership(MULTISIG);
    }

    function transferOwnershipAlphaHunter()
        public
        broadcast(deployerPrivateKey)
    {
        IAlphaHunterV3 alphaHunter = IAlphaHunterV3(ALPHA_HUNTER_ADDRESS);
        alphaHunter.transferOwnership(MULTISIG);
    }

    function upkeepRewards() public broadcast(deployerPrivateKey) {
        IWIP9 wip9 = IWIP9(WIP_ADDRESS);
        wip9.deposit{value: UPKEEP_AMOUNT}();

        IAlphaHunterV3 alphaHunter = IAlphaHunterV3(ALPHA_HUNTER_ADDRESS);
        alphaHunter.upkeep(REWARD_TOKEN, UPKEEP_AMOUNT, UPKEEP_PERIOD, true);
    }

    function createAndInitializePool() public broadcast(deployerPrivateKey) {
        NonfungiblePositionManager nftManager = NonfungiblePositionManager(
            NFT_POSITION_MANAGER_ADDRESS
        );
        if (vm.envBool("CREATE_POOL1")) {
            nftManager.createAndInitializePoolIfNecessary(
                vm.envAddress("POOL1_TOKEN0"),
                vm.envAddress("POOL1_TOKEN1"),
                vm.envUint("POOL1_FEE"),
                vm.envUint("POOL1_SQRT_PRICE_X96")
            );
        }
        if (vm.envBool("CREATE_POOL2")) {
            nftManager.createAndInitializePoolIfNecessary(
                vm.envAddress("POOL2_TOKEN0"),
                vm.envAddress("POOL2_TOKEN1"),
                vm.envUint("POOL2_FEE"),
                vm.envUint("POOL2_SQRT_PRICE_X96")
            );
        }
    }
}
