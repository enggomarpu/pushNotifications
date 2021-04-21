import React, { Fragment, useState } from "react";
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import HttpService from "../../../shared/http.service";
import { format } from "date-fns";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '../../sharedError/error.messages';

const CertificationModel = (props) => {
  const { addToast } = useToasts();
  const [options, setOptions] = useState([]);
  const [certificationId, setCertificationId] = useState(1);
  //const [teamMembers, setTeamMembers] = useState([]);
  const [affiliateUserId, setAffiliateUserId] = useState();

  const { register, handleSubmit, errors, formState, control, reset, setValue } = useForm();
  const APIURL = 'affiliate-certification'
  let modalType = props.modalType;

  const modalLoaded = () => {
    
    let certAffid = props.affliatecertid ? props.affliatecertid : 1
    setCertificationId(certAffid);

    let AffUserId = props.userid ? props.userid : 1
    setAffiliateUserId(AffUserId);

    // getTeamMembers();
    if (modalType !== 1) {
       setCertificationId(certAffid)
       get(certAffid)  
    }

    if(props.teamMembers){
      setOptions(props.teamMembers.map((item) => {
        return { value: item.AffiliateTeamMemberId, label: item.Name };
      }))
    }

    
  };

  const get = async (certId) => {
    await HttpService.get(`${APIURL}/${certId}`).then(async(res) => {
      if (res && res.data) {
        setValue('Title', res.data.Title);
        setValue('Provider', res.data.Provider);
        setValue('DateCompleted', format(new Date(res.data.DateCompleted), 'yyyy-MM-dd'));
        setValue('IssueDate', format(new Date(res.data.IssueDate), 'yyyy-MM-dd'));
        let teamMem = res.data.TeamMembers.length > 0 ? res.data.TeamMembers.map((item) => {
          return { value: item.AffiliateTeamMemberId, label: item.Name };
        }) : [];
        setValue('TeamMemberIds', teamMem);
        
        setValue('CertificationUrl', res.data.CertificationUrl);
        //setValue('CertificationUrl', res.data.ProjectStatus);
        //setValue('PartneredAffiliateUserId', res.data.PartneredAffiliateUserId);
      }
    }).catch((err) => {
      console.log(err);
    });
  }


  const getTeamMembers = async () => {
    await HttpService.get("affiliate-team")
      .then((res) => {
        if (res) {
          let data = res.data.map((item) => {
            return { value: item.AffiliateTeamMemberId, label: item.Name };
          });
          setOptions(data);
          // let teamMem = props.teamMembers
          //   ? props.teamMembers.map((item) => {
          //     return { value: item.AffiliateTeamMemberId, label: item.Name };
          //   })
          //   : [];
          // setTeamMembers(teamMem);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const createCertification = (formdata) => {
    const createCertificationDetails = {
      Title: formdata.Title,
      Provider: formdata.Provider ,
      CertificationUrl: formdata.CertificationUrl,
      DateCompleted: formdata.DateCompleted,
      IssueDate: formdata.IssueDate,
      TeamMemberIds: formdata.length > 0 ? formdata.TeamMemberIds.map((mem) => mem.value) : [],
      AffiliateUserId: affiliateUserId,
    };
    HttpService.post("affiliate-certification", createCertificationDetails)
      .then((response) => {
        if (response) {
          props.onHide();
        }
        addToast("Certification Created Successfully", {
          appearance: "success",
        });
      })
      .catch(() => { });
  };
  const saveCertification = (formdata) => {

    const saveCertificationDetails = {
      Title: formdata.Title,
      Provider: formdata.Provider ,
      CertificationUrl: formdata.CertificationUrl,
      DateCompleted: formdata.DateCompleted,
      IssueDate: formdata.IssueDate,
      TeamMemberIds: formdata.length > 0 ? formdata.TeamMemberIds.map((mem) => mem.value) : [],
      AffiliateUserId: affiliateUserId,
    };

    HttpService.put(`affiliate-certification/${certificationId}`, saveCertificationDetails)
      .then((response) => {
        if (response) {
          props.onHide();
        }
        addToast("Certification Updated Successfully", {
          appearance: "success",
        });
      })
      .catch(() => { });
  };

  const deleteConfirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCertification().then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Certification Deleted Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        });
      }
    });
  };

  const deleteCertification = () => {
    return HttpService.delete(
      `affiliate-certification/${certificationId}`
    ).then((response) => {
      if (response) {
        props.onHide();
      }
    });
  };
  const onSubmit = (formData, e) => {
    modalType === 1 && createCertification(formData);
    modalType !== 1 && saveCertification(formData);
    e.target.reset();
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEntered={modalLoaded}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalType === 1
            ? "Create"
            : modalType === 2
              ? "Update"
              : "Delete"}{" "}
          Certification
        </Modal.Title>
      </Modal.Header>
      {modalType !== 3 && <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="Title"
                placeholder="Title Name"
                ref={register({ required: true })}
              />
              <ErrorMessage type={errors.Title && errors.Title.type} />
            </div>

            <div className="form-group">
              <label> Provider </label>
              <input
                type="text"
                className="form-control"
                name="Provider"
                placeholder="Udemey"
                ref={register({ required: true })}
              />
              <ErrorMessage type={errors.Provider && errors.Provider.type} />
            </div>

            <div className="form-group">
              <label>Issue Date</label>
              <input
                type="date"
                className="form-control"
                name="IssueDate"
                placeholder="Issue Date"
                ref={register({ required: true })}
              />
              <ErrorMessage type={errors.IssueDate && errors.IssueDate.type} />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                className="form-control"
                name="DateCompleted"
                placeholder="Expiry Completed"
                ref={register({ required: true })}
              />
              <ErrorMessage
                type={errors.DateCompleted && errors.DateCompleted.type}
              />
            </div>

            <div className="form-group">
              <label>Certification URL</label>
              <input
                type="text"
                className="form-control"
                name="CertificationUrl"
                placeholder="Certification Url"
                ref={register({ required: true })}
              />
              <ErrorMessage
                type={errors.CertificationUrl && errors.CertificationUrl.type}
              />
            </div>

            <Form.Group controlId="teamMember">
              <Form.Label>Team Member</Form.Label>
              <Controller
                name="TeamMemberIds"
                control={control}
                as={
                  <Select
                    isMulti
                    options={options}
                  />
                }
                //rules={{ required: true }}
                defaultValue={null}
              />
              <ErrorMessage type={errors.TeamMemberIds && errors.TeamMemberIds.type} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {modalType === 1 && <Button type="submit">Create</Button>}
            {modalType === 2 && <Button type="submit">Save Changes</Button>}
            
          </Modal.Footer>
        </Form>        
      </Modal.Body>}

      {modalType  === 3 && 
      <Fragment>
      <Modal.Body>
          <Form.Label>Are you sure want to delete this record? you will not be able to retrieve it later.</Form.Label>  
      </Modal.Body>
        <Modal.Footer>
        <Button onClick={deleteCertification} variant="danger">Delete</Button>
        <Button onClick={() => props.onHide()}>Cancel</Button> 
      </Modal.Footer>
      </Fragment>}  
    </Modal>
  );
};
export default CertificationModel;
