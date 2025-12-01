import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import {useEffect, useState} from "react";
import {getOrderRecent} from "../../service/OrderService.ts";

interface Attributes {
  id: number;
  value: string;
}
interface Product {
  productName: string;
  variants: string;
  categoryName: string;
  price: string;
  imageUrl: string;
  status: string;
  attributeValues: Attributes;
}


export default function RecentOrders() {

  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    getOrderRecent().then((res) => {
      console.log(res)
      setProducts(res.data)
    })
  },[])
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Đơn hàng gần đây
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Sản phẩm
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Danh mục
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Giá
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {products.map((product) => (
                <TableRow key={product.productName} className="">

                  {/* Product column */}
                  <TableCell className="py-3 max-w-[300px]">
                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <div className="h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-md">
                        <img
                            src={product.imageUrl}
                            className="h-[50px] w-[50px] object-cover"
                            alt={product.productName}
                        />
                      </div>

                      {/* Name + Attribute */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90 line-clamp-2">
                          {product.productName}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400 line-clamp-1">
              {product.attributeValues?.value || ""}
            </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 max-w-[120px] truncate">
                    {product.categoryName}
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 max-w-[100px] truncate">
                    {product.price}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 max-w-[100px]">
                    <Badge size="sm">{product.status}</Badge>
                  </TableCell>

                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
