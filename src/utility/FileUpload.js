import React, { useState } from "react"
import { Button } from "reactstrap"

function FileUpload({ onFileChange, acceptImage, returnOriginal }) {
  const [file, setFile] = useState("")

  const getBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
      // console.log('Error: ', error)
    }
  }
  const handleFileSelection = (event) => {
    event.preventDefault()

    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        setFile(event.target.files[0])
        if (returnOriginal) {
          onFileChange(event.target.files[0])
        }  else {
          onFileChange(result)
        }
      })
    }
  }
  return (
    <div className="position-relative">
      {
        acceptImage === true ? <input type="file" onChange={(event) => handleFileSelection(event)} className="form-control" accept="image/png, image/gif, image/jpeg" /> : <input type="file" onChange={(event) => handleFileSelection(event)} className="form-control" />
      }
  
    </div>
  )
}

export default FileUpload
