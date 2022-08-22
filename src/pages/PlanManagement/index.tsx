import React from 'react'

import Breadcrumb from 'components/Breadcrumb'
import Container from 'components/Container'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import ROUTES from 'utils/routes'

import CreatePlanForm from './CreatePlanForm'

const PlanManagement = () => {
  return (
    <DefaultLayout>
      <Container sx={{ background: '#23262F' }}>
        <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'Plan Management' }]} />
        <CreatePlanForm />
      </Container>
    </DefaultLayout>
  )
}

export default PlanManagement
