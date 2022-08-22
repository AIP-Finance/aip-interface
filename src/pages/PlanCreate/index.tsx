import React from 'react'

import Breadcrumb from 'components/Breadcrumb'
import Container from 'components/Container'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import ROUTES from 'utils/routes'

import CreatePlanForm from './CreatePlanForm'

const PlanCreate = () => {
  return (
    <DefaultLayout>
      <Container sx={{ background: 'neutral2' }}>
        <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'Plan Create' }]} />
        <CreatePlanForm />
      </Container>
    </DefaultLayout>
  )
}

export default PlanCreate
