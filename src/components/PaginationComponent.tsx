// src/components/PaginationComponent.tsx
"use client";

import { usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
  pageCount: number;
  currentPage: number;
}

export function PaginationComponent({ pageCount, currentPage }: PaginationComponentProps) {
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  
  // Создаем массив страниц для отображения
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        {/* Кнопка "Назад" */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Номера страниц */}
        {pages.map(page => (
           <PaginationItem key={page}>
              <PaginationLink href={createPageURL(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
           </PaginationItem>
        ))}

        {/* Кнопка "Вперед" */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}