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

  const dispatch= useDispatch();
  const [page , setPage] = useState(1)
  const [keyword , setKeyword] =useState("")


  useEffect(() => {
    dispatch(getproducts())
  },[])


  // search

  const handlesubmit = (e) => {
      e.preventDefault();
      dispatch(getproducts({keyword,page}))   
  }


   useEffect(() => {
      if(keyword){
      dispatch(getproducts({keyword,page}))
      }
   },[page,keyword])


   
  useEffect(() => { 
    if(!keyword && page>1 ){
      setPage(1)
    }
 },[keyword])
   

  return (
    
    <div className='products-page mt-5 pt-5 '>
      <Search handlesubmit={handlesubmit} setKeyword={setKeyword} keyword={keyword}  />
      <div className="products-filter">
            <div className="row">
              <div className='col-12 col-md-6 col-lg-3'>
                <Filter keyword={keyword} page={page} />
              </div>
              <div className='col-12 col-md-6 col-lg-9'>
                <Productscom products={data.products} isLoading={isLoading}  error={error} />
              </div>
           </div>
      </div>
      { 
        data.products?.length > 0 &&   <Paginationcom setPage={setPage} pages={data?.paging?.totalPages} keyword={keyword} page={page} />
      }
     
    </div>
  )
}

export default Products