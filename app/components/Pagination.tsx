import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import React from 'react'

type PaginationProps = {
    page?: string;
    totalPages: number;
    hasNextPage: boolean;
}

const Pagined = (props: PaginationProps) => {
    const { page = 1, totalPages, hasNextPage } = props
    const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

    const getPagesToShow = () => {
        let startPage = currentPage - 2;
        let endPage = currentPage + 2;

        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages;
        }

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i,
        );
    };

    const pages = getPagesToShow();
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={`?page=${currentPage - 1}`} />
                    </PaginationItem>
                    {pages.map((page, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href={`?page=${page}`} isActive={page === currentPage}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {hasNextPage && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext href={`?page=${currentPage + 1}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
export default Pagined