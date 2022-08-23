import React from 'react'
import { useParams } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumb'
import Container from 'components/Container'
import FAQContainer from 'components/FAQContainer'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import NotFound from 'components/NotFound'
import ROUTES from 'utils/routes'
import { TOKENS } from 'utils/tokens'

import CreatePlanForm from './CreatePlanForm'

const PlanCreate = () => {
  const { slug } = useParams<{ slug: string }>()
  const token: TokenData | undefined = TOKENS.find((t) => t.symbol == slug)
  if (token == undefined) {
    return <NotFound />
  }

  return (
    <DefaultLayout>
      <Container sx={{ background: 'neutral2' }}>
        <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: `Plan Create (${slug})` }]} />
        {<CreatePlanForm token={token} />}
        <FAQContainer />
      </Container>
    </DefaultLayout>
  )
}

export default PlanCreate
