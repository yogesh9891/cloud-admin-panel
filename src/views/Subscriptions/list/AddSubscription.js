// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import { addSubscription, getSubscriptionById, updateSubscription } from '../store'
import _ from 'lodash'
import { toastError } from '../../../utility/toastutill'
import { ROLES_CONSTANT } from '../../../utility/constant'
import Select from 'react-select'

const AddSubscription = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const subscriptionObj = useSelector(state => state.subscription.selectedSubscription)
  const [selectedSubscription, setSelectedSubscription] = useState({})

  const [includesFlashSales, setIncludesFlashSales] = useState(false)
  const [includesAdvertisements, setIncludesAdvertisements] = useState(false)
  const [includesValidity, setIncludesValidity] = useState(false)


  const [isEditing, setIsEditing] = useState(false)
  const [name, setname] = useState("")
  const [noOfMonth, setNoOfMonth] = useState(1)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [messageArr, setMessageArr] = useState([{ message: "" }])
  const [numberOfSales, setNumberOfSales] = useState(0)
  const [saleDays, setSaleDays] = useState(0)
  const [numberOfAdvertisement, setNumberOfAdvertisement] = useState(0)
  const [advertisementDays, setAdvertisementDays] = useState(0)
  const [rolesOptions, setrolesOptions] = useState([])
  const [role, setRole] = useState("")

  const onSubmit = () => {

    if (`${name}` === '') {
      toastError('Please Fill Name')
      return 0
    }

    if (`${price}` === '' || price <= 0) {
      toastError('Please Fill Price with a valid input (more than 0)')
      return 0
    }

    if (`${description}` === '') {
      toastError('Please Fill Description')
      return 0
    }
    if (includesValidity) {
      if (`${noOfMonth}` === '' || noOfMonth <= 0) {
        toastError('Please Fill No of months with a valid input (more than 0)')
        return 0
      }
    }
    if (includesAdvertisements) {

      if (parseInt(numberOfAdvertisement) < 0) {
        toastError('Please Fill No of Advertisement with a valid input (more than 0)')
        return 0
      }

      if (parseInt(advertisementDays) < 0) {
        toastError('Please Fill No of days of Advertisement with a valid input (more than 0)')
        return 0
      }

    }

    if (includesFlashSales) {

      if (parseInt(numberOfSales) < 0) {
        toastError('Please Fill No of Flashsales with a valid input (more than 0)')
        return 0
      }
      if (parseInt(saleDays) < 0) {
        toastError('Please Fill No of days of Flashsales with a valid input (more than 0)')
        return 0
      }

    }

    if (parseInt(price) < 0) {
      toastError('Please Fill Price with a valid input (more than 0)')
      return 0
    }

    if (!role || !role?.value) {
      toastError('Please Select Role for Subscription')
      return 0
    }

    const obj = {
      name,
      price,
      description,
      messageArr,
      includesFlashSales,
      includesAdvertisements,
      includesValidity,
      role:role?.value
    }

    if (includesAdvertisements) {
      obj.numberOfAdvertisement = numberOfAdvertisement
      obj.advertisementDays = advertisementDays
    }


    if (includesFlashSales) {
      obj.numberOfSales = numberOfSales
      obj.saleDays = saleDays
    }
    if (includesValidity) {
      obj.noOfMonth = noOfMonth
    }
    if (isEditing === true) {
      dispatch(
        updateSubscription({
          ...obj,
          id
        })
      )
    } else {
      dispatch(
        addSubscription(obj)
      )
    }
  }
  useEffect(() => {
    if (subscriptionObj && subscriptionObj.name && isEditing) {
      setname(subscriptionObj?.name ? subscriptionObj?.name : "")
      if (subscriptionObj?.role) {
        setRole({label:subscriptionObj?.role, value:subscriptionObj?.role})
      }
      setDescription(subscriptionObj?.description ? subscriptionObj?.description : "")
      setNoOfMonth(subscriptionObj?.noOfMonth ? subscriptionObj?.noOfMonth : "")
      setPrice(subscriptionObj?.price ? subscriptionObj?.price : "")
      setSaleDays(subscriptionObj?.saleDays ? subscriptionObj?.saleDays : "")
      setNumberOfSales(subscriptionObj?.numberOfSales ? subscriptionObj?.numberOfSales : "")
      setMessageArr(subscriptionObj?.messageArr ? subscriptionObj?.messageArr : [{ message: "" }])
      setIncludesFlashSales(subscriptionObj?.includesFlashSales)
      setIncludesAdvertisements(subscriptionObj?.includesAdvertisements)
      setIncludesValidity(subscriptionObj?.includesValidity)
      setNumberOfAdvertisement(subscriptionObj?.numberOfAdvertisement)
      setAdvertisementDays(subscriptionObj?.advertisementDays)
    } else {
      setname("")
      setDescription("")
      setRole("")
      setNoOfMonth(1)
      setPrice(1)
      setSaleDays(0)
      setIncludesFlashSales(false)
      setIncludesAdvertisements(false)
      setIncludesValidity(false)
      setNumberOfAdvertisement(0)
      setAdvertisementDays(0)
      setNumberOfSales(1)
      setMessageArr([{ message: "" }])
    }

  }, [subscriptionObj, isEditing])


  const handleGetSubscriptionById = () => {
    dispatch(getSubscriptionById(id))
  }

  useEffect(() => {
    // console.log(id ? "true" : "false")
    const roleSelect = Object.values(ROLES_CONSTANT).map(el => {
      return { label: el, value: el }
    }).filter((el => el.label !== "ADMIN"))
    // console.log(store, "storestorestorestore")
    setrolesOptions([ ...roleSelect])

    if (id) {
      handleGetSubscriptionById()
      setIsEditing(true)
    }

  }, [id])


  const handleAddSubscription = () => {
    let tempArr = messageArr
    tempArr = [...tempArr]
    tempArr.push({ message: "" })
    setMessageArr([...tempArr])
  }


  const handleRemoveSubscription = () => {
    let tempArr = messageArr
    tempArr = [...tempArr]
    if (tempArr.length > 1) {
      tempArr.pop()
      setMessageArr([...tempArr])
    }
  }

  const handleSetMessge = (value, index) => {
    const tempArr = _.cloneDeep(messageArr)
    // setMessageArr(messageArr.map((ele, indexX) => {
    //   if (indexX === index) {
    //     ele.message = value
    //   }
    //   return ele
    // }))
    tempArr[index].message = value
    setMessageArr([...tempArr])

  }

  return (
    <Card>
      <CardHeader>
        <Link to="/subscription/View" className=' btn btn-sm btn-warning' color='primary'>
          <ArrowUpLeft />Back
        </Link>
        <CardTitle tag='h4'>{isEditing ? "Edit" : "Add"} Subscription</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Name
            </Label>
            <Input type='text' id='basicInput' value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Subscription Name' />
          </Col>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Description
            </Label>
            <Input type='text' id='basicInput' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' />
          </Col>
        </Row>
        <Row>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Role
            </Label>
            <Select
                isClearable={false}
                value={role}
                options={rolesOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={(val) => setRole(val)}
              />
          </Col>
         
        </Row>
        <Row>
          <Col className='mb-1 my-3' xl='2' md='2' sm='12'>
            <Label className='form-label' for='basicInput'>
              Includes Flash sales
            </Label>
            <Input type='checkbox' className='ms-3' id='basicInput' checked={includesFlashSales} onChange={(e) => setIncludesFlashSales(e.target.checked)} />
          </Col>
          <Col className='mb-1  my-3' xl='3' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Includes Advertisements
            </Label>
            <Input type='checkbox' className='ms-3' id='basicInput' checked={includesAdvertisements} onChange={(e) => setIncludesAdvertisements(e.target.checked)} />
          </Col>
          <Col className='mb-1  my-3' xl='2' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Includes Validity
            </Label>
            <Input type='checkbox' className='ms-3' id='basicInput' checked={includesValidity} onChange={(e) => setIncludesValidity(e.target.checked)} />
          </Col>
        </Row>
        <Row>
          {
            includesFlashSales &&
            <>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of sales allowed in this subscription
                </Label>
                <Input type='number' id='basicInput' value={numberOfSales} onChange={(e) => setNumberOfSales(e.target.value)} placeholder='Enter number Of sales allowed in this subscription' />
              </Col>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of days for which Sales are allowed in this subscription
                </Label>
                <Input type='number' id='basicInput' value={saleDays} onChange={(e) => setSaleDays(e.target.value)} placeholder='Enter the number Of days for which Sales are allowed in this subscription' />
              </Col>
            </>
          }
        </Row>
        <Row>
          {
            includesAdvertisements &&
            <>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of advertisements allowed in this subscription
                </Label>
                <Input type='number' id='basicInput' value={numberOfAdvertisement} onChange={(e) => setNumberOfAdvertisement(e.target.value)} placeholder=' Number Of advertisements allowed in this subscription' />
              </Col>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of days for which advertisements are allowed in this subscription
                </Label>
                <Input type='number' id='basicInput' value={advertisementDays} onChange={(e) => setAdvertisementDays(e.target.value)} placeholder='Number Of days for which advertisements are allowed in this subscription' />
              </Col>
            </>
          }
          {
            includesValidity &&
            <Col className='mb-1' xl='6' md='6' sm='12'>
              <Label className='form-label' for='basicInput'>
                Duration in months ({noOfMonth})
              </Label>
              <Input type='number' id='basicInput' value={`${noOfMonth}`} onChange={(e) => setNoOfMonth(e.target.value)} placeholder='Enter Duration in days' />
            </Col>
          }
        </Row>
        <Row>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Price
            </Label>
            <Input type='number' id='basicInput' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Subscription Price' />
          </Col>


          <Col className='mb-1 d-flex justify-content-between' xl='12' md='12' sm='12'>
            <Label for='basicInput'>
              Message
            </Label>
            <div>
              <Button type='button' className='me-1' color='primary' onClick={() => handleAddSubscription()}>
                +
              </Button>
              <Button type='button' className='me-1' color='danger' onClick={() => handleRemoveSubscription()}>
                -
              </Button>
            </div>
          </Col>
          <Row className='mb-1' xl='12' md='12' sm='12'>

            {
              messageArr && messageArr.length > 0 && messageArr.map((el, index) => {
                return (
                  <Col key={index} className="mt-2" xl='4' md='4' sm='4'>
                    <Input type='text' id='basicInput' value={el?.message} onChange={(e) => handleSetMessge(e.target.value, index)} placeholder={`Message ${index + 1}`} />
                  </Col>
                )
              })
            }
          </Row>

          <Col className='mb-1' xl='12' md='12' sm='12'>
            <Button type='button' className='me-1' color='primary' onClick={() => onSubmit()}>
              Submit
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card >
  )
}
export default AddSubscription
