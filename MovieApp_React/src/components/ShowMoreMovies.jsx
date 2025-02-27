import React from 'react'

const ShowMoreMovies = ({page, setPage}) => {
    console.log(page)
    return(

        <div  className='show_more_button self-end '>
           <button onClick={() => setPage(prevPage => prevPage + 1)} >
                show more
            </button>
        </div>
    )
}
export default ShowMoreMovies