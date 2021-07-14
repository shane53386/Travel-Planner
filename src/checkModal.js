import React, { useEffect, useState} from 'react';
import {Modal , InputGroup ,FormControl,Button,Form} from 'react-bootstrap';
function CheckModal(props) {
    const [show,setShow] = useState(true)

    const handleClose=()=>{
        setShow(false)
    }
    const sendData = (event) =>{
        let {name} = event.target
        props.callback(name)
        
    }

    return (
      <> 
        <Modal  show={props.show } onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Delete Plane</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <h2>Confirm delete '{props.name}' plan?</h2>
            </Modal.Body>
          <Modal.Footer>
            <Button name="Yes" variant="secondary" onClick={sendData}>
              Yes
            </Button>
            <Button name="No" variant="primary" onClick={sendData}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

  export default CheckModal