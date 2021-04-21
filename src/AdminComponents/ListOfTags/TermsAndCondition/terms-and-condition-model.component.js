import React, {useState} from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import HttpService from '../../../shared/http.service';
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {ErrorMessage} from '../../sharedError/error.messages'

const TermsCondsModel =  (props) => {


    const { register, handleSubmit, errors, formState, setValue } = useForm();
    const [idTermsConds, setTermsCondsId] = useState();
    const { addToast } = useToasts();

    

   const modalLoaded = () => {

    const termsId = props.modaltype !== 1 ? props.idoftermsconds : null 
    setTermsCondsId(termsId);
    
    const termsName = props.modaltype !== 1 ? props.nameoftermsconds : null 
    setValue('name', termsName)

    const termsMessage = props.modaltype !== 1 ? props.messageoftermsconds : null 
    setValue('msg', termsMessage)


    };

  
  const updateTermsConds = async (formData) => {
     
    
    const termsCondsObject = {
        Name: formData.name,
        Message: formData.msg
      }
      await HttpService.put(`TermsAndConditions/${idTermsConds}`, termsCondsObject).then((response) => {
        if(response){
            setValue('name', "");
            setValue('msg', "");
            props.onHide();
        }
        addToast("Terms & Conditions Updated Successfully", {
          appearance: "success",
        });
      }).catch(()=>{})
  }
  
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        onEntered={modalLoaded}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modaltype === 1 ? 'Create': props.modaltype === 2  ? 'Update' : 'Delete'} Terms And Conditons 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(updateTermsConds)}>
        <Form.Group controlId="termsCondsName">
          <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Terms And Conditons "  ref={register({ required: true })}/>
            <ErrorMessage type={errors.name && errors.name.type} />
        </Form.Group>
        <Form.Label>Message</Form.Label>        
        <Form.Group controlId="termsCondsMsg">
            <Form.Control type="text" name="msg" placeholder="Enter Terms And Conditons Message" ref={register({ required: true })}/>
            <ErrorMessage type={errors.msg && errors.msg.type} />
        </Form.Group>     
        <Modal.Footer>
        {props.modaltype === 2 && <Button type="submit" onClick={updateTermsConds}>Save Changes</Button>}
        </Modal.Footer>    
        </Form>
        </Modal.Body>
        
      </Modal>
    );
  }
  export default TermsCondsModel;