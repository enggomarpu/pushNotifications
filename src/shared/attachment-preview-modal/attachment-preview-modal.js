import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import filePickerService from '../file-picker/file-picker.service';


const AttachmentPreviewModal = (props) => {

    const [url, setUrl] = useState();

    useEffect(() => {
        if (props.fileHandle) {
            setUrl(filePickerService.getPreviewLink(props.fileHandle))
        }
    }, [props])

    return (
        <>
            <Modal
                {...props}
                size='md'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Preview
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {url &&
                        <iframe className="image-preview"
                            src={url}></iframe>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AttachmentPreviewModal;