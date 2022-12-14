import css from '@styled-system/css'
import styled from 'styled-components/macro'
import { compose, layout, space, variant as systemVariant } from 'styled-system'

import { sx } from 'theme/base'

import { sizeVariants, styleVariants } from './theme'
import { ButtonProps } from './types'

export const Button = styled.button<ButtonProps>(
  css({
    appearance: 'none',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    px: '16px',
    py: '12px',
    color: 'neutral1',
    bg: 'neutral6',
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: '600',
    borderRadius: 'button',
  }),

  ({ theme, block, isLoading }) => `&:before {
    position: relative;
    top: 2px;
    content: '';
    border: 2px solid ${theme.colors.neutral8}16;
    border-top: 2px solid ${theme.colors.neutral8};
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    animation: spin 1s linear infinite;
    display: ${isLoading ? 'inline-block' : 'none'};
  }
  display: ${block ? 'block' : 'inline-block'};
  width: ${block ? '100%' : 'auto'};
  `,
  systemVariant({
    scale: 'buttons',
    variants: styleVariants,
  }),
  systemVariant({
    prop: 'size',
    variants: sizeVariants,
  }),
  compose(space, layout),
  sx
)

export type { ButtonProps, Size as ButtonSize, Variant as ButtonVariant } from './types'
