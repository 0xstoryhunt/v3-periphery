import {
    abi as FACTORY_ABI,
    bytecode as FACTORY_BYTECODE,
  } from '../contracts/StoryHuntV3Factory.json'
  import { Fixture } from 'ethereum-waffle'
  import { ethers, waffle } from 'hardhat'
  import { IStoryHuntV3Factory, IWIP9, MockTimeSwapRouter } from '../../typechain'
  
  import WIP9 from '../contracts/WIP9.json'
  
  const wipFixture: Fixture<{ wip9: IWIP9 }> = async ([wallet]) => {
    const wip9 = (await waffle.deployContract(wallet, {
      bytecode: WIP9.bytecode,
      abi: WIP9.abi,
    })) as IWIP9
  
    return { wip9 }
  }
  
  const v3CoreFactoryFixture: Fixture<IStoryHuntV3Factory> = async ([wallet]) => {
    return (await waffle.deployContract(wallet, {
      bytecode: FACTORY_BYTECODE,
      abi: FACTORY_ABI,
    })) as IStoryHuntV3Factory
  }
  
  export const v3RouterFixture: Fixture<{
    wip9: IWIP9;
    factory: IStoryHuntV3Factory;
    router: MockTimeSwapRouter;
  }> = async ([wallet], provider) => {
    const { wip9 } = await wipFixture([wallet], provider);
    if (!wip9.address) throw new Error("WIP9 deployment failed");
  
    const factory = await v3CoreFactoryFixture([wallet], provider);
    if (!factory.address) throw new Error("Factory deployment failed");
  
    const router = (await (await ethers.getContractFactory('MockTimeSwapRouter')).deploy(factory.address, wip9.address)) as MockTimeSwapRouter;
    if (!router.address) throw new Error("Router deployment failed");
  
    return { factory, wip9, router };
  };
  
  