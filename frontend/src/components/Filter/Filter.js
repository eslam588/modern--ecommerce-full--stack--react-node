import React,{useState,useEffect,useRef,useCallback} from 'react'
import "./Filter.css"
import CheckBox from '../checkBox/Checkbox';
import { useSelector, useDispatch } from 'react-redux'
import {getallcategories} from "../../store/categorySlice"
import {getproducts} from "../../store/productSlice"


const Filter = ({keyword,page}) => {


 const {data} = useSelector((state)=> state.category)
 const dispatch = useDispatch();

 useEffect(()=> {
    dispatch(getallcategories())
 },[])

 let [categoriesname, setCategoriesName] = useState([])
 
 let  filtercat = (catName,input) => {
   if(input.checked){  
      setCategoriesName([...categoriesname,catName])
   }
   else{
      let filtercats = categoriesname.filter((cat) => cat != catName)
      setCategoriesName([...filtercats])
   }
  }

  useEffect(()=>{
       dispatch(getproducts({keyword,page,categoriesname}))
  },[categoriesname,page])


    return (
            <div className="catalog">
                <div className="catalog-filter"  >
                     <h4>Category</h4> 
                     <div className='filter-box'>
                     {
                     data.length > 0 &&  data?.map((item,index)=>(
                        <div  key={index} className="checkbox-filter">
                           <CheckBox catName={item.catName} onChange={(input)=> filtercat(item.catName,input)} />
                        </div>
                     ))
                     }
                     </div>
                 </div>
            </div>
     )
}
export default Filter

