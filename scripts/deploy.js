// deploy.js

const { ethers, run } = require('hardhat')

async function main() {
  // Get the deployer's account and balance
  const [deployer] = await ethers.getSigners()
  const balance = await deployer.getBalance()
  console.log('Deploying contracts with account:', deployer.address)
  console.log('Account balance:', ethers.utils.formatEther(balance), 'IP')

  // Get the network information
  const network = await ethers.provider.getNetwork()
  console.log('Deploying to network:', network.name)

  // Use the provided factory address
  const factoryAdr = '0x354631ac8fdb2d5d66Ca5809b78BCE9dda1b7973'

  // Use the provided IP address (wrapped IP, similar to WETH)
  const wipAdr = '0x1516000000000000000000000000000000000000'
  console.log('Using IP address:', wipAdr)

  //
  // 1. Deploy StoryHuntInterfaceMulticall
  //
  const StoryHuntInterfaceMulticall = await ethers.getContractFactory('StoryHuntInterfaceMulticall')
  console.log('Deploying StoryHuntInterfaceMulticall...')

  if (!StoryHuntInterfaceMulticall.bytecode || StoryHuntInterfaceMulticall.bytecode === '0x') {
    throw new Error('Contract bytecode is empty for StoryHuntInterfaceMulticall.')
  }

  const _StoryHuntInterfaceMulticall = await StoryHuntInterfaceMulticall.deploy()
  console.log('Transaction hash:', _StoryHuntInterfaceMulticall.deployTransaction.hash)
  await _StoryHuntInterfaceMulticall.deployed()
  console.log('StoryHuntInterfaceMulticall deployed at:', _StoryHuntInterfaceMulticall.address)

  // Verify StoryHuntInterfaceMulticall
  console.log('Verifying StoryHuntInterfaceMulticall contract...')
  try {
    await run('verify:verify', {
      address: _StoryHuntInterfaceMulticall.address,
      constructorArguments: [],
    })
    console.log('StoryHuntInterfaceMulticall verified successfully!')
  } catch (error) {
    console.error('Verification failed:', error)
  }

  //
  // 2. Deploy Quoter
  //
  const Quoter = await ethers.getContractFactory('Quoter')
  console.log('Deploying Quoter...')

  if (!Quoter.bytecode || Quoter.bytecode === '0x') {
    throw new Error('Contract bytecode is empty for Quoter.')
  }

  // Quoter expects 2 constructor args: (address factory, address WIP9)
  const _Quoter = await Quoter.deploy(factoryAdr, wipAdr)
  console.log('Transaction hash:', _Quoter.deployTransaction.hash)
  await _Quoter.deployed()
  console.log('Quoter deployed at:', _Quoter.address)

  // Verify Quoter
  console.log('Verifying Quoter contract...')
  try {
    await run('verify:verify', {
      address: _Quoter.address,
      constructorArguments: [factoryAdr, wipAdr], // <-- must match deployment
    })
    console.log('Quoter verified successfully!')
  } catch (error) {
    console.error('Verification failed:', error)
  }

  //
  // 3. Deploy NFTDescriptor library
  //
  const nativeCurrencyLabelBytes = ethers.utils.formatBytes32String('IP')
  console.log('nativeCurrencyLabelBytes:', nativeCurrencyLabelBytes)

  const NFTDescriptor = await ethers.getContractFactory('NFTDescriptor')
  console.log('Deploying NFTDescriptor...')

  if (!NFTDescriptor.bytecode || NFTDescriptor.bytecode === '0x') {
    throw new Error('Contract bytecode is empty for NFTDescriptor.')
  }

  const _NFTDescriptor = await NFTDescriptor.deploy()
  console.log('Transaction hash:', _NFTDescriptor.deployTransaction.hash)
  await _NFTDescriptor.deployed()
  console.log('NFTDescriptor deployed at:', _NFTDescriptor.address)

  // Verify NFTDescriptor
  console.log('Verifying NFTDescriptor contract...')
  try {
    await run('verify:verify', {
      address: _NFTDescriptor.address,
      constructorArguments: [],
    })
    console.log('NFTDescriptor verified successfully!')
  } catch (error) {
    console.error('Verification failed:', error)
  }

  //
  // 4. Deploy NonfungibleTokenPositionDescriptor (using NFTDescriptor library)
  //
  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
    libraries: {
      NFTDescriptor: _NFTDescriptor.address,
    },
  })
  console.log('Deploying NonfungibleTokenPositionDescriptor...')

  if (!NonfungibleTokenPositionDescriptor.bytecode || NonfungibleTokenPositionDescriptor.bytecode === '0x') {
    throw new Error('Contract bytecode is empty for NonfungibleTokenPositionDescriptor.')
  }

  // constructor(address _WIP9, bytes32 _nativeCurrencyLabelBytes)
  const _NonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
    wipAdr,
    nativeCurrencyLabelBytes
  )
  console.log('Transaction hash:', _NonfungibleTokenPositionDescriptor.deployTransaction.hash)
  await _NonfungibleTokenPositionDescriptor.deployed()
  console.log('NonfungibleTokenPositionDescriptor deployed at:', _NonfungibleTokenPositionDescriptor.address)

  // Verify NonfungibleTokenPositionDescriptor
  console.log('Verifying NonfungibleTokenPositionDescriptor contract...')
  try {
    await run('verify:verify', {
      address: _NonfungibleTokenPositionDescriptor.address,
      constructorArguments: [wipAdr, nativeCurrencyLabelBytes], // <-- must match deployment
    })
    console.log('NonfungibleTokenPositionDescriptor verified successfully!')
  } catch (error) {
    console.error('Verification failed:', error)
  }

  //
  // 5. Deploy NonfungiblePositionManager
  //
  const NonfungiblePositionManager = await ethers.getContractFactory('NonfungiblePositionManager')
  console.log('Deploying NonfungiblePositionManager...')

  if (!NonfungiblePositionManager.bytecode || NonfungiblePositionManager.bytecode === '0x') {
    throw new Error('Contract bytecode is empty for NonfungiblePositionManager.')
  }

  // constructor(address _factory, address _WIP9, address _tokenDescriptor_)
  const _NonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    factoryAdr,
    wipAdr,
    _NonfungibleTokenPositionDescriptor.address
  )
  console.log('Transaction hash:', _NonfungiblePositionManager.deployTransaction.hash)
  await _NonfungiblePositionManager.deployed()
  console.log('NonfungiblePositionManager deployed at:', _NonfungiblePositionManager.address)

  // Verify NonfungiblePositionManager
  console.log('Verifying NonfungiblePositionManager contract...')
  try {
    await run('verify:verify', {
      address: _NonfungiblePositionManager.address,
      constructorArguments: [factoryAdr, wipAdr, _NonfungibleTokenPositionDescriptor.address],
    })
    console.log('NonfungiblePositionManager verified successfully!')
  } catch (error) {
    console.error('Verification failed:', error)
  }

  //
  // 6. Deploy SwapRouter
  //
  const SwapRouter = await ethers.getContractFactory('SwapRouter')
  console.log('Deploying SwapRouter...')

  if (!SwapRouter.bytecode || SwapRouter.bytecode === '0x') {
    throw new Error('Contract bytecode is empty for SwapRouter.')
  }

  // constructor(address _factory, address _WIP9)
  const _SwapRouter = await SwapRouter.deploy(factoryAdr, wipAdr)
  console.log('Transaction hash:', _SwapRouter.deployTransaction.hash)
  await _SwapRouter.deployed()
  console.log('SwapRouter deployed at:', _SwapRouter.address)

  // Verify SwapRouter
  console.log('Verifying SwapRouter contract...')
  try {
    await run('verify:verify', {
      address: _SwapRouter.address,
      constructorArguments: [factoryAdr, wipAdr], // <-- must match deployment
    })
    console.log('SwapRouter verified successfully!')
  } catch (error) {
    console.error('Verification failed:', error)
  }

  // Done
  console.log('\nAll contracts deployed and verification attempts complete!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error in deployment:', error)
    process.exit(1)
  })
