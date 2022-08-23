import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PlanData } from 'apis/plan'
import Divider from 'components/Divider'
import { Button } from 'theme/Buttons'
import NumberInputField from 'theme/InputField/NumberInputField'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'

const MIN_ENTER = 0

const WithdrawPlanModal = ({ isOpen, setIsOpen, plan }: { plan: PlanData } & any) => {
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
      title="Withdraw Assets"
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
              rules={{ required: true, min: MIN_ENTER, max: plan.tokenAmount }}
              label={
                <Flex justifyContent="space-between" width={'100%'} alignItems="center" mb="8px">
                  <Type.Body color={'neutral8'}>Amount</Type.Body>
                  <Type.Small color={'primary1'}>{plan.tokenAmount}</Type.Small>
                </Flex>
              }
              required
              control={control}
              name="amount"
              hasError={Boolean(errors?.amount)}
              suffix={<Type.Small color="primary1">Max</Type.Small>}
              block
            />
            {errors?.amount?.type?.toString() === 'required' && (
              <Type.Small color="warning2">Enter your amount</Type.Small>
            )}
            {errors?.amount?.type?.toString() === 'min' && <Type.Small color="warning2">Min: {MIN_ENTER}</Type.Small>}
            {errors?.amount?.type?.toString() === 'max' && (
              <Type.Small color="warning2">Max: {plan.tokenAmount}</Type.Small>
            )}
          </Box>

          <Divider my={3} />
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
        </Box>
      </form>
    </Modal>
  )
}

export default WithdrawPlanModal
