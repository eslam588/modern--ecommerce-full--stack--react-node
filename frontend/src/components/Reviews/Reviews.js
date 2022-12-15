import React,{useState,useEffect,useCallback} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import { productsreviews,getallreviews,deletereview} from '../../store/productSlice';
import  moment from 'moment';
import "./Reviews.css";


const Reviews = ({productId}) => {

const [reviews , setReview] =useState({
    commenttext:"",
    rating:""
})
const productReviews = useSelector((state) => state.product.reviews);
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

const looprating = (num) => {
    let ratingnum=""
    for (let i = 1; i <= num; i++) {
         ratingnum += "*"
    }
    return ratingnum;
}

  return (
        <div className="reviews-section mb-5">
            <div className="reviews d-lg-flex justify-content-between">
            <form onSubmit={handlesubmit} className="w-50">
            <h5 className="my-2 ">Write A Review</h5>
            <Box sx={{}}>
                <div className="comments">
                    <h6>Comments</h6>
                    <TextField id="outlined-basic" name="commenttext" label="Add Comment" variant="outlined" sx={{ width: 500  }}
                    onChange={onchange} />
                </div>
                <div className="rating mb-4">
                    <h6>Rating</h6>
                    <Select sx={{ width: 500 }} name="rating" onChange={onchange}>
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    </Select>
                </div>
            </Box>
            <Button sx={{ width:500 , padding:"15px", backgroundColor:"RGB(1, 61, 41)" , '&:hover': {backgroundColor: 'green'} }} variant="contained" endIcon={<SendIcon />} type="submit"  >
                Submit
            </Button>
            </form>  
            <div className="reviews-users w-50">
                <h5 className="my-3 ">Reviews</h5>
                   <div className="w-100">
                    {
                        productReviews?.length > 0 ? productReviews?.map(review => (
                            
                            <div className="d-flex ">
                                {/* src={`http://localhost:8000/${review?.userId?.profilePic}`} */}
                                <div className='image-box'>
                                    <img className="user-img my-3 px-3 roundeded" src={`http://localhost:8000/${review?.userId?.profilePic}`} />
                                </div>
                                <div className="p-3 border border-1 border-success rounded my-3 bg-light flex-grow-1">
                                    {console.log(review)}
                                    <h5>{review?.userId?.username}</h5>
                                    <div>{review?.commenttext}</div>
                                    <p>
                                        {
                                            review?.rating && <p className="fs-4">{looprating(review?.rating)}</p>
                                        }
                                    </p>
                                    {/* <p>{new Date(review?.createdAt)}</p> */}
                                    <button onClick={()=> deleteReview({productId,reviewId:review._id})}>delete</button>

                                </div>
                            </div>
                        )
                            
                        ): <p className="fs-5 m-2">no comments</p>
                    }
                    </div>
            </div>


            </div>  
      </div>
  )
}

export default Reviews
