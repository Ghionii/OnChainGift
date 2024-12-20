const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('onChainGiftModule', (m) => {
  const onChainGift2 = m.contract('onChainGift2', [], {});

  return { onChainGift2 };
});
