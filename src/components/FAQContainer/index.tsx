import React from 'react'

import CardWrapper from '../CardWrapper'
import FAQItem from '../FAQItem'

export const FAQ = [
  {
    title: '1. What is Auto-Invest?',
    content: (
      <span>
        Auto-Invest allows you to automate crypto investment and earn passive income. It is a dollar-cost averaging
        (DCA) investment strategy. You can choose the cryptocurrencies you want to purchase on a regular basis.
        <br />
        You can choose to create a [Portfolio Auto-Invest Plan] to buy multiple cryptocurrencies in one portfolio, or
        create an [Auto-Invest Plan] for a single cryptocurrency.
      </span>
    ),
  },
  {
    title: '2. Where are my assets purchased with Auto-Invest?',
    content: 'Your fiat money and investment assets are kept in smart contracts. No one can touch them but you.',
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
    title: '4. Can I cancel the auto-invest plan before the last day?',
    content: (
      <span>
        Yes, you can cancel your auto-invest plan at any time you want and receive USDT back. You can also extend your
        subscription or withdraw investment assets at any time too.
      </span>
    ),
  },
  {
    title: '5. How many Auto-Invest plans can I subscribe?',
    content: <span>There is no maximum limit to the number of Auto-Invest plans you can subscribe.</span>,
  },
  {
    title: '6.  What is fee on AIP and how to calculator?',
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
