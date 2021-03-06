import React from 'react'
import PropTypes from 'prop-types'
import ViewTeacher from "./ViewTeacher"
import ViewPhoto from "../school-admin-dashboard/modals/ViewPhoto"

class RetiredTeacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewTeacherModal: false,
            viewPhoto:false
        }
        this.onViewTeacher = this.onViewTeacher.bind(this)
        this.onCloseViewTeacher = this.onCloseViewTeacher.bind(this)
        this.onViewPhoto = this.onViewPhoto.bind(this)
        this.onCloseViewPhoto = this.onCloseViewPhoto.bind(this)

    }
    onViewPhoto(e) {
        e.preventDefault()
        this.setState({viewPhoto: true})
    }

    onCloseViewPhoto(e) {
        this.setState({viewPhoto: false})
    }
    onViewTeacher(e) {
        e.preventDefault()
        this.setState({showViewTeacherModal: true})
    }

    onCloseViewTeacher(e) {
        this.setState({showViewTeacherModal: false})
    }

    render() {
        const { teacher,count} = this.props
        const {showViewTeacherModal,viewPhoto} = this.state
        return (
            <tr>
                <th scope="row">{count}</th>
                <td>{teacher.teacher_id.picture? <img src={`/uploads/${teacher.teacher_id.picture.path}`} alt="Profile picture" className="rounded-circle photo" onClick={this.onViewPhoto} width="45" height="45"/>: <img src={`/uploads/default.png`} alt="Profile picture" className="rounded-circle" width="45" height="45"/>}</td>
                <td>{teacher.teacher_id.tsc}</td>
                <td><a href="" onClick={this.onViewTeacher}>{teacher.teacher_id.surname}</a></td>
                <td>{teacher.teacher_id.first_name}</td>
                <td>{new Date(teacher.date_retired).toDateString()}</td>

                <ViewTeacher show={showViewTeacherModal} onClose={this.onCloseViewTeacher} teacher={this.props.teacher.teacher_id} deceased={false} retired={true}/>
                {teacher.teacher_id.picture? <ViewPhoto photo={teacher.teacher_id.picture} show={viewPhoto} onClose={this.onCloseViewPhoto}/>:''}
            </tr>

        )
    }
}

RetiredTeacher.propTypes = {
    teacher: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
}

export default RetiredTeacher