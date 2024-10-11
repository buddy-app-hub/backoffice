import React from "react";

export interface ITableColumn {
    label: string,
    attribute: string | string[],
    cellClass?: string,
    onRenderCell?: (entity) => React.ReactNode
}

interface TableProps<T> {
    key: string,
    columns: ITableColumn[],
    data: T[]
}

export function Table<T>(props: TableProps<T>) {
    const { key, columns, data } = props;

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    { columns.map((col, idx) => (
                        <th key={`table_${key}_col_${idx}`} scope="col" className="px-6 py-3">
                            {col.label}
                        </th>
                    )) }
                </tr>
                </thead>
                <tbody>

                {
                    data.map((entity, idx) => (
                        <tr key={`table_${key}_data_${idx}`} className="bg-white border-b text-black">
                            <TableRowCell key={`table_${key}_data_${idx}`}
                                          entity={entity}
                                          columns={columns}
                            />
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

interface TableRowCellProps<T> {
    key: string,
    entity: T,
    columns: ITableColumn[]
}

function TableRowCell<T>({ key, entity, columns } : TableRowCellProps<T>) {

    return (
        columns.map((c, idx) => (
            <td key={`${key}_data_${idx}`} className={`px-6 py-4 ${c.cellClass || ''}`}>
                {
                    c.onRenderCell ?
                        c.onRenderCell(entity)
                        :
                        Array.isArray(c.attribute) ?
                            c.attribute.reduce((acc, key) => acc && acc[key], entity)
                            :
                            entity[c.attribute] || '-'
                }
            </td>
        ))
    )
}

