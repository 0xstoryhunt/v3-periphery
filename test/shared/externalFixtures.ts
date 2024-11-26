import {
    abi as FACTORY_ABI,
    bytecode as FACTORY_BYTECODE,
  } from '../contracts/StoryHuntV3Factory.json'
  import { Fixture } from 'ethereum-waffle'
  import { ethers, waffle } from 'hardhat'
  import { IStoryHuntV3Factory, IWETH9, MockTimeSwapRouter } from '../../typechain'
  
  import WETH9 from '../contracts/WETH9.json'
  
  const wethFixture: Fixture<{ weth9: IWETH9 }> = async ([wallet]) => {
    const weth9 = (await waffle.deployContract(wallet, {
      bytecode: WETH9.bytecode,
      abi: WETH9.abi,
    })) as IWETH9
  
    return { weth9 }
  }
  
  const v3CoreFactoryFixture: Fixture<IStoryHuntV3Factory> = async ([wallet]) => {
    return (await waffle.deployContract(wallet, {
      bytecode: FACTORY_BYTECODE,
      abi: FACTORY_ABI,
    })) as IStoryHuntV3Factory
  }
  
  export const v3RouterFixture: Fixture<{
    weth9: IWETH9;
    factory: IStoryHuntV3Factory;
    router: MockTimeSwapRouter;
  }> = async ([wallet], provider) => {
    const { weth9 } = await wethFixture([wallet], provider);
    if (!weth9.address) throw new Error("WETH9 deployment failed");
  
    const factory = await v3CoreFactoryFixture([wallet], provider);
    if (!factory.address) throw new Error("Factory deployment failed");
  
    const router = (await (await ethers.getContractFactory('MockTimeSwapRouter')).deploy(factory.address, weth9.address)) as MockTimeSwapRouter;
    if (!router.address) throw new Error("Router deployment failed");
  
    return { factory, weth9, router };
  };
  
  