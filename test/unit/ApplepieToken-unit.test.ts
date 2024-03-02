import { assert, expect } from 'chai'
import { deployments, ethers } from 'hardhat'
import { INITIAL_SUPPLY } from '../../helper-hardhat-config'
import { ApplepieToken } from '../../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('ApplepieToken Unit Test', function () {
  let applepieToken: ApplepieToken,
    deployer: SignerWithAddress,
    user1: SignerWithAddress
  beforeEach(async function () {
    const accounts = await ethers.getSigners()
    deployer = accounts[0]
    user1 = accounts[1]

    await deployments.fixture('all')
    applepieToken = await ethers.getContract('ApplepieToken', deployer)
  })

  it('Should have correct INITIAL_SUPPLY of token ', async function () {
    const totalSupply = await applepieToken.totalSupply()
    assert.equal(totalSupply.toString(), INITIAL_SUPPLY)
  })

  it('Should be able to transfer tokens successfully to an address', async function () {
    const tokensToSend = ethers.utils.parseEther('10')
    await applepieToken.transfer(user1.address, tokensToSend)
    expect(await applepieToken.balanceOf(user1.address)).to.equal(tokensToSend)
  })

  it('Should approve other address to spend token', async () => {
    const tokensToSpend = ethers.utils.parseEther('5')
    await applepieToken.approve(user1.address, tokensToSpend)
    const applepieToken1 = await ethers.getContract('ApplepieToken', user1)
    await applepieToken1.transferFrom(
      deployer.address,
      user1.address,
      tokensToSpend
    )
    expect(await applepieToken1.balanceOf(user1.address)).to.equal(
      tokensToSpend
    )
  })
})
