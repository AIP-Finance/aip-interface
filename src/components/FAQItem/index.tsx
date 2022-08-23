import { ArrowDown2, ArrowRight2 } from 'iconsax-react'
import React, { ReactNode, useCallback, useState } from 'react'

import Collapse, { CollapseButton } from 'theme/Collapse'
import { Box, Type } from 'theme/base'

const FAQItem = ({ title, content }: { title: string; content: ReactNode }) => {
  const [isOpen, setOpen] = useState(false)
  const toggle = useCallback(() => {
    setOpen((isOpen) => !isOpen)
  }, [])
  return (
    <Box sx={{ border: 'small', borderColor: isOpen ? 'primary1' : 'neutral4' }} p={16} mb={16}>
      <CollapseButton onClick={toggle}>
        <Box color="primary1" mr={12} lineHeight={0}>
          {isOpen ? <ArrowDown2 size={24} variant="Bold" /> : <ArrowRight2 size={24} variant="Bold" />}
        </Box>
        <Type.BodyBold>{title}</Type.BodyBold>
      </CollapseButton>
      <Collapse isOpen={isOpen} textAlign="left" color="neutral6">
        {content}
      </Collapse>
    </Box>
  )
}

export default FAQItem
