import React,{useEffect,useState} from 'react'
import Productscom from '../../components/Productscom/Productscom'
import Search from '../../components/Search/Search'
import Paginationcom from '../../components/Paginationcom/Paginationcom'
import { useSelector, useDispatch } from 'react-redux'
import {getproducts} from "../../store/productSlice";
import {filterproducts} from "../../store/productSlice";

const Products = () => {
  
  //get all products
  const {data,isLoading, error} = useSelector((state)=> state.product)
  const dispatch= useDispatch();
  const [page , setPage] = useState(1)
  const [keyword , setKeyword] =useState("")

  // search

  const handlesubmit = (e) => {
        e.preventDefault();
        setPage(1)
        dispatch(filterproducts(keyword.trim()))
        
    }
  //pagination 
  
  useEffect(() => {
      dispatch(getproducts(page))
  }, [dispatch,page])


  return (
    <div>
      <Search handlesubmit={handlesubmit} setKeyword={setKeyword} keyword={keyword}  />
      <Productscom products={data.products} isLoading={isLoading}  error={error} />
      <Paginationcom page={page} setPage={setPage} pages={data?.paging?.totalPages} />
    </div>
  )
}

export default Products