import React from 'react'

import CardWrapper from '../CardWrapper'
import FAQItem from '../FAQItem'

export const FAQ = [
  {
    title: '1. What is Auto-Invest?',
    content: (
      <span>
        Auto-Invest allows you to automate crypto investment and earn an income with token rewards. It is a dollar-cost
        averaging (DCA) investment strategy. You can choose the cryptocurrencies you want to purchase on a regular
        basis.
        <br />
        You can choose to create multiple Auto-Invest Plans for a single cryptocurrency.
      </span>
    ),
  },
  {
    title: '2. Where are my assets purchased with Auto-Invest?',
    content: 'Your stable token and investment assets are kept in smart contracts. No one can touch them except you.',
  },
  {
    title: '3. How can AIP protect investors against price manipulation or flash-loan of AMM DEX?',
    content: (
      <span>
        We use <b>Uniswap v3’s time-weighted average price (TWAP)</b> mechanism, TWAP helps calculate the price by using
        the geometric mean price of an asset over some interval of time. TWAP is resistant to price manipulation
        attacks, so don’t worry about a flash-attack or a fake price from any market maker. TWAPs change continuously,
        second by second (important for swap with real-time market prices) (
        <a
          href={'https://docs.uniswap.org/protocol/concepts/V3-overview/oracle#tick-accumulator'}
          target={'_blank'}
          rel="noreferrer"
        >
          https://docs.uniswap.org/protocol/concepts/V3-overview/oracle#tick-accumulator
        </a>
        )
      </span>
    ),
  },
  {
    title: '4. Can I cancel the auto-invest plan before the end day?',
    content: (
      <span>
        Yes, you can cancel your auto-invest plan at any time you want and receive your assets back. You can also extend
        your subscription or withdraw investment assets at any time too.
      </span>
    ),
  },
  {
    title: '5. What is token rewards?',
    content: (
      <span>
        This is a mechanism for users who use IAP. Every time your investment is successful, you will receive tokens of
        AIP. Only available from AIP official version. Read more{' '}
        <a href={'https://docs.aip.finance/earn-with-aip/investing-rewards'} target={'_blank'} rel="noreferrer">
          https://docs.aip.finance/earn-with-aip/investing-rewards
        </a>
      </span>
    ),
  },
  {
    title: '6. How many Auto-Invest plans can I subscribe to?',
    content: <span>There is no maximum limit to the number of Auto-Invest plans you can subscribe to.</span>,
  },
  {
    title: '7.  What is the fee on AIP and how to calculator?',
    content: (
      <span>
        When you use AIP, You should consider the fees below:
        <br />- <b>Swap fee on Uniswap:</b> 0.05% to 1% depends on token quality, in the mechanism of AIP, we will find
        the pool with the lowest fee to do it, read more here: (
        <a
          href={'https://docs.uniswap.org/protocol/concepts/V3-overview/fees#swap-fees'}
          target={'_blank'}
          rel="noreferrer"
        >
          https://docs.uniswap.org/protocol/concepts/V3-overview/fees#swap-fees
        </a>
        )
        <br />- <b>The blockchain gas fee:</b> As you know, AIP is fully decentralized and built with a lot of smart
        contracts. So when you use AIP, you need to pay a gas fee for blockchain. (
        <a href={'https://ethereum.org/en/developers/docs/gas/'} target={'_blank'} rel="noreferrer">
          https://ethereum.org/en/developers/docs/gas/
        </a>
        )
        <br />- <b>AIP Fee:</b> We only charge 0.1% when your investment asset swap is successful.
      </span>
    ),
  },
]

const FAQContainer = () => {
  return (
    <CardWrapper title={'FAQ'} mt={24} hasImage={false}>
      {FAQ.map((data) => (
        <FAQItem key={data.title} title={data.title} content={data.content} />
      ))}
    </CardWrapper>
  )
}

export default FAQContainer
