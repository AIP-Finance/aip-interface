import React from 'react'

import { PlanData } from 'apis/plan'
import Divider from 'components/Divider'
import { Button } from 'theme/Buttons'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'

const CancelPlanModal = ({ isOpen, setIsOpen, plan }: { plan: PlanData } & any) => {
  return (
    <Modal
      title="Cancel Plan"
      isOpen={isOpen}
      width="448px"
      maxWidth="448px"
      hasClose
      onDismiss={() => setIsOpen(false)}
    >
      <Box>
        <Type.Body>Cancel plan and receive your assets</Type.Body>
        <Flex mt={3} justifyContent="space-between" alignItems="center">
          <Type.Body>Total BNB:</Type.Body>
          <Type.BodyBold>{plan.tokenAmount}</Type.BodyBold>
        </Flex>
        <Flex mt={3} justifyContent="space-between" alignItems="center">
          <Type.Body>Total USDT:</Type.Body>
          <Type.BodyBold>{plan.amount}</Type.BodyBold>
        </Flex>
        <Divider mt={3} />
        <Button type="submit" variant="outlinePrimary" size="lg" px={4} block mr={3}>
          Confirm Cancel
        </Button>
      </Box>
    </Modal>
  )
}

export default CancelPlanModal
