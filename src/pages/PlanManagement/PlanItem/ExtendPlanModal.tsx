import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PlanData } from 'apis/plan'
import Divider from 'components/Divider'
import { Button } from 'theme/Buttons'
import NumberInputField from 'theme/InputField/NumberInputField'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'

const MIN_ENTER = 1
const MAX_PERIODS = 10000

const ExtendPlanModal = ({ isOpen, setIsOpen, plan }: { plan: PlanData } & any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const [submitting, setSubmitting] = useState(false)

  const onSubmit = useCallback(
    async (values) => {
      if (submitting) return
      console.log(values)
    },
    [submitting]
  )

  return (
    <Modal
      title="Extend Subscription"
      isOpen={isOpen}
      width="448px"
      maxWidth="448px"
      hasClose
      onDismiss={() => setIsOpen(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box>
            <NumberInputField
              rules={{ required: true, min: MIN_ENTER, max: MAX_PERIODS }}
              label={'Add Period'}
              required
              control={control}
              name="period"
              hasError={Boolean(errors?.period)}
              block
            />
            {Boolean(errors?.period) && <Type.Small color="warning2">Enter your total period</Type.Small>}
            {errors?.periods?.type?.toString() === 'max' && <Type.Small color="warning2">max {MAX_PERIODS}</Type.Small>}
          </Box>

          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Your balance:</Type.Body>
            <Type.BodyBold color="primary1">{1000} USDT</Type.BodyBold>
          </Flex>

          <Divider mt={3} />
          <Button
            type="submit"
            variant="outlinePrimary"
            size="lg"
            px={4}
            block
            mr={3}
            isLoading={submitting}
            disabled={submitting}
          >
            Confirm
          </Button>

          <Type.Small color="neutral5" mt={3}>
            You can cancel and withdraw all USDT at any time without any fee
          </Type.Small>
        </Box>
      </form>
    </Modal>
  )
}

export default ExtendPlanModal
