import { expect } from 'chai';
import { makeSuite, TestEnv } from './helpers/make-suite';
import { ProtocolErrors } from '../helpers/types';
import { getVariableDebtToken } from '../helpers/contracts-getters';

makeSuite('Variable debt token tests', (testEnv: TestEnv) => {
  const { CT_CALLER_MUST_BE_POOL } = ProtocolErrors;

  it('Tries to invoke mint not being the Pool', async () => {
    const { deployer, dai, helpersContract } = testEnv;

    const daiVariableDebtTokenAddress = (
      await helpersContract.getReserveTokensAddresses(dai.address)
    ).variableDebtTokenAddress;

    const variableDebtContract = await getVariableDebtToken(daiVariableDebtTokenAddress);

    await expect(
      variableDebtContract.mint(deployer.address, deployer.address, '1', '1')
    ).to.be.revertedWith(CT_CALLER_MUST_BE_POOL);
  });

  it('Tries to invoke burn not being the Pool', async () => {
    const { deployer, dai, helpersContract } = testEnv;

    const daiVariableDebtTokenAddress = (
      await helpersContract.getReserveTokensAddresses(dai.address)
    ).variableDebtTokenAddress;

    const variableDebtContract = await getVariableDebtToken(daiVariableDebtTokenAddress);

    await expect(variableDebtContract.burn(deployer.address, '1', '1')).to.be.revertedWith(
      CT_CALLER_MUST_BE_POOL
    );
  });
});