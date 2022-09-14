const { getCompoundV2Tvl } = require('../helper/compound')
const { transformArbitrumAddress } = require('../helper/portedTokens')
const { staking } = require('../helper/staking')

function lending(borrowed) {
  return async (...params) => {
    const transformAdress = await transformArbitrumAddress()
    const balances = await getCompoundV2Tvl("0x60437FEE4ddBdA6e47955b6255E312F1ED067033", 'arbitrum', addr => {
      if (addr === '0x3EfFa48cB7c65399676D49f4B08696151f2446CC') {
        return "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
      }
      return transformAdress(addr)
    }, '0x3EfFa48cB7c65399676D49f4B08696151f2446CC', "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", borrowed)(...params)
    return Object.fromEntries(Object.entries(balances).filter(b => Number(b[1]) > 1))
  }
}

module.exports = {
  methodology: "Same as compound, we just get all the collateral (not borrowed money) on the lending markets.",
  timetravel: true,
  doublecounted: false,
  arbitrum: {
    tvl: lending(false),
  }
}
