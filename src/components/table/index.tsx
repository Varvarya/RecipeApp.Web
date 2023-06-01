import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	TableState,
	Updater,
	useReactTable
} from '@tanstack/react-table';
import React from 'react';
import './styles.scss';

type TableProps = {
    data: any[]
}

type DataType = {
    ingredient: string
    amount: number
    unit: string
    exp_date: string
}

const defaultData: DataType[] = [
	{
		ingredient: 'carrot',
		amount: 1,
		unit: 'sht',
		exp_date: '10/10/2023'
	},
	{
		ingredient: 'carrot',
		amount: 1,
		unit: 'sht',
		exp_date: '10/10/2023'
	}, {
		ingredient: 'carrot',
		amount: 1,
		unit: 'sht',
		exp_date: '10/10/2023'
	},
	{
		ingredient: 'carrot',
		amount: 1,
		unit: 'sht',
		exp_date: '10/10/2023'
	},
	{
		ingredient: 'carrot',
		amount: 1,
		unit: 'sht',
		exp_date: '10/10/2023'
	},
	{
		ingredient: 'carrot',
		amount: 1,
		unit: 'sht',
		exp_date: '10/10/2023'
	},


];

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

const Table: React.FC<TableProps> = ({data = defaultData}) => {
	// Define your row shape
	const table = useReactTable({
		data: defaultData,
		getCoreRowModel: getCoreRowModel(),
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onStateChange(updater: Updater<TableState>): void {
		},
		columns: defaultColumns, renderFallbackValue: undefined, state: undefined,
	});

	return (
		<table className=''>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
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
		</table>
	);
};

export default Table;


