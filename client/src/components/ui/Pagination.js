// client/src/components/ui/Pagination.js
import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, page, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center mt-6">
        <ul className="flex space-x-1">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={
                  keyword
                    ? `/?keyword=${keyword}&page=${x + 1}`
                    : `/?page=${x + 1}`
                }
                className={`px-3 py-1 border rounded ${
                  x + 1 === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Pagination;
