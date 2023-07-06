

// ** Reactstrap Imports
import moment from 'moment'
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { Link, useParams } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardTitle, Row } from 'reactstrap'
// import { addSubscription, getSubscriptionById, updateSubscription } from '../store'
import { getFlashSalebyId } from '../../../../services/FlashSales.service'
import { toastError } from '../../../../utility/toastutill'
export default function FlashSalesDetails() {
    const { id } = useParams()
    const [flashSaleObj, setFlashSaleObj] = useState({})
    // ** States
    const handleGetUsersSubscriptionById = async (query) => {
        try {
            const { data: res } = await getFlashSalebyId(query)
            if (res.data) {
                console.log(res, "userSUb")
                setFlashSaleObj(res.data)
            }
        } catch (err) {
            toastError(err)
        }
    }

    useEffect(() => {
        // console.log(id ? "true" : "false")
        if (id) {
            handleGetUsersSubscriptionById(id)
        }

    }, [id])


    return (
        <Card>
            <CardHeader>
                <Link to="/flash-sales/view" className=' btn btn-sm btn-warning' color='primary'>
                    <ArrowUpLeft />Back
                </Link>


                <CardTitle tag='h4'>User's Subscriptions</CardTitle>
            </CardHeader>

            <CardBody>
                <Row>
                    <div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Owner Name</td>
                                    <td>{flashSaleObj?.userId?.name}</td>
                                </tr>
                                <tr>
                                    <td>Product Name</td>
                                    <td>{flashSaleObj?.productId?.name}</td>
                                </tr>
                                <tr>
                                    <td>Discount Type</td>
                                    <td>{flashSaleObj?.discountType}</td>
                                </tr>
                                <tr>
                                    <td>Discount Value</td>
                                    <td>{flashSaleObj?.discountValue}</td>
                                </tr>
                                <tr>
                                    <td>Sale Price</td>
                                    <td>{flashSaleObj?.salePrice}</td>
                                </tr>
                                <tr>
                                    <td>Product Price</td>
                                    <td>{flashSaleObj?.price}</td>
                                </tr>
                                <tr>
                                    <td>Sale Starts on</td>
                                    <td>{moment(flashSaleObj?.startDate).format("DD-MM-YYYY")}</td>
                                </tr>
                                <tr>
                                    <td>Sale ends on</td>
                                    <td>{moment(flashSaleObj?.startDate).format("DD-MM-YYYY")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Row>
            </CardBody>
        </Card >
    )
}