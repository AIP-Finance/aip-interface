import { Copy, TickCircle } from 'iconsax-react'
import { useMemo, useRef, useState } from 'react'
import React from 'react'
import { toast } from 'react-toastify'

import Tooltip from 'theme/Tooltip'
import { Flex, Icon, Type } from 'theme/base'

import { Button } from '.'
import { ButtonProps } from './types'

const CopyButton = ({
  variant = 'outlineLight',
  value,
  children,
  type = 'button',
  block = false,
  sx,
  direction = 'center',
  ...props
}: ButtonProps & {
  type?: 'button' | 'submit' | 'reset'
  direction?: 'center' | 'right'
  fontSize?: 'sm' | 'md' | 'lg'
  value: string
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const copyIcon = useMemo(() => (isCopied ? <TickCircle size={16} /> : <Copy size={16} />), [isCopied])
  // onClick handler function for the copy button
  const handleCopyClick = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(value)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true)
        if (ref.current) {
          ref.current.blur()
        }
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err: any) => {
        toast.error(<Type.Small color="warning2">{err}</Type.Small>)
      })
  }

  return (
    <>
      <Button
        variant={variant}
        type={type}
        onClick={handleCopyClick}
        ref={ref}
        sx={{
          py: 1,
          px: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: direction === 'center' ? 'center' : 'space-between',
          flexDirection: direction === 'right' ? 'row-reverse' : 'row',

          ...sx,
        }}
        {...props}
        data-tip="React-tooltip"
        data-for="tt_icon_copy"
      >
        {!children ? (
          <Icon
          // mr={direction === 'center' ? 2 : 0}
          // ml={direction === 'right' ? 2 : 0}
          >
            {copyIcon}
          </Icon>
        ) : (
          <Flex alignItems="center" width={block ? '100%' : 'auto'}>
            <Type.Caption fontWeight="normal" sx={{ wordBreak: 'break-all' }}>
              {children}
            </Type.Caption>
            <Icon color="neutral4" ml={2}>
              {copyIcon}
            </Icon>
          </Flex>
        )}
      </Button>
      <Tooltip id="tt_icon_copy" place="top" type="dark" effect="solid">
        Press to copy
      </Tooltip>
    </>
  )
}

export default CopyButton
