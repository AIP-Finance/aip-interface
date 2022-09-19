// eslint-disable-next-line no-restricted-imports
import { Trans } from '@lingui/macro'
import React, { ReactNode } from 'react'

import Loading from 'theme/Loading'
import { Box, Flex, Type } from 'theme/base'

import Pagination, { PaginationProps } from '../Pagination'

export declare type TableSize = 'small' | 'medium' | 'large'
export declare type AlignType = 'left' | 'right' | 'center'

export type ColumnProps<T, K = unknown> = {
  title: ReactNode
  key?: React.Key
  align?: AlignType
  width?: string | number | string[] | number[]
  render?: (text: T, index: number, externalSource?: K) => React.ReactNode
}

export type TableProps<T, K = unknown> = {
  loading?: boolean
  dataSource?: T[]
  externalSource?: K
  minWidth?: string | number
  columns: ColumnProps<T, K>[]
  pagination?: PaginationProps | false
  footer?: ReactNode
  emptyMessage?: string | ReactNode
}

function Table<T, K = unknown>({
  loading = false,
  minWidth = '650px',
  dataSource,
  externalSource,
  columns,
  emptyMessage,
  pagination,
}: TableProps<T, K>) {
  if (loading) {
    return <Loading />
  }

  if (!dataSource || dataSource?.length <= 0) {
    if (!!emptyMessage) {
      return typeof emptyMessage == 'string' ? (
        <Box color="neutral5">
          <Type.Caption>{emptyMessage}</Type.Caption>
        </Box>
      ) : (
        <>{emptyMessage}</>
      )
    }
    return (
      <Box color="neutral4">
        <Type.CaptionBold>
          <Trans>No Data Found</Trans>
        </Type.CaptionBold>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Flex
          minWidth={minWidth}
          justifyContent="space-between"
          color="neutral4"
          pb={2}
          sx={{ borderBottom: '1px dashed', borderColor: 'neutral6' }}
        >
          {columns &&
            columns.map((column) => (
              <Box key={column.key} width={column.width} maxWidth={column.width} textAlign={column.align}>
                <Type.BodyBold color="neutral1">{column.title}</Type.BodyBold>
              </Box>
            ))}
        </Flex>

        <Flex flexDirection="column" minWidth={minWidth}>
          {dataSource &&
            dataSource.map((data: any, index: any) => (
              <Flex
                key={index}
                justifyContent="space-between"
                alignItems="center"
                py={2}
                sx={{ borderBottom: '1px dashed', borderColor: 'neutral6' }}
              >
                {columns &&
                  columns.map((column) => (
                    <Box key={column.key} width={column.width} maxWidth={column.width} textAlign={column.align}>
                      <Type.Body color="neutral3">
                        {column?.render && column.render(data, index, externalSource)}
                      </Type.Body>
                    </Box>
                  ))}
              </Flex>
            ))}
        </Flex>
      </Box>
      <Flex justifyContent="center" mt={3}>
        {pagination && (
          <Pagination
            totalPage={pagination.totalPage}
            onPageChange={(page) => {
              window.scrollTo(0, 0)
              pagination.onPageChange(page)
            }}
            currentPage={pagination.currentPage}
          />
        )}
      </Flex>
    </>
  )
}

export default Table
