

// ** Reactstrap Imports
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AddTicketMessage, getTicketMessagesbyId } from '../../../services/UserTicketMessage.service'
import { DisplayDate } from '../../../utility/DateUtils'
import { toastError, toastSuccess } from '../../../utility/toastutill'
export default function UserTicketDetails() {
    const { id } = useParams()
    const params = useParams()
    const [messageArr, setMessageArr] = useState([])
    const [message, setMessage] = useState("")
    const [ticketObj, setTicketObj] = useState({})
    const userId = useSelector(state => state.auth.userData.userId)


    const handleGetUserTickets = async () => {
        try {
            const { data: res } = await getTicketMessagesbyId(params.id)
            if (res.data) {
                setMessageArr(res.data.ticketMessageArr)
                setTicketObj(res.data)
            }
        } catch (err) {
            toastError(err)
        }
    }


    useEffect(() => {
        handleGetUserTickets()
    }, [params])


    const commentsEndRef = useRef()
    const commentsContainerRef = useRef()

    const handleAddComment = async () => {
        try {
            const obj = {
                message,
                userTicketsId: params.id,
                userId
            }
            const { data: res } = await AddTicketMessage(obj)
            if (res.message) {
                toastSuccess(res.message)
                setMessage("")
                handleGetUserTickets()
            }
        } catch (err) {
            toastError(err)
        }
    }

    return (
        <div className='container'>

            <div className="row mt-4">
                <h3 className=' mb-3'>Ticket for - {ticketObj?.name}</h3>

                <div className='col-12' ref={commentsContainerRef} style={{ border: "solid 1px rgba(0,0,0,0.2)", padding: 15, borderRadius: 15, minHeight: "40vh", maxHeight: "60vh", overflowY: "auto", display: "grid", placeItems: "center" }}>
                    {messageArr && messageArr.length > 0 && messageArr.map((el, index) => {
                        return (
                            <div style={{ border: "solid 1px white", borderRadius: 5, width: "80%", marginLeft: el?.userId !== userId ? "-20%" : "20%", marginBottom: 15, backgroundColor: el?.userId !== userId ? "#E7B84E" : "grey", padding: 10 }} key={index}>
                                <div style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                                    {el.message}
                                </div>
                                <div className="row d-flex justify-content-between mt-3">
                                    <div className='col-11' style={{ fontSize: 12, color: "white" }}>
                                        by {el?.userId === userId ? "You" : "Team cloud bazar"}
                                    </div>
                                    <div className='col-1 d-flex justify-content-end' style={{ fontSize: 12, color: "white" }}>
                                        {DisplayDate(el?.createdAt, "dd/mm/yyyy")}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={commentsEndRef} style={{ marginTop: 170 }} />
                </div>


                <div className="row d-flex justify-content-between my-4">
                    <textarea className="form-control col-10" style={{ width: "80%" }} onChange={(e) => setMessage(e.target.value)} value={message} name="name" type="text" />
                    <button onClick={() => handleAddComment()} className="btn btn-custom btn-yellow mt-2" style={{ height: 40, width: "15%" }}>
                        send message
                    </button>

                </div>
            </div>

        </div>
    )
}