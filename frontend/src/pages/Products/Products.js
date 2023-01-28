import React,{useEffect,useState,useCallback} from 'react'
import Productscom from '../../components/Productscom/Productscom'
import Search from '../../components/Search/Search'
import Paginationcom from '../../components/Paginationcom/Paginationcom'
import { useSelector, useDispatch } from 'react-redux'
import {getproducts} from "../../store/productSlice";
import Filter from './../../components/Filter/Filter';

const Products = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  //get all products
  const {data,isLoading, error} = useSelector((state)=> state.product)

  console.log(isLoading)
  const dispatch= useDispatch();
  const [page , setPage] = useState(1)
  const [keyword , setKeyword] =useState("")


  useEffect(() => {
    setPage(1)
    dispatch(getproducts({keyword,page}))
  },[])


  // search

  const handlesubmit = (e) => {
        e.preventDefault();
        setPage(1)
        dispatch(getproducts({keyword,page}))
        
    }
  //pagination 
  
   useEffect(() => {
     dispatch(getproducts({keyword,page}))
   },[page])

   const filterSelect = useCallback((category) => {
    dispatch(getproducts({keyword,page,category}))
   })


  return (
    <div className='products-page mt-5 pt-5 '>
      <Search handlesubmit={handlesubmit} setKeyword={setKeyword} keyword={keyword}  />
      <div className="products-filter">
            <div className="row">
              <div className='col-12 col-md-6 col-lg-3'>
                <Filter filterSelect={filterSelect}  />
              </div>
              <div className='col-12 col-md-6 col-lg-9'>
                <Productscom products={data.products} isLoading={isLoading}  error={error} />
              </div>
           </div>
      </div>
      <Paginationcom page={page} setPage={setPage} pages={data?.paging?.totalPages} />
      {/* <Filter /> */}
    </div>
  )
}

export default Products