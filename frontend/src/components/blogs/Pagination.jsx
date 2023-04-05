import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            {pageNumbers.map((num) => {
                return (
                    <button href="#" onClick={() => paginate(num)} className="num" key={num}>{num}</button>
                )
            })}

        </div>
    )
}

export default Pagination
