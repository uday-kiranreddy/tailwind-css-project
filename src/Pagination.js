import React from 'react'

function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
        <ul className='pagination flex justify-center text-center align-middle space-x-5 '><span className='pt-2'> Navigate</span>
         {pageNumbers.map(number => (
            <li key={number} className='cursor-pointer text-white hover:bg-gray-400 page-item bg-gray-500 px-4 py-2'>
              <a onClick={() => paginate(number)} href='!#' className='page-link'>
                {number}  
              </a>
            </li>
          ))}
        </ul>
    );
}

export default Pagination