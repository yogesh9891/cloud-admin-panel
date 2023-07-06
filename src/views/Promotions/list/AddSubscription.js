// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import { addSubscription, getSubscriptionById, updateSubscription } from '../store'
import _ from 'lodash'
const AddSubscription = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const subscriptionObj = useSelector(state => state.subscription.selectedSubscription)
  const [selectedSubscription, setSelectedSubscription] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [name, setname] = useState("")
  const [durationInDays, setDurationInDays] = useState(0)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [messageArr, setMessageArr] = useState([{ message: "" }])
  const [numberOfPromotions, setNumberOfPromotions] = useState(0)

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

    if (`${durationInDays}` === '' || durationInDays <= 0) {
      toastError('Please Fill Duration In Days with a valid input (more than 0)')
      return 0
    }


    if (isEditing === true) {
      dispatch(
        updateSubscription({
          name,
          price,
          description,
          durationInDays,
          messageArr,
          numberOfPromotions: numberOfPromotions ? numberOfPromotions : 0,
          id
        })
      )
    } else {
      dispatch(
        addSubscription({
          name,
          price,
          description,
          messageArr,
          numberOfPromotions: numberOfPromotions ? numberOfPromotions : 0,
          durationInDays
        })
      )
    }
  }
  useEffect(() => {
    if (subscriptionObj && subscriptionObj.name && isEditing) {
      setname(subscriptionObj?.name ? subscriptionObj?.name : "")
      setDescription(subscriptionObj?.description ? subscriptionObj?.description : "")
      setDurationInDays(subscriptionObj?.durationInDays ? subscriptionObj?.durationInDays : "")
      setPrice(subscriptionObj?.price ? subscriptionObj?.price : "")
      setNumberOfPromotions(subscriptionObj?.numberOfPromotions ? subscriptionObj?.numberOfPromotions : "")
      setMessageArr(subscriptionObj?.messageArr ? subscriptionObj?.messageArr : [{ message: "" }])
    } else {
      setname("")
      setDescription("")
      setDurationInDays("")
      setPrice("")
      setNumberOfPromotions("")
      setMessageArr([])
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
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Duration in days
            </Label>
            <Input type='number' id='basicInput' value={durationInDays} onChange={(e) => setDurationInDays(e.target.value)} placeholder='Enter Duration in days' />
          </Col>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Number Of Promotions allowed in this subscription
            </Label>
            <Input type='number' id='basicInput' value={numberOfPromotions} onChange={(e) => setNumberOfPromotions(e.target.value)} placeholder='Enter Number Of Promotions allowed in this subscription' />
          </Col>
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
