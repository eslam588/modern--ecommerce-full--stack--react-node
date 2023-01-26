import React,{useState} from 'react'
import "./Filter.css"
import CheckBox from '../checkBox/Checkbox';
import { useSelector, useDispatch } from 'react-redux'


const Filter = ({filterSelect}) => {


 const category = ["All","Shoes","Electronics","Clothes"]
 const [filter , setFilter] = useState([]);
 
 const dispatch = useDispatch();
    

    return (
            <div className="catalog">
                 {/* ref={filterRef} */}
                <div className="catalog-filter"  >
                            <h4>Products Category</h4> 
                            <div className='filter-box'>
                            {
                               category.map((item,index)=>(
                                   <div  key={index} className="checkbox-filter">
                                       <CheckBox 
                                             label={item}
                                             onChange={(input) => filterSelect(item)}
                                            //  checked={filter.category.includes(item.categorySlug)}
                                       />
                                   </div>
                               ))
                            }
                            </div>
                 </div>
            </div>
     )
}

export default Filter




// const initialFilter={
//     category: [],
//     color: [],
//     size: []
// }
// const [products , setProducts] = useState(productList);
// const [filter , setFilter] = useState(initialFilter);

// const filterSelect = (type , checked , item) => {
//     if(checked) {
//         switch(type) {
//             case "CATEGORY":
//                  setFilter({...filter , category : [...filter.category , item.categorySlug]});
//                  break
//             case "COLOR":
//                  setFilter({...filter , color : [...filter.color , item.color]});
//                  break
//             case "SIZE":
//                  setFilter({...filter , size : [...filter.size , item.size]});
//                  break
//             default:
//         }
//     }
//     else{
//         switch(type) {
//             case "CATEGORY":
//                 const newCategory = filter.category.filter(e => e !== item.categorySlug)
//                  setFilter({...filter , category: newCategory});
//                  break
//             case "COLOR":
//                 const newColor = filter.color.filter(e => e !== item.color)
//                 setFilter({...filter , color: newColor});
//                 break
//             case "SIZE":
//                 const newSize = filter.size.filter(e => e !== item.size)
//                 setFilter({...filter , size: newSize});
//                 break
//             default:
//         }

//     }
// }
 
// const clearFilter = () => setFilter(initialFilter);
 

// //no understand
// const updateProducts = useCallback(
//     () => {
//         let temp = productList
        
//         if (filter.category.length > 0){
//             temp = temp.filter(e => filter.category.includes(e.categorySlug));
//         }

//         if (filter.color.length > 0){
//             temp =temp.filter(e => {
//                 const check = e.colors.find(color => filter.color.includes(color))
//                 return check !== undefined; 
//             })
//         }

//         if (filter.size.length > 0){
//             temp =temp.filter(e => {
//                 const check = e.size.find(size => filter.size.includes(size))
//                 return check !== undefined; 
//             })
//         }
//         setProducts(temp)
//     },
//     [filter , productList],
// )

// useEffect(() => {
//     updateProducts();
    
// }, [updateProducts])

// const filterRef = useRef(null);

// const showHideFilter = () => filterRef.current.classList.toggle('active');




