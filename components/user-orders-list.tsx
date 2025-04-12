"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const orders = [
  {
    id: "ORD-001",
    modelName: "Robot Figurine",
    date: "2023-04-10",
    status: "processing",
    price: 24.99,
  },
  {
    id: "ORD-002",
    modelName: "Phone Stand",
    date: "2023-03-28",
    status: "delivered",
    price: 12.5,
  },
  {
    id: "ORD-003",
    modelName: "Custom Keychain",
    date: "2023-03-15",
    status: "delivered",
    price: 8.75,
  },
];

export function UserOrdersList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.modelName}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "processing"
                        ? "default"
                        : order.status === "delivered"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${order.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View order</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
