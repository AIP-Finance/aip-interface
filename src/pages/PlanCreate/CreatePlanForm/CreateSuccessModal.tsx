import React from 'react'
import { Link } from 'react-router-dom'

import IconTick from 'assets/images/icon/tick-square.svg'
import { Button } from 'theme/Buttons'
import Modal from 'theme/Modal'
import { Box, Image, Type } from 'theme/base'
import ROUTES from 'utils/routes'

const CreateSuccessModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => {
  return (
    <Modal isOpen={isOpen} width="448px" maxWidth="448px" hasClose onDismiss={() => setIsOpen(false)}>
      <Box textAlign="center">
        <Image src={IconTick} width={72} height={72} />
        <Type.H5 mb={16} mt={24}>
          Create Plan Successfully
        </Type.H5>
        <Link to={ROUTES.PLAN_MANAGEMENT.path}>
          <Button type="submit" variant="outlinePrimary" size="lg" px={4} block mr={3}>
            View My Plan
          </Button>
        </Link>
      </Box>
    </Modal>
  )
}

export default CreateSuccessModal
