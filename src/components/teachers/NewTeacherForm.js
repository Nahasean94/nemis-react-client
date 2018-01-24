import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {addTeacher, registerTeacher} from "../../actions/teacherActions"
import {connect} from 'react-redux'
import {addFlashMessage} from "../../actions/flashMessages"
import jwt from 'jsonwebtoken'


class NewTeacherForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tsc: '',
            surname: '',
            first_name: '',
            last_name: '',
            email: '',
            dob: '',
            school_upi: '',
            gender: '',
            telephone: '',
            nationalID: '',
            admission_date: '',
            disable_upi: false,
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkTeacherExists = this.checkTeacherExists.bind(this)
    }

    componentDidMount() {
        if (window.location.pathname === '/school_admin/teachers') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            this.setState({school_upi: token.school_upi, disable_upi: true})
        }

    }

    checkTeacherExists(e) {
        const field = e.target.name
        const val = e.target.value
        if (val !== '') {
            // this.props.isTeacherExists(val).then(res => {
            //     if (res) {
            //         let errors = this.state.errors
            //         let invalid
            //         if (res.data) {
            //             invalid = true
            //             errors[field] = 'There is school registered with such ' + field
            //         } else {
            //             invalid = false
            //             errors[field] = ''
            //         }
            //         this.setState({errors, invalid})
            //     }
            // })
        }
    }

    validateInput(data) {
        let errors = {}
        if (!data.tsc) {
            errors.tsc = 'This field is required'
        }
        if(data.tsc.length<6){
            errors.tsc="Tsc number must be greator than 6 characters"
        }
        if (validator.isEmpty(data.first_name)) {
            errors.first_name = 'This field is required'
        }
        if (validator.isEmpty(data.last_name)) {
            errors.last_name = 'This field is required'
        }
        if (validator.isEmpty(data.gender)) {
            errors.gender = 'This field is required'
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (validator.isEmpty(data.telephone)) {
            errors.telephone = 'This field is required'
        }
        if (validator.isEmpty(data.dob)) {
            errors.dob = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(new Date('2000'))) {
            errors.dob = "A teacher must be 18 and above"
        }
        if (validator.isEmpty(data.admission_date)) {
            errors.admission_date = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(data.admission_date)) {
            errors.admission_date = 'You cannot be employed before you are born'
        }
        if (Date.parse(data.admission_date) < Date.parse(new Date('1976'))) {
            errors.dob = 'You should be retired by now'
        }
        if (Date.parse(data.dob) < Date.parse(new Date('1956'))) {
            errors.dob = 'You should be retired by now'
        }


        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.registerTeacher(this.state).then(
                (teacher) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.props.addTeacher(teacher.data)
                    this.setState({
                        tsc: '',
                        surname: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        dob: '',
                        gender: '',
                        telephone: '',
                        nationalID: '',
                        admission_date: '',
                        subjects: [],
                        errors: {},
                        isLoading: false,
                        invalid: false
                    })
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, tsc, surname, first_name, last_name, email, dob, school_upi, telephone, nationalID, admission_date, disable_upi} = this.state
        console.log(disable_upi)
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new teacher</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="TSC Id"
                                type="number"
                                name="tsc"
                                value={tsc} autofocus={true}
                                onChange={this.onChange}
                                error={errors.tsc}

                            />
                            <TextFieldGroup
                                label="Surname"
                                type="text"
                                name="surname"
                                value={surname}
                                onChange={this.onChange}
                                error={errors.surname}

                            />
                            <TextFieldGroup
                                label="First name"
                                type="text"
                                name="first_name"
                                value={first_name}
                                onChange={this.onChange}
                                error={errors.first_name}

                            />
                            <TextFieldGroup
                                label="Last name"
                                type="text"
                                name="last_name"
                                value={last_name}
                                onChange={this.onChange}
                                error={errors.last_name}

                            />
                            <TextFieldGroup
                                label="Date of birth"
                                type="date"
                                name="dob"
                                value={dob}
                                onChange={this.onChange}
                                error={errors.dob}

                            />
                            <TextFieldGroup
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}

                            />
                            <TextFieldGroup
                                label="Phone number"
                                type="number"
                                name="telephone"
                                value={telephone}
                                onChange={this.onChange}
                                error={errors.telephone}

                            />

                            <TextFieldGroup
                                label="Date of Employment"
                                type="date"
                                name="admission_date"
                                value={admission_date}
                                onChange={this.onChange}
                                error={errors.admission_date}
                            />
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="gender">Gender</label>
                                <div className="col-sm-9">
                                    <select className="form-control form-control-sm" id="gender" name="gender"
                                            required="true" onChange={this.onChange}>
                                        <option>Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="gender">Teaching subject 1</label>
                                <div className="col-sm-9">
                                    <select className="form-control form-control-sm" id="gender" name="gender"
                                            required="true" onChange={this.onChange}>
                                        <option>Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>
                            </div>
                            {disable_upi ? '' : <TextFieldGroup
                                label="School UPI"
                                type="text"
                                name="school_upi"
                                value={school_upi}

                                onChange={this.onChange}
                                error={errors.school_upi}

                            />}

                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                        type="submit">Save
                                </button>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }

}


NewTeacherForm.propTypes = {
    // userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // isTeacherExists: PropTypes.func.isRequired,
    registerTeacher: PropTypes.func.isRequired,
    addTeacher: PropTypes.func.isRequired,
}
NewTeacherForm.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {addTeacher, registerTeacher, addFlashMessage})(NewTeacherForm)

