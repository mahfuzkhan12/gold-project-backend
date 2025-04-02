import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'
import { PlusIcon } from 'lucide-react';


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

export default function index() {
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
