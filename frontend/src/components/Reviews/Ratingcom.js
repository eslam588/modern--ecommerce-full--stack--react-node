import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export  function BasicRating(props) {
  const [value, setValue] = React.useState(props.value);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}


export  function ContolledRating({valueRating,onChange}) {
    const [value, setValue] = React.useState();
    return (
        <Box sx={{'& > legend': { mt: 3 }}}>
        <Typography component="legend" sx={{fontSize:"25" , mt:3}}>Rating</Typography>
        <Rating
          name="rating"
          value={valueRating}
          onChange={onChange}
        />
       </Box>
    )
  }

