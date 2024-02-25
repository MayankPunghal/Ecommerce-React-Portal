import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize }) => {
  return (
    <div className="flex justify-end mt-4">
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-2"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-2"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
