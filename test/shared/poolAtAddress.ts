import { abi as POOL_ABI } from '../contracts/StoryHuntV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { IStoryHuntV3Pool } from '../../typechain'

export default function poolAtAddress(address: string, wallet: Wallet): IStoryHuntV3Pool {
  return new Contract(address, POOL_ABI, wallet) as IStoryHuntV3Pool
}
