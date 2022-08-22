import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Box, Flex, Type } from 'theme/base'

export type BreadcrumbItem = {
  title: ReactNode
  path?: string
}

const renderBreadcrumbItem = (item: BreadcrumbItem) =>
  item.path ? (
    <Link to={item.path}>
      <Type.Small color="neutral6">{item.title}</Type.Small>
    </Link>
  ) : (
    <Type.Small color="primary1">{item.title}</Type.Small>
  )

const Breadcrumb = ({ items }: { items?: BreadcrumbItem[] }) => {
  return (
    <Box pt={47} pb={20}>
      <Box>
        {items?.length === 1 ? (
          <Type.H4 textAlign="center">{items?.[0]?.title}</Type.H4>
        ) : (
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              {items?.map((item, index) => {
                if (index === items.length - 1) {
                  return <div key={index}>{renderBreadcrumbItem(item)}</div>
                }
                return (
                  <Flex key={index} color="neutral3">
                    {renderBreadcrumbItem(item)}
                    <Type.Small mx={2} color="neutral6">
                      {'/'}
                    </Type.Small>
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default Breadcrumb
