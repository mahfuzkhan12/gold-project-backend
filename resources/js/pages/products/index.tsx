import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'
import { PlusIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    },
];

interface Customizer {
    id: number;
    data?: any[];
}

export default function index() {


    const [tabSelected, setSelected] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [customizers, setData] = useState<ApiResponse>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [checklist, setChecklist] = useState<number[]>([]);
    const [deleteActive, setDeleteActive] = useState<number | false>(false);
    const [bulkDeleteActive, setBulkDeleteActive] = useState<boolean>(false);
    const [deleting, setIsDeleting] = useState<boolean | number>(false);
    const [deleteActiveName, setDeleteActiveName] = useState<string | false>(false);
    const [popOverActive, setPopoverActive] = useState<boolean>(false);
    const emptyToastProps: ToastProps = { content: null };
    const [toastProps, setToastProps] = useState<ToastProps>(emptyToastProps);
    const [searchVal, setSearchVal] = useState<string>("");
    const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
    const [firstLoaded, setFirstLoaded] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isSaveOpen, setIsSaveOpen] = useState<number | false>(false);
    const [isPublishActive, setPublishActive] = useState<boolean>(false);


    const updateCheckList = (id: number, all: boolean) => {
        let updated = [...checklist];
        if (all) {
            if (checklist.length === (customizers[currentPage]?.data?.length || 0)) {
                updated = [];
            } else {
                updated = customizers[currentPage]?.data?.map((item) => item.id) || [];
            }
        } else {
            const idx = updated.indexOf(id);
            if (idx > -1) {
                updated.splice(idx, 1);
            } else {
                updated.push(id);
            }
        }
        setChecklist(updated);
    };

    const refetchCustomizers = async (force: boolean = false, firstLoad: boolean = false) => {
        if ((isLoading && !firstLoad) && !force) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch(`/admin/api/products?page=${currentPage}&search=${searchVal}&type=${tabSelected}`);
            if (response.ok) {
                const data = await response.json();
                setIsDeleted(false);
                setData((prev) => ({ ...prev, [currentPage]: data }));
            } else {
                setData({});
            }
        } catch (error) {
            console.error("Error fetching customizers:", error);
        } finally {
            setIsLoading(false);
            setIsSearchLoading(false);
            setFirstLoaded(true);
            setChecklist([]);
        }
    };

    useEffect(() => {
        if (firstLoaded) {
            setIsSearchLoading(true);
            const timeoutId = setTimeout(() => refetchCustomizers(), 400);
            return () => clearTimeout(timeoutId);
        }
    }, [searchVal, tabSelected]);

    useEffect(() => {
        refetchCustomizers(true, true);
    }, [currentPage]);

    const deleteItem = async () => {
        if (!deleteActive) return;
        setIsDeleting(bulkDeleteActive ? 1 : true);

        try {
            const deleteIds = bulkDeleteActive ? [...checklist] : [deleteActive];
            let deletedCount = 0;

            await Promise.all(deleteIds.map(async (id) => {
                try {
                    await axios.delete(`/admin/api/customizers/ring/product/${id}`);
                    deletedCount++;
                } catch (error) {
                    console.error(`Failed to delete item ${id}`, error);
                }
            }));

            toast.show(`${bulkDeleteActive ? `${deletedCount} items` : deleteActiveName} deleted successfully`);
            setDeleteActive(false);
            setDeleteActiveName(false);
            setBulkDeleteActive(false);
            refetchCustomizers();
            setChecklist([]);
        } catch (error) {
            console.error("Error deleting items:", error);
            toast.show("Error happened!", true);
        } finally {
            setIsDeleting(false);
        }
    };

    const paginate = (page: number) => {
        setCurrentPage((prev) => prev + page);
    };

    const handleTabChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), []);



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="container mx-auto px-6 md:px-4 pt-3 grid gap-2">

                <div className='flex justify-between align-middle'>
                    <h3 className="text text-gray-800">Products list</h3>
                    <div className='flex gap-2 align-middle'>
                        <Button variant={'ghost'}> <PlusIcon /> Add new</Button>
                    </div>
                </div>

                
                <div className='border rounded'>
                    <div className='grid table-grid-row'>
                        <div className='td py-2 px-2'>
                            <Checkbox />
                        </div>
                        <div className='td py-2 px-2'>
                        </div>
                        <div className='td py-2 px-2 justify-start left'>
                            Title
                        </div>
                        <div className='td py-2 px-2'>
                            Status
                        </div>
                        <div className='td py-2 px-2'>
                            Type
                        </div>
                        <div className='td py-2 px-2'>
                            Price / Stat
                        </div>
                        <div className='td py-2 px-2'>
                            Action
                        </div>
                    </div>
                </div>


            </div>

        </AppLayout>
    )
}
