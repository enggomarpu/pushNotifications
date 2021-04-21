import { Modal } from 'react-bootstrap'
import React, { useEffect,useState,lazy} from 'react'
import Icon from "../../../img/icon.png"
import SaveIcon from "../../../img/save.png"
import ShareIcon from "../../../img/share-icon.png"
import { useDispatch, useSelector } from 'react-redux'
import { getCollaboration } from '../Collaboration-List/collaboration-list.reducer'
import filePickerService from '../../../shared/file-picker/file-picker.service'
import Moment from 'moment'
import { store } from '../../../App'

const ViewComments = lazy(() =>
  import('./request-view.module').then(module => {
    store.injectReducer('collaborationViewRequest', module.default.reducer);
    store.injectSaga('collaborationViewRequest', module.default.saga);
    return import('./collaboration-comment.component');
  })
);
const CollaborationsRequestViewModal = (props) => {
  const dispatch = useDispatch();
  const CollabationRequestData = useSelector(state => state.collaborationlist.CollabationRequestData);
const [viewComment, setViewComment] = useState(false)
  useEffect(() => {
    dispatch(getCollaboration({
      CollaborationRequestId : props.CollabId
    }))
  }, []);
  const modalLoaded = () => {}
  const openComments = () => {
    setViewComment(true)
  }
  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onEntered={modalLoaded}
      >
        <Modal.Header closeButton className='border-0 pb-0'>
          <div className='col post-info d-flex align-self-center'>
            <div className='userprofile align-self-center'></div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-1'>
            <div className='row mb-3'>
              <div className='col'>
                <h1>
                  <img src={Icon} alt='' className='rounded-circle' /> {CollabationRequestData.ProjectName}
                </h1>
              </div>
              <div className='col-auto align-self-center'>
                <a className='link'>
                  <img src={SaveIcon} alt='' />
                  Save post
                </a>
                <a className='link ms-3'>
                  <img src={ShareIcon} alt='' />
                  Share post
                </a>
              </div>
            </div>

            <div className='checkbox-group'>
              {CollabationRequestData.RequestSkills && CollabationRequestData.RequestSkills.map((skill, index) => {
              return (
              <span key={index} className='btn btn-primary'>
              {skill.SkillName &&
              skill.SkillName +
              (CollabationRequestData.RequestSkills.length - 1 > index ? ' ' : '')}
              </span>
              )
              })}
            </div>

            <div className='custom-list'>
              <div className='row mb-3'>
                <div className='col-2'>
                  <b>Project Name</b>
                </div>
                <div className='col-9'>{CollabationRequestData.ProjectName}</div>
              </div>

              <div className='row mb-3'>
                <div className='col-2'>
                  <b>Project Timeline</b>
                </div>
                <div className='col-9'>
                {Moment(CollabationRequestData.StartDate).format('DD-MM-YYYY')} - {Moment(CollabationRequestData.EndDate).format('DD-MM-YYYY')}
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-2'>
                  <b>Related Industry</b>
                </div>
                <div className='col-9'>{CollabationRequestData.RelatedIndustry} </div>
              </div>

              <div className='row mb-3'>
                <div className='col-2'>
                  <b>Project Details</b>
                </div>
                <div className='col-9'>
                  {CollabationRequestData.ProjectDetails}
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-2'>
                  <b>Priority Level</b>
                </div>
                <div className='col-9'>
                <span className='text-danger'>{CollabationRequestData.PriorityLevel}</span>
                </div>
              </div>

              <div className='row'>
                <div className='col-2'>
                  <b>Project Files</b>
                </div>
                <div className="col-9">
                {CollabationRequestData.RequestAttachments && CollabationRequestData.RequestAttachments.map((attachment) => {
                 return (
                  <a className='link ms-2' href={filePickerService.getDownloadLink(attachment.FileHandler)}>
                    <div
                      className={filePickerService.getFileIcon(attachment.FileType)}
                    ></div>
                    <span className='ms-2'>{attachment.FileName}</span>
                  </a>)
                })}
                </div>
              </div>

              <div className='row mb-3'>
              <div className='col-5'>
              <button className='link mb-3'
              onClick={() => openComments()}
              >View Comments</button>
            </div>
              </div>
            </div>
            <div className='text-end mb-3 mt-5'>
              <button className='btn btn-primary btn-width'>
                Close
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ViewComments
      show={viewComment}
      postselectid={props.CollabId}
      onHide={() => {setViewComment(false);
      }}
      onPrevHide={props.onHide}
    />
    </>
  )
}

export default CollaborationsRequestViewModal
