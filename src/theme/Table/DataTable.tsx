import React, { ReactNode, useState } from 'react'
import { useQuery } from 'react-query'

import { ApiListResponse, ApiMeta } from 'apis/api'
import Table, { ColumnProps } from 'theme/Table'
import { Box } from 'theme/base'
import { DEFAULT_LIMIT } from 'utils/constants'
import { pageToOffset } from 'utils/parsers'

const TableWrapper = ({ children }: { children: ReactNode }) => (
  <Box px={[16, 32]} py={16} variant="card" bg="neutral8">
    {children}
  </Box>
)

const DataTable = <T, K>({
  dataKey,
  address,
  columns,
  minWidth,
  externalSource,
  api,
}: {
  dataKey: string
  address: string
  minWidth?: string
  columns: ColumnProps<T, K>[]
  externalSource?: K
  api: (address: string, pagination: Partial<ApiMeta>) => Promise<ApiListResponse<T> | null>
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoading, data } = useQuery<ApiListResponse<T> | null>(
    [dataKey, address, currentPage],
    () => api(address, { offset: pageToOffset(currentPage, DEFAULT_LIMIT) }),
    {
      keepPreviousData: true,
      enabled: !!address,
    }
  )

  return (
    <TableWrapper>
      <Table
        minWidth={minWidth}
        columns={columns}
        loading={isLoading}
        dataSource={data?.data}
        externalSource={externalSource}
        pagination={{
          totalPage: data?.meta.totalPages || 0,
          onPageChange: setCurrentPage,
          currentPage,
        }}
      />
    </TableWrapper>
  )
}

export default DataTable
