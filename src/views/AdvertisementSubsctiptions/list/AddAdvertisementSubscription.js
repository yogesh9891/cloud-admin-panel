// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import { addSubscription, getSubscriptionById, updateSubscription } from '../store'
import _ from 'lodash'
const AddAdvertisementSubscription = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const subscriptionObj = useSelector(state => state.subscription.selectedSubscription)
  const [selectedSubscription, setSelectedSubscription] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [name, setname] = useState("")
  const [noOfMonth, setNoOfMonth] = useState(1)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [messageArr, setMessageArr] = useState([{ message: "" }])
  const [numberOfAdvertisements, setNumberOfAdvertisements] = useState(0)
  const [advertisementDays, setAdvertisementDays] = useState(0)


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


    if (isEditing === true) {
      dispatch(
        updateSubscription({
          name,
          price,
          description,
          advertisementDays,
          numberOfAdvertisements: numberOfAdvertisements ? numberOfAdvertisements : 0,
          id
        })
      )
    } else {
      dispatch(
        addSubscription({
          name,
          price,
          description,
          advertisementDays,
          numberOfAdvertisements: numberOfAdvertisements ? numberOfAdvertisements : 0
        })
      )
    }
  }
  useEffect(() => {
    if (subscriptionObj && subscriptionObj.name && isEditing) {
      setname(subscriptionObj?.name ? subscriptionObj?.name : "")
      setDescription(subscriptionObj?.description ? subscriptionObj?.description : "")
      setPrice(subscriptionObj?.price ? subscriptionObj?.price : "")
      setAdvertisementDays(subscriptionObj?.advertisementDays ? subscriptionObj?.advertisementDays : "")
      setNumberOfAdvertisements(subscriptionObj?.numberOfAdvertisements ? subscriptionObj?.numberOfAdvertisements : "")
    } else {
      setname("")
      setDescription("")
      setPrice("")
      setAdvertisementDays(0)
      setNumberOfAdvertisements("")
    }

  }, [subscriptionObj, isEditing])


  const handleGetSubscriptionById = () => {
    dispatch(getSubscriptionById(id))
  }

  useEffect(() => {
    // console.log(id ? "true" : "false")
    if (id) {
      handleGetSubscriptionById()
      setIsEditing(true)
    }

  }, [id])


  return (
    <Card>
      <CardHeader>
        <Link to="/subscription/advertisement/view" className=' btn btn-sm btn-warning' color='primary'>
          <ArrowUpLeft />Back
        </Link>
        <CardTitle tag='h4'>{isEditing ? "Edit" : "Add"} Advertisement Subscription</CardTitle>
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

          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Number Of advertisements allowed in this subscription
            </Label>
            <Input type='number' id='basicInput' value={numberOfAdvertisements} onChange={(e) => setNumberOfAdvertisements(e.target.value)} placeholder='Enter number Of sales allowed in this subscription' />
          </Col>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Number Of days for which Advertisements are allowed in this subscription
            </Label>
            <Input type='number' id='basicInput' value={advertisementDays} onChange={(e) => setAdvertisementDays(e.target.value)} placeholder='Enter the number Of days for which Sales are allowed in this subscription' />
          </Col>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Price
            </Label>
            <Input type='number' id='basicInput' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Subscription Price' />
          </Col>


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
export default AddAdvertisementSubscription
