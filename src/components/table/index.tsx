import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	RowData,
	TableState,
	Updater,
	useReactTable
} from '@tanstack/react-table';
import React, {useState} from 'react';
import './styles.scss';
import Button from '../button';
import {Filter} from './components';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

type TableProps = {
    data: any[]
}

type DataType = {
    ingredient: string
    amount: number
    unit: string
    exp_date: string
}

const columnHelper = createColumnHelper<DataType>();

const defaultColumns = [
	// Grouping Column
	columnHelper.group({
		id: 'Ingredient',
		footer: info => info.column.id,
		columns: [
			// Accessor Column
			columnHelper.accessor('ingredient', {
				cell: info => info.getValue(),
				header: () => <span>Ingredient</span>,
				footer: info => info.column.id,
			}),
		],
	}),
	// Grouping Column
	columnHelper.group({
		header: 'Additional info',
		footer: info => info.column.id,
		columns: [
			// Accessor Column
			columnHelper.accessor('amount', {
				header: () => <span>Amount</span>,
				footer: info => info.column.id,
			}),
			// Accessor Column
			columnHelper.accessor('unit', {
				header: () => <span>Unit</span>,
				footer: info => info.column.id,
			}),
			// Accessor Column
			columnHelper.accessor('exp_date', {
				header: () => <span>Exp date</span>,
				footer: info => info.column.id,
			}),
		],
	}),
];

const defaultColumn: Partial<ColumnDef<DataType>> = {
	cell: ({getValue, row: {index}, column: {id}, table}) => {
		const initialValue = getValue();
		// We need to keep and update the state of the cell normally
		const [value, setValue] = React.useState(initialValue);

		// When the input is blurred, we'll call our table meta's updateData function
		const onBlur = () => {
			table.options.meta?.updateData(index, id, value);
		};

		// If the initialValue is changed external, sync it up with our state
		React.useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		return (
			<input
				value={value as string}
				onChange={e => setValue(e.target.value)}
				onBlur={onBlur}
			/>
		);
	},
};

const CustomTable: React.FC<TableProps> = ({data}) => {
	const [tableData, setTableData] = useState(data);
	const rerender = React.useReducer(() => ({}), {})[1];

	// Define your row shape
	const table = useReactTable({
		data: tableData,
		defaultColumn: defaultColumn,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		meta: {
			updateData: (rowIndex: number, columnId: string, value: string | unknown) => {
				// Skip page index reset until after next rerender
				setTableData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex]!,
								[columnId]: value,
							};
						}
						return row;
					})
				);
			},
		},
		debugTable: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onStateChange(updater: Updater<TableState>): void {
		},
	});

	return (
		<table className='table'>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<div>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{header.column.getCanFilter() ? (
												<Filter column={header.column} table={table}/>
											) : null}
										</div>
									)}
								</th>
							);
						})}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => {
					return (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => {
								return (
									<td key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
			{data.length > 5 && <tfoot>
				{table.getFooterGroups().map(footerGroup => (
					<tr key={footerGroup.id}>
						{footerGroup.headers.map(header => (
							<th key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.footer,
										header.getContext()
									)}
							</th>
						))}
					</tr>
				))}
			</tfoot>}
			<div className='table-controllers'>
				<div className='row'>
					<Button
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
						text={'<<'}
						size='small'
						form='round'
						color='opposite'
					/>
					<Button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						text={'<'}
						size='small'
						form='round'
						color='opposite'
					/>
					<Button
						onClick={() => table.nextPage()}
						size='small'
						disabled={!table.getCanNextPage()}
						text={'>'}
						form='round'
						color='opposite'
					/>
					<Button
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
						text={'>>'}
						size='small'
						form='round'
						color='opposite'
					/>
				</div>
				<div className='row'>
					<h4 className='pages-container'>Page <strong>{`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</strong> |
                        Go to page:</h4>
				</div>

				<div className='row'>
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="small-button"
					/>
					<select
						value={table.getState().pagination.pageSize}
						onChange={e => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
                                Show {pageSize}
							</option>
						))}
					</select>
				</div>

			</div>
			<Button size='small' onClick={() => rerender()} text={'Force Rerender'} color='opposite'/>

		</table>
	);
};

export default CustomTable;


