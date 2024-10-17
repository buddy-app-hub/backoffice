import React from "react";
import moment from "moment";

export enum TableColumnType {
    Default,
    Date
}

export interface ITableColumn<T> {
    label: string,
    attribute: string | string[],
    type?: TableColumnType,
    cellClass?: string,
    onRenderCell?: (entity: T) => React.ReactNode
}

interface TableProps<T extends Record<string, any>> {
    key: string,
    columns: ITableColumn<T>[],
    data?: T[]
}

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
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
                    data ?
                        data.map((entity, idx) => (
                            <tr key={`table_${key}_data_${idx}`} className="bg-white border-b text-black">
                                <TableRowCell key={`table_${key}_data_${idx}`}
                                              entity={entity}
                                              columns={columns}
                                />
                            </tr>
                        ))
                        :
                        <TableBodyLoading colSpan={columns.length} />
                }
                </tbody>
            </table>
        </div>
    )
}

interface TableRowCellProps<T extends Record<string, any>> {
    key: string,
    entity: T,
    columns: ITableColumn<T>[]
}

function TableRowCell<T extends Record<string, any>>({ key, entity, columns } : TableRowCellProps<T>) {

    const renderValue = (c: ITableColumn<T>) : string => {
        let value = '-';

        if (Array.isArray(c.attribute)) return value;

        const valueAttribute = entity[c.attribute];

        if (valueAttribute) {
            switch (c.type) {
                case TableColumnType.Date:
                    value = moment(valueAttribute).format("DD/MM/YYYY");
                    break;
                case TableColumnType.Default:
                default:
                    value = entity[c.attribute];
            }
        }

        return value;
    }

    return (
        columns.map((c, idx) => (
            <td key={`${key}_data_${idx}`} className={`px-6 py-4 ${c.cellClass || ''}`}>
                {
                    c.onRenderCell ?
                        <div>
                            {c.onRenderCell(entity)}
                        </div>
                        :
                        Array.isArray(c.attribute) ?
                            <div>
                                {
                                    (() => {
                                        const value = c.attribute.reduce((acc, key) => acc && acc[key], entity);

                                        // Verificamos si el valor es renderizable
                                        if (typeof value === 'string' || typeof value === 'number') {
                                            return value;
                                        } else if (typeof value === 'object') {
                                            return JSON.stringify(value); // Serializa si es un objeto
                                        } else {
                                            return ''; // O muestra un valor por defecto
                                        }
                                    })()
                                }
                            </div>
                            :
                            renderValue(c)
                }
            </td>
        ))
    )
}

interface TablyBodyLoadingProps {
    colSpan: number
}

function TableBodyLoading({ colSpan }: TablyBodyLoadingProps) {
    return (
        Array.from({ length: 10 }).map((_, idx) => (
            <tr key={`table_body_loading_${idx}`} className="animate-pulse">
                <td colSpan={colSpan}>
                    <div className="h-3.5 bg-gray-200 rounded w-full mt-2.5 mb-2"></div>
                </td>
            </tr>
        ))
    )
}

