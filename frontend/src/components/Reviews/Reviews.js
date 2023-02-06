import React,{useState,useEffect,useCallback} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import { productsreviews,getallreviews,deletereview} from '../../store/productSlice';
import { NavLink, useNavigate } from "react-router-dom";
import {BasicRating , ContolledRating} from "./Ratingcom"
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import  moment from 'moment';
import "./Reviews.css";


const Reviews = ({productId}) => {

const [reviews , setReview] = useState({
    commenttext:"",
    rating:0
})
const productReviews = useSelector((state) => state.product.reviews);
const {isLoggedIn} = useSelector((state)=> state.auth)
const dispatch = useDispatch();
let userId =JSON.parse(localStorage.getItem('userId'));

useEffect(() => {
    dispatch(getallreviews(productId))
},[])


onchange = (e) => {
    setReview({...reviews,[e.target.name]:e.target.value});
}


const handlesubmit = async (e) => {
    e.preventDefault();
    await dispatch(productsreviews({productId,reviews:{...reviews,userId}}))
    await dispatch(getallreviews(productId))
    setReview({
        commenttext:"",
        rating:0
    })
   }



//  const deleteReview = useCallback((datareview) => {
//         dispatch(deletereview(datareview))
//   },[dispatch])

const deleteReview = async(datareview) => {
    await dispatch(deletereview(datareview))
    await dispatch(getallreviews(productId))
}

// useEffect(() => {
//     dispatch(getallreviews(productId))
// },[deleteReview,handlesubmit])


  return (
        <div className="reviews-section mb-5">
            <div className="reviews d-lg-flex justify-content-between">
                
            {
            
              isLoggedIn ? ( 
              <div>
              <h5 className="my-3 ">Write A Review</h5>
              <form onSubmit={handlesubmit} className="w-50">
              <Box sx={{}}>
                  <div className="comments">
                      <h6>Comments</h6>
                      <TextField id="outlined-basic" name="commenttext" label="Add Comment" variant="outlined" sx={{ width: 500  }}
                      onChange={onchange} value={reviews.commenttext} />
                  </div>
                  <ContolledRating  className="m-4" valueRating={reviews.rating} onChange={onchange}  />
              </Box>
              <Button sx={{ width:500 , padding:"15px",marginTop:4 , backgroundColor:"RGB(1, 61, 41)" , '&:hover': {backgroundColor: 'green'} }} variant="contained" endIcon={<SendIcon />} type="submit"  >
                  Submit
              </Button>
              </form> </div> 
              )
              : 
              (
                <div className="w-50 " >
                    <h5 className="my-3">Write A Review</h5>
                    <div className='p-4 bg-light fs-5 border border-1 border-success rounded mt-5'>
                        <p>please 
                        <NavLink to="/login">
                        <span className='fw-bold'>Login</span>
                        </NavLink>
                        or 
                        <NavLink to="/register">
                        <span className='fw-bold'>Register</span> 
                        </NavLink>
                        To write a Review</p>
                    </div>
                </div>
              )
            }
           
            <div className="reviews-users w-50 ms-5">
                <h5 className="my-3 mx-3 ">Users Reviews</h5>
                   <div className="w-100">
                    {
                        productReviews?.length > 0 ? productReviews?.map(review => (
                            <div className="d-flex ">
                                <img className="user-img my-3 px-3 roundeded" src={`http://localhost:8000/${review?.userId?.profilePic}`} width="75px" height="50px" />
                                <div className="p-3 border border-1 border-success rounded my-3 bg-light flex-grow-1">
                                    <h5>{review?.userId?.username}</h5>
                                    <div>{review?.commenttext}</div>
                                    <div className='d-flex align-items-start justify-content-between'>
                                        <p>
                                            { 
                                                review?.rating && <BasicRating value={review?.rating} />   
                                            }
                                        </p>
                                        <p>{review?.createdAt}</p>
                                        {
                                          review.userId?._id == userId ? (  <DeleteIcon  onClick={()=> deleteReview({productId,reviewId:review?._id})} className="delbutton text-success mx-2 border border-rounded" />):""
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        )
                            
                        ): <p className="fs-4 text-center m-2">no comments</p>
                    }
                    </div>
            </div>

            
            </div>  
      </div>
  )
}

export default Reviews
