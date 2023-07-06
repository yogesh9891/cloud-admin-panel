// ** Reactstrap Imports
import { Link, useParams } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Label, Input, FormText, Row, Col, Button } from 'reactstrap'
import { ArrowUpLeft, Minus, Plus, Trash } from 'react-feather'
import { useEffect, useState } from 'react'
import { toastError } from '../../../utility/toastutill'
import { getNestedCategoriesApi } from "../../../services/category.service"
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrand, getBrand } from '../brand/store'
import FileUpload from '../../../utility/FileUpload'
import { addProduct, getProduct, getProductById, updateProduct } from '../store'
import { generateFilePath } from '../../../services/url.service'

const AddProduct = () => {

  const dispatch = useDispatch()
  const { id } = useParams()

  const brandArr = useSelector(state => state.brands.brand)
  const productRedux = useSelector(state => state.products.selectedProduct)

  const [categoryArr, setcategoryArr] = useState([])
  const [brand, setbrand] = useState("")
  const [category, setcategory] = useState("")
  const [name, setname] = useState("")
  const [thickness, setthickness] = useState("")
  const [application, setapplication] = useState("")
  const [grade, setgrade] = useState("")
  const [color, setcolor] = useState("")
  const [size, setsize] = useState("")
  const [wood, setwood] = useState("")
  const [glue, setglue] = useState("")
  const [price, setprice] = useState("")
  const [sellingprice, setsellingprice] = useState("")
  const [warranty, setwarranty] = useState("")
  const [shortDescription, setshortDescription] = useState("")
  const [longDescription, setLongDescription] = useState()
  const [image, setimage] = useState()
  const [status, setstatus] = useState(false)
  const [isUpdated, setisUpdated] = useState(false)
  const [updateObj, setupdateObj] = useState({})
  const [imageArr, setimageArr] = useState([
    {
      image: ""
    }
  ])

  const [mainCategoryArr, setmainCategoryArr] = useState([])

  const handleFileSet = (value, index) => {
    const tempArr = imageArr

    tempArr[index].image = value
    setimageArr([...tempArr])
  }
  const handleNestedCategory = async () => {
    try {
      const { data: res } = await getNestedCategoriesApi()
      if (res.success && res.data.length) {
        setcategoryArr(res.data)
      }

    } catch (error) {
      console.error(error)
      toastError(error)
    }
  }

  useEffect(() => {
    if (productRedux !== null) {
      setname(productRedux?.name)
      setprice(productRedux?.price)
      setsellingprice(productRedux?.sellingprice)
      setcategory(productRedux?.categoryId)
      setbrand(productRedux?.brand)
      setthickness(productRedux?.specification?.thickness)
      setapplication(productRedux?.specification?.application)
      setgrade(productRedux?.specification?.grade)
      setcolor(productRedux?.specification?.color)
      setwood(productRedux?.specification?.wood)
      setglue(productRedux?.specification?.glue)
      setwarranty(productRedux?.specification?.warranty)
      setshortDescription(productRedux?.shortDescription)
      setLongDescription(productRedux?.longDescription)
      setimage(productRedux?.mainImage)
      setstatus(productRedux?.status)
      setisUpdated(true)
      setupdateObj(productRedux)
      setimageArr(productRedux?.imageArr)
      setmainCategoryArr(productRedux?.categoryArr)
      setsize(productRedux?.specification?.size)

    }
  }, [productRedux])

  const handleCtegoryEvent = (id) => {
    const tempCategoryArr = []
    categoryArr.map(el => {
      if (el._id === id) {
        tempCategoryArr.push({ categoryId: el._id })
      } else {
        if (el.subCategoryArr && el.subCategoryArr.length > 0) {
          el.subCategoryArr.map(elx => {
            if (elx._id === id) {
              tempCategoryArr.push({ categoryId: el._id })
              tempCategoryArr.push({ categoryId: elx._id })
            }
          }
          )
        }
      }
    }
    )

    setcategory(id)
    setmainCategoryArr([...tempCategoryArr])
  }


  useEffect(() => {
    if (id) {
      dispatch(getProductById(id))
    }
  }, [id])
  const onSubmit = () => {

    if (`${name}` === '') {
      toastError('Please Fill Name')
      return 0
    }
    if (`${category}` === '') {
      toastError('Please Fill Category')
      return 0
    }
    if (`${price}` === '') {
      toastError('Please Fill Price')
      return 0
    }
    if (`${thickness}` === '') {
      toastError('Please Fill Thickness')
      return 0
    }
    if (`${application}` === '') {
      toastError('Please Fill Application')
      return 0
    }

    if (`${color}` === '') {
      toastError('Please Fill Color')
      return 0
    }

    if (`${shortDescription}` === '') {
      toastError('Please Fill shortDescription')
      return 0
    }

    if (`${image}` === '') {
      toastError('Please add main imgae')
      return 0
    }
    if (imageArr && imageArr.length > 1) {
      if (imageArr.some(el => !el.image)) {
        toastError('canot upload blank image')
        return 0
      }
    }


    if (isUpdated === true) {
      dispatch(
        updateProduct({
          name,
          categoryId: category,
          brand,
          price,
          sellingprice,
          specification: {
            thickness,
            application,
            grade,
            color,
            wood,
            glue,
            warranty,
            size
          },
          shortDescription,
          longDescription,
          status,
          image,
          imageArr,
          categoryArr: mainCategoryArr,
          id: updateObj._id
        })
      )
    } else {
      dispatch(
        addProduct({
          name,
          categoryId: category,
          brand,
          price,
          sellingprice,
          specification: {
            thickness,
            application,
            grade,
            color,
            wood,
            glue,
            warranty,
            size
          },
          imageArr,
          categoryArr: mainCategoryArr,
          shortDescription,
          longDescription,
          status,
          image
        })
      )
    }
  }
  const subcategoryRender = (cateArr, dash) => {
    dash += '- '
    console.log(cateArr.length)
    return (
      cateArr && cateArr.length > 0 && cateArr.map((cat) => {
        return (
          <>
            <option key={cat._id} value={cat._id}>{dash}{cat.name}</option>
            {subcategoryRender(cat.subCategoryArr, dash)}
          </>

        )
      })
    )
  }

  const handleImageAdd = () => {
    setimageArr([...imageArr, { image: "" }])
  }
  const handleImagesRemove = (removeIndex) => {
    if (imageArr.length > 1) {
      setimageArr([
        ...imageArr.filter(
          (el, index) => index !== removeIndex
        )
      ])
    }
  }

  useEffect(() => {
    handleNestedCategory()
    dispatch(getBrand('status=true'))
  }, [])


  return (
    <Card>
      <CardHeader>
        <Link to="/products/product-lists" className=' btn btn-sm btn-warning' color='primary'>
          <ArrowUpLeft />Back
        </Link>
        <CardTitle tag='h4'>Add Product</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className='mb-1' xl='4' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Name
            </Label>
            <Input type='text' id='basicInput' value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Product Name' />
          </Col>
          <Col className='mb-1' xl='4' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Select  Category {categoryArr.length}
            </Label>
            <select className='form-control' value={category} onChange={(e) => handleCtegoryEvent(e.target.value)}>
              <option value="">Please Select Category</option>
              {categoryArr && categoryArr.length > 0 && subcategoryRender(categoryArr, '-')}
            </select>
          </Col>
          <Col className='mb-1' xl='4' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Select  Brand
            </Label>
            <select className='form-control' value={brand} onChange={(e) => setbrand(e.target.value)}>
              <option value="">Please Select Brand</option>
              {brandArr && brandArr.length > 0 && brandArr.map(el => <option value={el._id}>{el.name}</option>)}
            </select>
          </Col>
          <Col className='mb-1' xl='4' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Price
            </Label>
            <Input type='text' id='basicInput' value={price} onChange={(e) => setprice(e.target.value)} placeholder='Enter Product Price' />
          </Col>
          <Col className='mb-1' xl='4' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Selling Price
            </Label>
            <Input type='text' id='basicInput' value={sellingprice} onChange={(e) => setsellingprice(e.target.value)} placeholder='Enter Product Selling Price' />
          </Col>
          <h4>Specification</h4>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Thickness
            </Label>
            <Input type='text' id='basicInput' value={thickness} onChange={(e) => setthickness(e.target.value)} placeholder='Enter Product Thickness' />
          </Col>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Usage/Application
            </Label>
            <Input type='text' id='basicInput' value={application} onChange={(e) => setapplication(e.target.value)} placeholder='Enter Product Usage/Application' />
          </Col>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Size
            </Label>
            <Input type='text' id='basicInput' value={size} onChange={(e) => setsize(e.target.value)} placeholder='Enter Product Size' />
          </Col>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Grade
            </Label>
            <Input type='text' id='basicInput' value={grade} onChange={(e) => setgrade(e.target.value)} placeholder='Enter Product Grade' />
          </Col>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Color
            </Label>
            <Input type='text' id='basicInput' value={color} onChange={(e) => setcolor(e.target.value)} placeholder='Enter Product Color' />
          </Col>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Wood Type
            </Label>
            <Input type='text' id='basicInput' value={wood} onChange={(e) => setwood(e.target.value)} placeholder='Enter Product Wood Type' />
          </Col>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Glue Used
            </Label>
            <Input type='text' id='basicInput' value={glue} onChange={(e) => setglue(e.target.value)} placeholder='Enter Product Glue Used' />
          </Col>
          <Col className='mb-1' xl='3' md='4' sm='6'>
            <Label className='form-label' for='basicInput'>
              Warranty
            </Label>
            <Input type='text' id='basicInput' value={warranty} onChange={(e) => setwarranty(e.target.value)} placeholder='Enter Product Warranty' />
          </Col>
          <h4>Description</h4>
          <Col className='mb-1' xl='6' md='12' sm='12'>
            <Label className='form-label' for='basicInput'>
              Short Description
            </Label>
            <Input type='textarea' name='text' value={shortDescription} onChange={(e) => setshortDescription(e.target.value)} id='exampleText' rows='3' placeholder='Enter Your Short Ddescription' />
          </Col>
          <Col className='mb-1' xl='6' md='12' sm='12'>
            <Label className='form-label' for='basicInput'>
              Long Description
            </Label>
            <Input type='textarea' name='text' value={longDescription} onChange={(e) => setLongDescription(e.target.value)} id='exampleText' rows='3' placeholder='Enter Your Short Ddescription' />

          </Col>

          <Col className='mb-1' xl='4' md='12' sm='12'>
            <Label className='form-label' for='basicInput'>
              Main Image
            </Label>
            <FileUpload onFileChange={(val) => setimage(val)} />
          </Col>
          <Col className='mb-1' xl='2' md='12' sm='12'>
            {
              image && image.includes('data:image') ? (<img src={image} width="100px" height="80px" />) : (<img src={generateFilePath(image)} width="100px" height="80px" />)
            }
          </Col>
          <Col className='mb-1' xl='6' md='12' sm='12'>

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
          </Col>
          <Col className='mb-1' xl='12' md='12' sm='12'>
            <Label className='form-label my-2' for='basicInput'>
              Muptiple Image <button type='button' className='btn btn-sm btn-success' onClick={() => { handleImageAdd() }}><Plus /> Add</button>
            </Label>
            <Row>
              {
                imageArr && imageArr.map((img, indez) => (
                  <>
                    <Col className='mb-1' xl='2' md='3' sm='6'> {img.image}
                      <FileUpload onFileChange={(val) => handleFileSet(val, indez)} />
                    </Col>
                    {
                      img.image && (<Col className='mb-1' xl='1' md='1' sm='1'>
                        {
                          img.image.includes('data:image') ? (<img src={img.image} width="100px" height="80px" />) : (<img src={generateFilePath(img.image)} width="100px" height="80px" />)
                        }
                      </Col>)
                    }

                    <Col className='mb-1' xl='1' md='1' sm='1'>
                      <button type='button' className='btn btn-sm btn-danger' onClick={() => handleImagesRemove(indez)}><Trash /> </button>
                    </Col>
                  </>
                ))
              }
            </Row>
          </Col>
          <Col className='mb-1' xl='12' md='12' sm='12'>
            <Button type='button' className='me-1' color='primary' onClick={() => { onSubmit() }} >
              Submit
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default AddProduct
