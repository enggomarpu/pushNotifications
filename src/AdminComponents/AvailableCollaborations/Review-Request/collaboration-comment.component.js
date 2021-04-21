import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import filePickerService from '../../../shared/file-picker/file-picker.service';
import {getAllComments} from './request-view.reducer'
import { useDispatch, useSelector } from 'react-redux'

const RequestCommentsModal = (props) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.collaborationViewRequest.comments);
    const postId = props.postselectid;

    useEffect(() => {
        dispatch(getAllComments({
            CollaborationRequestId : postId
          })) 
    }, []);

    return (
        <>
            <Modal
                {...props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton className='border-0 pb-0'>
                    <div className='card-header d-flex justify-content-between mb-3'>
                        <h5 className='card-title align-self-center'>Comments   </h5>
                        <div className='header-button align-self-center'>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='table-responsive'>
                        <table className="table">
                            <thead>
                                <tr>
                                    {/*props.isApproved !== false && <th scope="col">Comment From</th>*/}
                                    <th scope="col">Comment</th>
                                    {/*props.isApproved !== false && <th scope="colgroup" colSpan="2">Attachments</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((result) => {
                                    return (
                                        <tr>
                                            <th scope="row">{result.CommentedByUser ? result.CommentedByUser.Name : ''}</th>
                                            <td>{result.CollaborationRequestComment}</td>
                                            <td>
                                                {result.CollaborationRequestCommentAttachments &&
                                                    result.CollaborationRequestCommentAttachments.map((attachment) => {
                                                        return (<a className='link ms-2' href={filePickerService.getDownloadLink(attachment.FileHandler)}>
                                                            <div
                                                                className={filePickerService.getFileIcon(attachment.FileType)}
                                                            ></div>
                                                            <span className='ms-2'>{attachment.FileName}</span>
                                                        </a>)
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
            </Modal>

        </>
    )
}

export default RequestCommentsModal
