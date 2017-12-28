import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

export default ({show, school, onClose, onEdit}) => {
    if (show) {
        return (<Modal isOpen={show} toggle={onClose} size="lg">
            <ModalHeader toggle={onClose}>School info</ModalHeader>
            <ModalBody>
                <button className="btn btn-sm btn-info" onClick={onEdit}>Edit</button>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">UPI:</th>
                        <td>{school.upi}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name:</th>
                        <td>{school.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Category:</th>
                        <td>{school.category}</td>
                    </tr>
                    <tr>
                        <th scope="row">County:</th>
                        <td>{school.county ? school.county : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Classes:</th>
                        <td>{school.infrastructure.classes ? school.infrastructure.classes : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Playing Fields:</th>
                        <td>{school.infrastructure.playing_fields ? school.infrastructure.playing_fields : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Halls:</th>
                        <td>{school.infrastructure.halls ? school.infrastructure.halls : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Dormitories:</th>
                        <td>{school.infrastructure.dormitories ? school.infrastructure.dormitories : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Buses:</th>
                        <td>{school.assets.buses ? school.assets.buses : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Farming Land (acres):</th>
                        <td>{school.assets.farming_land ? school.assets.farming_land : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Science Labs</th>
                        <td>{school.learning_materials.science_labs?school.learning_materials.science_labs:'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Book ratio (books:students)</th>
                        <td>{school.learning_materials.book_ratio?school.learning_materials.book_ratio:'N/A'}</td>
                    </tr>

                    <tr>
                        <th scope="row">School Email</th>
                        <td>{school.contact.email?school.contact.email:'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telephone 1</th>
                        <td>{school.contact.phone1?school.contact.phone1:'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telephone 2</th>
                        <td>{school.contact.phone2?school.contact.phone2:'N/A'}</td>
                    </tr>
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
            </ModalFooter>
        </Modal>)
    }
    else return null

}