import { Metadata } from "next";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { getMyOrders } from "@/lib/actions/order.actions";
import Pagination from "@/components/shared/pagination";

export const metadata: Metadata = { title: 'My Orders' };

type SearchParams = Promise<{ [page: string]: string | string[] | undefined }>

async function OrdersPage({ searchParams }: { searchParams: SearchParams }) { //async function OrdersPage(props: { searchParams: SearchParams }) { 
    const { page } = await searchParams;  //const { page } = await props.searchParams;
    const orders = await getMyOrders({ page: Number(page) || 1 });

    return (
        <div className='space-y-2'>
            <h2 className='h2-bold'>Orders</h2>
            <div className='overflow-x-auto'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>TOTAL</TableHead>
                            <TableHead>PAID</TableHead>
                            <TableHead>DELIVERED</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orders.data.map(function (order) {
                                return (
                                    <TableRow key={order.id}>
                                        <TableCell>{formatId(order.id)}</TableCell>
                                        <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                                        <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                                        <TableCell>{order.isPaid && order.paidAt ? (formatDateTime(order.paidAt).dateTime) : 'Not Paid'}</TableCell>
                                        <TableCell>{order.isDelivered && order.deliveredAt ? (formatDateTime(order.deliveredAt).dateTime) : 'Not Delivered'}</TableCell>
                                        <TableCell>
                                            <Link href={`/order/${order.id}`}>
                                                <span className='px-2'>Details</span>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                {
                    orders.totalPages > 1 && <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />
                }
            </div>
        </div>
    );
};

export default OrdersPage;