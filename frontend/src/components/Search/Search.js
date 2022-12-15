import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';


const Search = ({setKeyword,handlesubmit,keyword}) => {


  return (
    <div className="searchinput mt-5">
        <div className="container">
            <Form onSubmit={handlesubmit} >
                <Form.Group as={Row}>
                    <Col sm="6">
                        <InputGroup className="mb-3">
                                <Form.Control placeholder="search a product by name" onChange={(e)=> setKeyword(e.target.value.trim())} name="search" value={keyword} />
                                <Button type="submit" variant="outline-secondary" id="button-addon2" style={{backgroundColor:"RGB(1, 61, 41)" , color:"white"}}>search</Button>
                        </InputGroup>
                    </Col>
                </Form.Group>
            </Form>
        </div>
      
    </div>
  )
}

export default Search
