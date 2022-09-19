import React from 'react'
import { Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'

import { InputWrapper, StyledInput, StyledPrefix, StyledSuffix } from 'theme/Input'
import { SxProps } from 'theme/types'

import { InputProps, NumberInputProps } from './types'

const NumberInput = ({
  affix,
  suffix,
  block,
  sx,
  variant,
  hasError,
  control,
  isAllowed,
  isInteger,
  rules,
  ...props
}: NumberInputProps & InputProps & SxProps) => (
  <InputWrapper disabled={props.disabled} variant={hasError ? 'error' : variant} block={block} sx={sx}>
    {!!affix && <StyledPrefix>{affix}</StyledPrefix>}
    <Controller
      name={props.name || ''}
      control={control}
      shouldUnregister={true}
      rules={rules}
      defaultValue={props.defaultValue as string | number | undefined}
      render={({ field: { onChange, value, onBlur } }) => {
        return (
          <NumberFormat
            value={value}
            thousandSeparator
            decimalScale={isInteger ? 0 : undefined}
            isNumericString
            isAllowed={isAllowed}
            placeholder={props.placeholder}
            customInput={StyledInput}
            onBlur={onBlur}
            onValueChange={(v) => {
              onChange(v.value ? Number(v.value) : null)
            }}
          />
        )
      }}
    />

    {!!suffix && <StyledSuffix>{suffix}</StyledSuffix>}
  </InputWrapper>
)

export default NumberInput
