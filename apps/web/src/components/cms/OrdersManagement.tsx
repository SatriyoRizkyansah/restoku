import { useState } from "react";
import { Eye, Trash2, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrders } from "@/hooks/useOrders";
import type { Order } from "@/types/api";

export function OrdersManagement() {
  const { orders, loading, error, deleteOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingOrder, setViewingOrder] = useState<Order | undefined>();
  const [deletingOrder, setDeletingOrder] = useState<Order | undefined>();

  const filteredOrders = (orders || []).filter(
    (order) => order.name.toLowerCase().includes(searchTerm.toLowerCase()) || order.table_number.toLowerCase().includes(searchTerm.toLowerCase()) || order.tracking_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (deletingOrder) {
      await deleteOrder(deletingOrder.id);
      setDeletingOrder(undefined);
    }
  };

  const calculateOrderTotal = (order: Order) => {
    return order.orderItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="text-sm text-muted-foreground">Total Orders: {(orders || []).length}</div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.tracking_number}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{order.table_number}</Badge>
                </TableCell>
                <TableCell>{order.orderItems.length} items</TableCell>
                <TableCell>{formatPrice(calculateOrderTotal(order))}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {formatDate(order.createdAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setViewingOrder(order)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDeletingOrder(order)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!viewingOrder} onOpenChange={(open) => !open && setViewingOrder(undefined)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order #{viewingOrder?.tracking_number}</DialogDescription>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Customer Information</h4>
                  <p>Name: {viewingOrder.name}</p>
                  <p>Table: {viewingOrder.table_number}</p>
                </div>
                <div>
                  <h4 className="font-medium">Order Information</h4>
                  <p>Tracking: {viewingOrder.tracking_number}</p>
                  <p>Date: {formatDate(viewingOrder.createdAt)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewingOrder.orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product?.name || "Unknown Product"}</TableCell>
                        <TableCell>{formatPrice(item.product?.price || 0)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{formatPrice((item.product?.price || 0) * item.quantity)}</TableCell>
                        <TableCell>{item.description || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 text-right">
                  <p className="text-lg font-bold">Total: {formatPrice(calculateOrderTotal(viewingOrder))}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewingOrder(undefined)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingOrder} onOpenChange={(open) => !open && setDeletingOrder(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>Are you sure you want to delete order "{deletingOrder?.tracking_number}"? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingOrder(undefined)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
