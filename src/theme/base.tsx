/* eslint-disable react/display-name */
import css, { get } from '@styled-system/css'
import React, { ForwardedRef, HTMLAttributes, ImgHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components/macro'
import { color, compose, flexbox, grid, layout, space, typography } from 'styled-system'

import { BoxProps, CssProps, SxProps, VariantProps } from './types'

export const sx = ({ sx, theme }: SxProps) => css(sx)(theme)
const base = ({ __css, theme }: CssProps) => css(__css)(theme)
const variant = ({ theme, variant, tx = 'variants' }: VariantProps) =>
  variant && theme ? css(get(theme, tx + '.' + variant, get(theme, variant)))(theme) : {}

export const Box = styled.div<BoxProps>(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  base,
  variant,
  (props: any) => props.css,
  compose(space, layout, typography, color, flexbox),
  sx
)

export const Flex = styled(Box)<BoxProps>({
  display: 'flex',
})

export const Grid = styled(Box)<BoxProps>(
  {
    display: 'grid',
  },
  grid
)

export const Text = forwardRef((props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => (
  <Box ref={ref} tx="text" {...props} />
))

export const Icon = styled(Box)`
  line-height: 0;
  vertical-align: middle;
  display: inline-block;
`

export const Svg = styled.svg<any>(compose(space, layout, color), sx)

export type TextProps = HTMLAttributes<HTMLDivElement> & BoxProps

const TextWrapper: React.FC<TextProps & { as?: string }> = styled(Text)`
  color: ${({ theme, color }: { theme: any; color?: string }) => (color ? theme.colors[color] : 'inherit')};
  overflow-wrap: break-word;
  word-break: break-word;
`
export const Link = forwardRef((props, ref: ForwardedRef<HTMLAnchorElement>) => (
  <Box ref={ref} as="a" variant="link" {...props} />
))

export const Type = {
  H1({ children, ...props }: TextProps) {
    return (
      <Box as="h1" fontSize="48px" lineHeight="52px" letterSpacing="-2%" {...props}>
        {children}
      </Box>
    )
  },
  H2({ children, ...props }: TextProps) {
    return (
      <Box as="h2" fontSize="40px" lineHeight="48px" letterSpacing="-2%" {...props}>
        {children}
      </Box>
    )
  },
  H3({ children, ...props }: TextProps) {
    return (
      <Box as="h3" fontSize="32px" lineHeight="40px" letterSpacing="-2%" {...props}>
        {children}
      </Box>
    )
  },
  H4({ children, ...props }: TextProps) {
    return (
      <Box as="h4" fontSize="28px" lineHeight="36px" letterSpacing="-1%" {...props}>
        {children}
      </Box>
    )
  },
  H5({ children, ...props }: TextProps) {
    return (
      <Box as="h5" fontSize="24px" lineHeight="32px" letterSpacing="-0.01em" fontWeight="900" {...props}>
        {children}
      </Box>
    )
  },
  Caption(props: TextProps) {
    return <TextWrapper fontSize="14px" lineHeight="22px" fontWeight="normal" display="inline-block" {...props} />
  },
  CaptionBold(props: TextProps) {
    return <TextWrapper fontSize="14px" lineHeight="22px" fontWeight="bold" display="inline-block" {...props} />
  },
  Small(props: TextProps) {
    return <TextWrapper fontSize="14px" lineHeight="22px" fontWeight="normal" display="inline-block" {...props} />
  },
  SmallBold(props: TextProps) {
    return <TextWrapper fontSize="14px" lineHeight="22px" display="inline-block" fontWeight="bold" {...props} />
  },
  Large(props: TextProps) {
    return <TextWrapper fontSize="18px" lineHeight="26px" fontWeight="normal" display="inline-block" {...props} />
  },
  LargeBold(props: TextProps) {
    return <TextWrapper fontSize="24px" lineHeight="34px" display="inline-block" fontWeight="600" {...props} />
  },
  Body(props: TextProps) {
    return <TextWrapper fontSize="16px" lineHeight="26px" display="inline-block" fontWeight="400" {...props} />
  },
  BodyBold(props: TextProps) {
    return <TextWrapper fontSize="16px" lineHeight="24px" display="inline-block" fontWeight="600" {...props} />
  },
  ButtonLarge(props: TextProps) {
    return <TextWrapper fontSize="16px" lineHeight="16px" fontWeight="bold" {...props} />
  },
}

export const Image = forwardRef(
  ({ sx, ...props }: BoxProps & ImgHTMLAttributes<HTMLImageElement>, ref: ForwardedRef<HTMLImageElement>) => (
    <Box ref={ref} as="img" draggable="false" maxWidth="100%" height="auto" verticalAlign="middle" sx={sx} {...props} />
  )
)

export const Card = forwardRef(
  (props: BoxProps & HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => (
    <Box ref={ref} variant="card" {...props} />
  )
)
