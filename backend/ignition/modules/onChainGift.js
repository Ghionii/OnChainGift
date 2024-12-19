const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('onChainGiftModule', (m) => {
  const onChainGift = m.contract('onChainGift', [], {});

  return { onChainGift };
});
