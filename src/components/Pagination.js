import React, { useEffect, useRef, useState } from "react";

function Pagination({currentpage, response, handle, list}) {
  
  const [page, set_page] = useState(currentpage);
  const [paginationEnable, set_paginationEnable] = useState(false);
  

  useEffect(() => {
    console.log("prevRefPage",currentpage)
    set_page(currentpage);
  }, [currentpage]);

  useEffect(() => {
    paginationEnable&&
    handle(page);
  }, [page]);
  
  const Next = () => {
    set_paginationEnable(true)
    set_page(page + 1);
  };

  const Previous = () => {
    if(!response){
        set_page(page - 1);
    } else{
        set_page(page - 1);
    }
  };


  return (
    <>
      <button
        className="btn btn-sm btn-info font-size-13"
        disabled={page > 1 ? false : true}
        onClick={Previous}
      >
        &lt;&lt; Previous
      </button>

      <button
        className="btn btn-sm btn-info font-size-13 ms-1"
        disabled={0 < list ? false : true}
        onClick={Next}
      >
        Next &gt;&gt;
      </button>
    </>
  );
}

export default Pagination;
