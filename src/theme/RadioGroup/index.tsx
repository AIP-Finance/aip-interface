import { SystemStyleObject } from '@styled-system/css'
import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { GridProps } from 'styled-system'

import { Box, Flex } from 'theme/base'
import { BoxProps } from 'theme/types'

type RadioProps = {
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  onChange?: (e: any) => void
  children?: ReactElement | ReactElement[] | string
  block?: boolean
} & BoxProps

type RadioWrapperProps = {
  value?: string
  active?: boolean
  disabled?: boolean
  block?: boolean
}

type Option = {
  label: ReactElement | ReactElement[] | string
  value: string | number
}

export type RadioOptionType = {
  label: ReactElement | ReactElement[] | string
  value: string | number
}

type Direction = 'vertical' | 'horizontal'

type RadioGroupProps = {
  value?: string | number
  defaultValue?: string | number
  options?: Option[]
  onChange?: (value?: string | number) => void
  disabled?: boolean
  block?: boolean
  direction?: Direction
  optionType?: 'default' | 'button'
  sxChildren?: SystemStyleObject & GridProps
} & BoxProps

const RadioWrapper = styled(Box)<RadioWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  cursor: pointer;
  transition: border-color 240ms ease-in;
  &:not(:first-child) {
    margin-top: 12px;
  }
  .radio {
    position: relative;
    display: inline-block;
    margin-right: 8px;
    min-width: 24px;
    height: 24px;
    padding: 0;
    background: ${({ theme }) => theme.colors.neutral8};
    line-height: 24px;
    text-align: center;
    border: 2px solid ${({ theme }) => theme.colors.neutral6};
    border-radius: 50%;
  }

  .radio:after {
    content: '';
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 8px);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    /* width: 13px;
    height: 13px; */
    transition: background 240ms ease-in;
    background: ${(props) => (props.active ? props.theme.colors.primary1 : 'transparent')};
  }
  &[disabled] {
    .radio {
      cursor: not-allowed;
      background: ${({ theme }) => theme.colors.neutral6};
      border: 2px solid ${({ theme }) => theme.colors.neutral5};
    }
    .radio:after {
      content: '';
      position: absolute;
      top: 6px;
      left: 6px;
      border-radius: 12px;
      width: 12px;
      height: 12px;
      transition: background 240ms ease-in;
      background: ${(props) => (props.active ? props.theme.colors.neutral5 : 'transparent')};
    }
  }
`

const ButtonWrapper = styled(Box)<RadioWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  cursor: pointer;
  transition: border-color 240ms ease-in;
  border: 1px solid;
  padding: 4px 12px;
  margin: auto 4px;
  border-radius: 2px;
  border-color: ${(props) => (props.active ? props.theme.colors.neutral8 : props.theme.colors.neutral4)};
  background-color: ${(props) => (props.active ? props.theme.colors.neutral8 : 'transparent')};
  color: ${(props) => (props.active ? props.theme.colors.neutral1 : props.theme.colors.neutral7)};

  &[disabled] {
    background: ${(props) => props.theme.colors.neutral4};
  }
`

const Radio = ({ checked, onChange, disabled, children, block = false, sx }: RadioProps) => {
  return (
    <RadioWrapper
      onClick={(e: any) => {
        if (!!disabled || !onChange) return
        onChange(e)
      }}
      active={checked}
      disabled={disabled}
      block={block}
      className={checked ? 'active' : ''}
      sx={sx}
    >
      <span className="radio"></span>
      {children}
    </RadioWrapper>
  )
}

const Button = ({ checked, onChange, disabled, children, block = false, sx }: RadioProps) => {
  return (
    <ButtonWrapper
      onClick={(e: any) => {
        if (!!disabled || !onChange) return
        onChange(e)
      }}
      active={checked}
      disabled={disabled}
      block={block}
      className={checked ? 'active' : ''}
      sx={sx}
    >
      {children}
    </ButtonWrapper>
  )
}

const RadioGroup = ({
  value,
  defaultValue,
  options = [],
  onChange,
  disabled,
  sx,
  sxChildren,
  direction = 'horizontal',
  optionType = 'default',
  block = false,
}: RadioGroupProps) => {
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const changeValue = (option: Option) => {
    setCurrentValue(option.value)
    if (!onChange) return
    onChange(option.value)
  }
  useEffect(() => {
    if (value == null || value === currentValue) return
    setCurrentValue(value)
  }, [value, currentValue, setCurrentValue])

  return (
    <Flex
      flexDirection={direction == 'horizontal' ? 'row' : 'column'}
      justifyContent="center"
      alignContent="center"
      sx={sx}
    >
      {options.map((option: Option) =>
        optionType == 'default' ? (
          <Radio
            key={option.value}
            checked={currentValue === option.value}
            onChange={() => changeValue(option)}
            disabled={disabled}
            block={block}
            sx={sxChildren}
          >
            {option.label}
          </Radio>
        ) : (
          <Button
            key={option.value}
            checked={currentValue === option.value}
            onChange={() => changeValue(option)}
            disabled={disabled}
            block={block}
            sx={sxChildren}
          >
            {option.label}
          </Button>
        )
      )}
    </Flex>
  )
}

export default RadioGroup
