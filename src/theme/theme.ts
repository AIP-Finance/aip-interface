import { CSSObject, DefaultTheme, ThemedCssFunction, css } from 'styled-components/macro'

import colors from 'theme/colors'
import { Colors } from 'theme/types'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
    space: number[]
    breakpoints: any
    shadows: any
    borderRadius: any
    borderTopRightRadius: any
    borderTopLeftRadius: any
    borders: any
    variants: any
    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
    }
  }
}

export const MEDIA_WIDTHS = {
  upToExtraSmall: 576,
  upToSmall: 768,
  upToMedium: 992,
  upToLarge: 1200,
}

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  ;(accumulator as any)[size] = (a: CSSObject, b: CSSObject, c: CSSObject) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {}) as any

export const breakpoints: any = Object.values(MEDIA_WIDTHS).map((e) => `${e}px`)
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

function theme(darkMode: boolean): DefaultTheme {
  return {
    colors: colors(darkMode),
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    breakpoints,
    mediaWidth: mediaWidthTemplates,
    shadows: {
      1: '0px 8px 16px -8px rgba(15, 15, 15, 0.2)',
      2: '0px 24px 24px -16px rgba(15, 15, 15, 0.2)',
      3: '0px 32px 32px -24px rgba(15, 15, 15, 0.3)',
      4: '0px 48px 48px -32px rgba(15, 15, 15, 0.4)',
      5: '0px 16px 64px -48px rgba(15, 15, 15, 0.5)',
    },
    borderRadius: {
      xs: '2px',
      sm: '6px',
      md: '12px',
      lg: '16px',
      button: '12px',
    },
    borderTopLeftRadius: {
      xs: '2px',
      sm: '6px',
      md: '12px',
      lg: '16px',
      button: '12px',
    },
    borderTopRightRadius: {
      xs: '2px',
      sm: '6px',
      md: '12px',
      lg: '16px',
      button: '12px',
    },
    borders: {
      small: '1px solid',
      normal: '2px solid',
      large: '3px solid',
    },
    variants: {
      card: {
        p: 24,
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'neutral6',
      },
      tag: {
        bg: 'neutral1',
        color: 'white',
        borderRadius: 'sm',
        py: 2,
        px: 12,
      },
    },
  }
}

export default theme
