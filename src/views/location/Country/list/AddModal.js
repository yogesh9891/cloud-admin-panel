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
import { addCountry, getAllData, updateCountry } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES_CONSTANT } from '../../../../utility/constant'
import { toastError } from '../../../../utility/toastutill'
import FileUpload from '../../../../utility/FileUpload'

const AddModal = ({ open, toggleSidebar }) => {
    // ** States
    const store = useSelector(state => state.countries)

    const [name, setname] = useState("")
    const [status, setstatus] = useState(true)
    const [isUpdated, setisUpdated] = useState(false)
    const [updateObj, setupdateObj] = useState({})
    // ** Store Vars
    const dispatch = useDispatch()
    const checkIsValid = () => {

        if (`${name}` === '') {
            toastError("Please Fill name")
            return false
        }


        return true
    }

    // ** Function to handle form submit
    const onSubmit = () => {
        if (checkIsValid()) {
            toggleSidebar()
            if (isUpdated === true) {
                dispatch(
                    updateCountry({
                        name,
                        status,
                        id: updateObj._id
                    })
                )
            } else {
                dispatch(
                    addCountry({
                        name,
                        status
                    })
                )
            }
        }
    }

    const handleSidebarClosed = () => {
    }

    useEffect(() => {
        if (store.selectedCountry !== null) {
            const country = store.selectedCountry
            setupdateObj(country)
            setisUpdated(true)
            setname(country.name)
            setstatus(country.status)
        } else {
            setupdateObj({})
            setisUpdated(false)
            setname("")
        }
    }, [store.selectedCountry])


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
                        <h2>{isUpdated ? "Update" : "Add"} Country</h2>
                    </div>

                    <Form className="row">
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='fullName'>
                                Name <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' value={name} onChange={(e) => setname(e.target.value)} />
                        </div>
                        {/* <div className='mb-1 col-md-6'>
                            <Label className='form-label'>
                                Image 
                            </Label>
                            <FileUpload onFileChange={(val) => setimage(val)} />
                        </div> */}

                        <div className=' mb-1 col-md-6'>
                            <Label className='form-label' for='phone'>
                                Status <span className='text-danger'>*</span>
                            </Label>
                            <div className='demo-inline-spacing'>
                                <div className='form-check'>
                                    <Input type='radio' id='ex1-active' name='ex1' checked={status === true} onChange={() => setstatus(true)} />
                                    <Label className='form-check-label' for='ex1-active'>
                                        Active
                                    </Label>
                                </div>
                                <div className='form-check'>
                                    <Input type='radio' name='ex1' id='ex1-inactive' checked={status === false} onChange={() => setstatus(false)} />
                                    <Label className='form-check-label' for='ex1-inactive'>
                                        InActive
                                    </Label>
                                </div>
                            </div>
                        </div>


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
