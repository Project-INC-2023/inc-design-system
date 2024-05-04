
import { ChevronRight, ChevronLeft } from "lucide-react";

type PageProps = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
};


const PageNumbers = ({
  itemsPerPage,
  totalItems,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}: PageProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4">
      <ul className="pagination flex flex-row">
        {currentPage == 1 ? (
          <li className="rounded border-1 border-grey-200 opacity-25">
            <ChevronLeft />
          </li>
        ) : (
          <li
            onClick={previousPage}
            className="rounded border-1 cursor-pointer border-grey-200"
          >
            <ChevronLeft />
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`rounded pl-2 pr-2 mx-2 curser-pointer ${
              number === currentPage
                ? "border-primary border-2 text-primary"
                : " hover:text-primary border-2 border-grey-200 cursor-pointer"
            }`}
          >
            {number}
          </li>
        ))}

        {currentPage >= (totalItems/itemsPerPage) ? (
          <li className="rounded border-1 border-grey-200 opacity-25">
            <ChevronRight />
          </li>
        ) : (
          <li
            onClick={nextPage}
            className="rounded border-1 cursor-pointer border-grey-200"
          >
            <ChevronRight />
          </li>
        )}
      </ul>
    </div>
  );
};

export default PageNumbers;