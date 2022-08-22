/* eslint-disable react/display-name */
import { SystemStyleObject } from '@styled-system/css'
import { ForwardedRef, ReactNode, forwardRef } from 'react'
import { GridProps } from 'styled-system'

import Input, { InputPassword, Textarea } from 'theme/Input'
import { InputProps, TextareaProps } from 'theme/Input/types'
import { Box, Type } from 'theme/base'
import { BoxProps, SxProps } from 'theme/types'

const InputField = forwardRef(
  (
    {
      label,
      hasError,
      block,
      sx,
      sxInput,
      ...props
    }: { label: ReactNode; sxInput?: SystemStyleObject & GridProps } & SxProps & BoxProps & InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <Box width={block ? '100%' : 'auto'} sx={sx}>
      <Type.CaptionBold color={hasError ? 'red1' : 'neutral1'} mb="8px">
        {label}
      </Type.CaptionBold>
      <Input {...props} sx={sxInput} block={block} ref={ref} variant={hasError ? 'error' : ''} />
    </Box>
  )
)

export const InputPasswordField = forwardRef(
  (
    { label, hasError, block, sx, ...props }: { label: ReactNode } & SxProps & InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <Box width={block ? '100%' : 'auto'} sx={sx}>
      <Type.CaptionBold color={hasError ? 'red1' : 'neutral4'} mb="8px">
        {label}
      </Type.CaptionBold>
      <InputPassword {...props} block={block} ref={ref} variant={hasError ? 'error' : ''} />
    </Box>
  )
)

export const TextareaField = forwardRef(
  (
    { label, hasError, block, sx, ...props }: { label: ReactNode } & SxProps & TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => (
    <Box width={block ? '100%' : 'auto'} sx={sx}>
      <Type.CaptionBold color={hasError ? 'red1' : 'neutral1'} mb="8px">
        {label}
      </Type.CaptionBold>
      <Textarea {...props} block={block} ref={ref} variant={hasError ? 'error' : ''} />
    </Box>
  )
)

export default InputField
