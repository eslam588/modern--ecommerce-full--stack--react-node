import React,{useEffect} from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';
import "./Pagination.css"

const Paginationcom = ({setPage,pages,page}) => {

 const  handlechange=(e,p)=>{
    setPage(p)
  }


  return (
    <div className="m-4 d-flex align-items-center justify-content-center">
      <Stack spacing={2}>
        <Pagination count={pages} variant="outlined" shape="rounded" onChange={handlechange} page={page} />
      </Stack> 
    </div>
  )
}

export default Paginationcom


