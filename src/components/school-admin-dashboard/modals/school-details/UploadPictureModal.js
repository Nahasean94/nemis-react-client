import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class UploadPictureModal extends React.Component {
    render() {
        const {show, onClose, picture, onUpload, onChange, dontShowDescription} = this.props
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Upload a picture</ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <img src={picture} alt="photo" width="700" height="400"/>
                            <br/>
                            <br/>
                            {dontShowDescription ? '' : <div className="form-group">
                                  <textarea name="newPost" onChange={onChange} className="form-control" rows="2"
                                            cols="20"
                                            placeholder="Add a description"/>
                            </div>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Close</Button>{' '}
                        <Button color="primary" onClick={onUpload}>Upload</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null

    }
}

UploadPictureModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    picture: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    dontShowDescription: PropTypes.bool,

}
export default UploadPictureModal
