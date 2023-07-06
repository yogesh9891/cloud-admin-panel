// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import {
    Button, Label, FormText, Form, Input, Modal,
    CardBody,
    ModalBody,
    ModalHeader,
    Row,
    Col
} from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES_CONSTANT } from '../../../../utility/constant'
import { toastError } from '../../../../utility/toastutill'
import FileUpload from '../../../../utility/FileUpload'
import { getAllCountry } from '../../../location/Country/store'
import { getAllCity } from '../../../location/City/store'
import { getAllState } from '../../../location/State/store'

const defaultValues = {
    email: '',
    phone: '',
    company: '',
    fullName: '',
    lastName: ''
}

const AddModal = ({ open, toggleSidebar }) => {
    // ** States
    const country = useSelector(state => state.countries.countries)
    const states = useSelector(state => state.states.states) // states
    const city = useSelector(state => state.cities.cities)

    const role = useSelector(state => state.auth.userData.role)
    const store = useSelector(state => state.users)

    const [data, setData] = useState(null)
    const [plan, setPlan] = useState('basic')
    const [selectedRole, setSelectedRole] = useState('')
    const [firstname, setfirstname] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    // const [type, settype] = useState(ROLES_CONSTANT.USER)
    const [companyName, setcompanyName] = useState("")
    const [companyEmail, setcompanyEmail] = useState("")
    const [companyPhone, setcompanyPhone] = useState("")
    const [gstNumber, setgstNumber] = useState("")
    const [address, setaddress] = useState("")
    const [dob, setdob] = useState("")
    const [noofepmployee, setnoofepmployee] = useState("")
    const [profileImage, setprofileImage] = useState("")
    const [signature, setsignature] = useState("")
    const [gstCertificate, setgstCertificate] = useState("")
    const [countryArr, setcountryArr] = useState([])
    const [stateArr, setstateArr] = useState([])
    const [cityArr, setcityArr] = useState([])
    const [countryId, setcountryId] = useState("")
    const [stateId, setstateId] = useState("")
    const [cityId, setcityId] = useState("")
    // ** Store Vars

    const dispatch = useDispatch()

    useEffect(() => {
        setcityArr(city)

    }, [city])

    useEffect(() => {
        setstateArr(states)
    }, [states])

    useEffect(() => {
        setcountryArr(country)
    }, [country])

    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const checkIsValid = () => {

        if (`${firstname}` === '') {
            toastError("Please Fill First name")
            return false
        }
        if (`${lastName}` === '') {
            toastError("Please Fill Last name")
            return false
        }
        if (`${email}` === '' || !`${email}`.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            toastError("Email is Invalid")
            return false
        }

        if (`${phone}` === '' || !`${phone}`.match(/\d/g)) {
            toastError("Please Fill Phone ")
            return false
        }
        if (`${selectedRole}` === '') {
            toastError("Please Fill Role ")
            return false
        }
        if (`${password}` === '') {
            toastError("Please Fill password ")
            return false
        }
        if (`${password}` === '' || password !== confirmpassword) {
            toastError("Confirm password not match ")
            return false
        }
        if (`${selectedRole}` !== 'USER') {
            if (`${companyName}` === "") {
                toastError("Company Name is Required")
                return 0
            }

            if (`${companyEmail}` === "") {
                toastError("Company Email is Required")
                return 0
            }
            if (`${companyPhone}` === "") {
                toastError("Company Phone is Required")
                return 0
            }
            if (`${gstNumber}` === "") {
                toastError("Gst is Required")
                return 0
            }
            if (`${address}` === "") {
                toastError("Address is Required")
                return 0
            }
            if (`${countryId}` === "") {
                toastError("Country is Required")
                return 0
            }
            if (`${stateId}` === "") {
                toastError("State is Required")
                return 0
            }
            if (`${cityId}` === "") {
                toastError("City is Required")
                return 0
            }
            if (`${gstCertificate}` === "") {
                toastError("Gst Certificate is Required")
                return 0
            }
        }

        return true
    }

    // ** Function to handle form submit
    const onSubmit = () => {

    }

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            console.log(key)
            setValue(key, '')
        }
    }

    useEffect(() => {
        if (countryId) {
            dispatch(getAllState(`countryId=${countryId}`))
        }
    }, [countryId])

    useEffect(() => {
        if (stateId) {
            dispatch(getAllCity(`stateId=${stateId}`))
        }
    }, [stateId])

    useEffect(() => {
        dispatch(getAllCountry())
        // dispatch(getAllCity())
        dispatch(getAllState())
    }, [])

    return (
        <>
            <Modal
                isOpen={open}
                onClosed={handleSidebarClosed}
                toggle={toggleSidebar}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={toggleSidebar}></ModalHeader>
                <ModalBody className='px-3 pb-3'>
                    <div className='text-center'>
                        <h2>Add User</h2>
                    </div>

                    <Form className="row">
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='fullName'>
                                Full Name <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                        </div>
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='lastName'>
                                Last Name <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' value={lastName} onChange={(e) => setlastName(e.target.value)} />

                        </div>
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='userEmail'>
                                Email <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' type='email' value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>

                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='phone'>
                                Phone <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' maxLength={10} type="tel" value={phone} onChange={(e) => setphone(e.target.value)} />

                        </div>
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='password'>
                                Password <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' value={password} onChange={(e) => setpassword(e.target.value)} />

                        </div>
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='con'>
                                Confirm Password <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />

                        </div>
                        <div className='mb-1 col-md-12'>
                            <Label className='form-label' for='user-role'>
                                User Role
                            </Label>
                            <Input type='select' id='user-role' name='user-role' value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                                <option value=''>Select Role</option>
                                {
                                    Object.values(ROLES_CONSTANT).map(el => el !== 'ADMIN' && (role !== ROLES_CONSTANT.APPROVERS ? <option value={el}>{el}</option> : el !== ROLES_CONSTANT.APPROVERS && <option value={el}>{el}</option>))
                                }

                            </Input>
                        </div>
                        {

                            selectedRole && selectedRole !== "" && (selectedRole !== ROLES_CONSTANT.USER) && (selectedRole !== ROLES_CONSTANT.SUBADMIN) && (

                                <div className="row">
                                    <h4 className="heading yellow">Company Details </h4>

                                    <div className="col-md-6">
                                        <Label> Company Name <span className="text-danger">*</span></Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={companyName}
                                            onChange={(e) => setcompanyName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Label>Company  Email <span className="text-danger">*</span> </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={companyEmail}
                                            onChange={(e) => setcompanyEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Label> Company Phone <span className="text-danger">*</span></Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={companyPhone}
                                            onChange={(e) => setcompanyPhone(e.target.value)}
                                            maxLength="10"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Label> GST No <span className="text-danger">*</span></Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={gstNumber}
                                            onChange={(e) => setgstNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Label> No of Emplyoees <span className="text-danger">*</span> </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={noofepmployee}
                                            onChange={(e) => setnoofepmployee(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <Label> Address <span className="text-danger">*</span></Label>
                                        <textarea
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => setaddress(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="col-md-4">
                                        <Label> Country <span className="text-danger">*</span></Label>
                                        {
                                            countryArr && (
                                                <select className="form-control" onChange={(e) => { setcountryId(e.target.value); setstateArr([]); setcityArr([]) }}>
                                                    <option value="">Please Select Country</option>
                                                    {countryArr.map((country) => (
                                                        <option value={country._id} >{country.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-4">
                                        <Label> State <span className="text-danger">*</span></Label>
                                        {
                                            stateArr && (
                                                <select className="form-control" onChange={(e) => { setstateId(e.target.value); setcityArr([]) }}>
                                                    <option value="">Please Select State</option>
                                                    {stateArr.map((state) => (
                                                        <option value={state._id} >{state.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-4">
                                        <Label> City <span className="text-danger">*</span></Label>
                                        {
                                            cityArr && (
                                                <select className="form-control" onChange={(e) => setcityId(e.target.value)}>
                                                    <option value="">Please Select City</option>
                                                    {cityArr.map((city) => (
                                                        <option value={city._id} >{city.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                    <h4 className="heading yellow">Documnets </h4>
                                    {/* <div className="col-md-6">
            <Label> Profile Photo</Label>
            <FileUpload onChange={(val) => setprofileImage(val)} />
        </div> */}
                                    <div className="col-md-6">
                                        <Label> GST Certificate <span className="text-danger">*</span></Label>
                                        <FileUpload onFileChange={(value) => setgstCertificate(value)} />
                                    </div>
                                </div>
                            )}


                        <div className='mb-1 col-md-12'>
                            <Button type='button' className='me-1' color='primary' onClick={() => { onSubmit() }} >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </>
        // <Sidebar
        //   size='lg'
        //   open={open}
        //   title='New User'
        //   headerClassName='mb-1'
        //   contentClassName='pt-0'
        //   toggleSidebar={toggleSidebar}
        //   onClosed={handleSidebarClosed}
        // >
        //   <Form onSubmit={handleSubmit(onSubmit)}>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='fullName'>
        //         Full Name <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='fullName'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='fullName' placeholder='John Doe' invalid={errors.fullName && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='lastName'>
        //         lastName <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='lastName'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='lastName' placeholder='johnDoe99' invalid={errors.lastName && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='userEmail'>
        //         Email <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='email'
        //         control={control}
        //         render={({ field }) => (
        //           <Input
        //             type='email'
        //             id='userEmail'
        //             placeholder='john.doe@example.com'
        //             invalid={errors.email && true}
        //             {...field}
        //           />
        //         )}
        //       />
        //       <FormText color='muted'>You can use letters, numbers & periods</FormText>
        //     </div>

        //     <div className='mb-1'>
        //       <Label className='form-label' for='phone'>
        //         phone <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='phone'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='phone' placeholder='(397) 294-5153' invalid={errors.phone && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='company'>
        //         Company <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='company'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='company' placeholder='Company Pvt Ltd' invalid={errors.company && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='country'>
        //         Country <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='country'
        //         control={control}
        //         render={({ field }) => (
        //           // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
        //           <Select
        //             isClearable={false}
        //             classNamePrefix='select'
        //             options={countryOptions}
        //             theme={selectThemeColors}
        //             className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
        //             {...field}
        //           />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='user-role'>
        //         User Role
        //       </Label>
        //       <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
        //         <option value='subscriber'>Subscriber</option>
        //         <option value='editor'>Editor</option>
        //         <option value='maintainer'>Maintainer</option>
        //         <option value='author'>Author</option>
        //         <option value='admin'>Admin</option>
        //       </Input>
        //     </div>
        //     <div className='mb-1' value={plan} onChange={e => setPlan(e.target.value)}>
        //       <Label className='form-label' for='select-plan'>
        //         Select Plan
        //       </Label>
        //       <Input type='select' id='select-plan' name='select-plan'>
        //         <option value='basic'>Basic</option>
        //         <option value='enterprise'>Enterprise</option>
        //         <option value='company'>Company</option>
        //         <option value='team'>Team</option>
        //       </Input>
        //     </div>
        //     <Button type='submit' className='me-1' color='primary'>
        //       Submit
        //     </Button>
        //     <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
        //       Cancel
        //     </Button>
        //   </Form>
        // </Sidebar>
    )
}

export default AddModal
