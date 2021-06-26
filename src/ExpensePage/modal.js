import React, { useEffect, useState} from 'react';
import {Modal , InputGroup ,FormControl,Button} from 'react-bootstrap';
function InputNewType(props) {
    const [show, setShow] = useState(false);
    const [newType,setType] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const sendData = (event) =>{
        let {name} = event.target
        if (name=="close")
            props.sendCallback(null)
        else if (name=="save")
            props.sendCallback(newType)
        handleClose()
        setType(null)
        
    }
    const handleChange = (event) =>{
        let {value} = event.target
        setType(value)
    }

    return (
      <> 
        <Button variant="primary" onClick={handleShow}>
            Add New Type
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <InputGroup className="mb-1" >
                    <FormControl name="newType" value = { newType} onChange={handleChange}
                        autocomplete="off"/> 
                    </InputGroup>
            </Modal.Body>
          <Modal.Footer>
            <Button name="close" variant="secondary" onClick={sendData}>
              Close
            </Button>
            <Button name="save" variant="primary" onClick={sendData}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

  export default InputNewType