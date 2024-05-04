"use client";

import PageNumbers from "./PageNumbers";
import Header from "../header";
import Footer from "../footer";
import React, { forwardRef, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const paginatedVariant = cva("flex", {
  variants: {
    variant: {
      default: "flex flex-col flex-grow:1",
      horizontal: "flex flex-row flex-grow:1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PaginatedListProps
  extends VariantProps<typeof paginatedVariant> {
  itemsPerPage: number;
  children: React.ReactNode;
  header?: string;
  horizontal?: boolean;
  className?: string;
}

const PaginatedList = forwardRef<HTMLDivElement, PaginatedListProps>(
  ({ children, className, variant, ...props }, forwardRef) => {
    // Storage of info of pages
    // So that user can pass their own children

    const childrenArray = React.Children.toArray(children);

    const [items, setItems] = React.useState<React.ReactNode[]>(childrenArray);
    const arrayCount: number = childrenArray.length;
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = React.useState<number>(
      props.itemsPerPage
    );

    useEffect(() => {
      setItems(childrenArray);
    }, []);

    // Getting the indexes required per page
    const indexOfLastPost = currentPage * itemsPerPage;

    const indexOfFirstPost = Math.min(
      (currentPage - 1) * itemsPerPage,
      items.length - 1
    );

    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
    const previousPage = () => {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const nextPage = () => {
      if (currentPage !== Math.ceil(items.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
      <div className={cn("", className)}>
        {props.header && <Header header={props.header} />}
        <div className={cn(paginatedVariant({ variant }), className)}>
          {currentPosts.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>

        <div className="flex justify-end">
          <PageNumbers
            itemsPerPage={itemsPerPage}
            totalItems={arrayCount}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
); // Add closing parenthesis here

export default PaginatedList;
