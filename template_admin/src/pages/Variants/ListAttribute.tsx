import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Pencil, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {Attribute} from "../../core/Attribute.ts";
import {deleteAttribute, getAllAttribute} from "../../service/AttributeService.ts";

export const ListAttribute = () => {
    const [attribute, setAttribute] = useState<Attribute[]>([])
    useEffect(() => {
        renderData()
    }, []);

    function renderData() {
        getAllAttribute(0, 10).then((res) => {
            setAttribute(res.content)
        })
    }

    const handleUpdate = (id: number) => {
        console.log("id update : " + id)
    }
    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa thuộc tính này không?");
        if (isConfirmed) {
            deleteAttribute(id).then(() => {
                renderData()
                alert("Xóa thành công!");
            })
        }
    }
    return (
        <>
            <PageMeta
                title="Dashbroad Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách thuộc tính"/>
            <div className="space-y-6">
                <div
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        STT
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Tên thuộc tính
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {attribute.map((attr, index) => (
                                    <TableRow key={attr.id}>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {attr.name}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Pencil size={16}/>}
                                                        onClick={() => handleUpdate(attr.id)}>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16}/>}
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(attr.id)}
                                                >
                                                </Button>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}