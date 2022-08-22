/* eslint-disable react/display-name */
import css from '@styled-system/css'
import { ForwardedRef, TextareaHTMLAttributes, forwardRef, useState } from 'react'
import { FiEye, FiEyeOff, FiSearch, FiX } from 'react-icons/fi'
import styled from 'styled-components/macro'
import { variant } from 'styled-system'

import { Button } from 'theme/Buttons'
import { Box, Flex, sx } from 'theme/base'
import { SxProps } from 'theme/types'

import { InputProps, InputSearchProps, InputWrapperProps, TextareaProps } from './types'

export const StyledInput = styled.input`
  background: transparent;
  padding: 0;
  border: none;
  width: 100%;
`

const StyledTextarea = styled.textarea`
  background: transparent;
  padding: 0;
  border: none;
  width: 100%;
`

export const StyledPrefix = styled.div`
  padding-right: 16px;
  height: fit-content;
`

export const StyledSuffix = styled.div`
  padding-left: 16px;
  height: fit-content;
  white-space: nowrap;
`

export const InputWrapper = styled(Flex)<InputWrapperProps>(
  (props: InputWrapperProps) =>
    css({
      width: props.block ? '100%' : 'fit-content',
      alignItems: 'center',
      bg: 'neutral1',
      position: 'relative',
      border: props.border ?? 'small',
      borderColor: 'neutral1',
      borderRadius: 'sm',
      fontSize: 14,
      lineHeight: '20px',
      px: '16px',
      py: '12px',
      color: 'inherit',
      cursor: 'pointer',
      '&:hover:not([disabled])': {
        borderColor: 'neutral5',
      },
      '&:focus-within:not([disabled])': {
        borderColor: 'neutral5',
      },
      '&[disabled]': {
        bg: 'neutral2',
        borderColor: 'neutral2',
        color: 'neutral5',
        cursor: 'not-allowed',
      },
    }),
  variant({
    variants: {
      error: {
        borderColor: 'warning2',
        '&:hover:not([disabled])': {
          borderColor: 'warning2',
        },
        '&:focus-within:not([disabled])': {
          borderColor: 'warning2',
        },
      },
    },
  }),
  sx
)

const Input = forwardRef(
  (
    { affix, suffix, border = 'normal', block, sx, variant, hasError, ...props }: InputProps & SxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <InputWrapper
      disabled={props.disabled}
      variant={hasError ? 'error' : variant}
      block={block}
      sx={sx}
      border={border}
      onClick={({ target }: { target: HTMLDivElement }) => {
        if (target?.querySelector('input')) {
          target?.querySelector('input')?.focus()
        }
      }}
    >
      {!!affix && <StyledPrefix>{affix}</StyledPrefix>}
      <StyledInput {...props} ref={ref}></StyledInput>
      {!!suffix && <StyledSuffix>{suffix}</StyledSuffix>}
    </InputWrapper>
  )
)

export const Textarea = forwardRef(
  (
    { block, sx, variant, ...props }: TextareaProps & SxProps & TextareaHTMLAttributes<HTMLTextAreaElement>,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => (
    <InputWrapper
      disabled={props.disabled}
      variant={variant}
      block={block}
      sx={sx}
      onClick={({ target }: { target: HTMLDivElement }) => {
        if (target?.querySelector('input')) {
          target?.querySelector('input')?.focus()
        }
      }}
    >
      <StyledTextarea {...props} ref={ref}></StyledTextarea>
    </InputWrapper>
  )
)

export const InputPassword = forwardRef(
  ({ sx, block, variant, ...props }: InputProps & SxProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [showing, show] = useState(false)
    return (
      <InputWrapper
        variant={variant}
        disabled={props.disabled}
        block={block}
        sx={sx}
        onClick={({ target }: { target: HTMLDivElement }) => {
          if (target?.querySelector('input')) {
            target?.querySelector('input')?.focus()
          }
        }}
      >
        <StyledInput {...props} type={showing ? 'text' : 'password'} ref={ref}></StyledInput>
        <Button
          type="button"
          variant="ghost"
          p={0}
          sx={{
            lineHeight: '20px',
            '&>svg': {
              verticalAlign: 'middle',
            },
            '&:hover, &:focus': {
              color: 'inherit !important',
            },
          }}
          disabled={props.disabled}
          onClick={() => show((showing) => !showing)}
        >
          {showing ? <FiEye size={14} /> : <FiEyeOff size={14} />}
        </Button>
      </InputWrapper>
    )
  }
)

export const InputSearch = forwardRef(
  ({ sx, block, variant, onClear, ...props }: InputSearchProps & SxProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <InputWrapper
        variant={variant}
        disabled={props.disabled}
        block={block}
        sx={{
          '& button.search-btn--clear': {
            visibility: 'hidden',
            transition: 'none',
          },
          '&:focus-within:not([disabled]) button.search-btn--clear': {
            visibility: 'visible',
          },
          ...sx,
        }}
        onClick={({ target }: { target: HTMLDivElement }) => {
          if (target?.querySelector('input')) {
            target?.querySelector('input')?.focus()
          }
        }}
      >
        <Box
          color="neutral5"
          sx={{
            display: 'flex',
          }}
        >
          <FiSearch size={20} />
        </Box>
        <StyledInput {...props} ref={ref} style={{ marginLeft: 8 }} />
        <Button
          type="button"
          variant="ghost"
          color="neutral5"
          className="search-btn--clear"
          p={0}
          sx={{
            minWidth: '20px',
            height: '20px',
            '&>svg': {
              verticalAlign: 'middle',
            },
            color: 'neutral5',
            '&:hover, &:focus': {
              color: 'inherit !important',
            },
          }}
          onClick={onClear}
        >
          <FiX size={16} />
        </Button>
      </InputWrapper>
    )
  }
)

export default Input
