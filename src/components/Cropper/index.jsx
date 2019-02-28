import React, { Component } from "react"
import { Toast, Button } from "antd-mobile"
import CropperComponent from "react-cropper"

import { uploadAvator } from "@/services"
import "cropperjs/dist/cropper.css"
import style from "./index.less"

const MAX_FILE_SIZE = 2 * 1024 * 1024

export default class Cropper extends Component {
  state = {
    fileData: "",
    cropResult: "",
    ModalVisible: false,
    isLoading: false
  }

  _crop() {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return
    }
    // base64
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL()
    })
    // console.log(this.cropper.getCroppedCanvas().toDataURL())
  }
  // 监听文件上传
  handleFileChange = e => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        const fileReader = new FileReader()

        fileReader.onload = e => {
          const dataURL = e.target.result
          this.setState({ fileData: dataURL }, () => {
            this.setState({ ModalVisible: true })
          })
        }
        fileReader.readAsDataURL(file)
      } else {
        Toast.fail("文件过大，请上传2M以内的图片文件!", 0.5)
      }
    }
    e.target.value = ""
  }

  handleCancel = () => {
    this.setState({ ModalVisible: false })
  }
  // 传图片给服务器
  handleSubmit = () => {
    if (!this.state.isLoading) {
      let fileName = "1501-avator"
      // 转成blob二进制传给服务器
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append("file", blob, fileName)
        this.setState({ isLoading: true })
        const res = await uploadAvator({ data: formData })
        console.log('res',res)
        this.props.onUploadedFile(res.code)
        if (res.code == 0) {
          this.setState({ ModalVisible:false})
        }
        this.setState({ isLoading: false })
      })
    }
  }

  render() {
    const { ModalVisible, fileData, isLoading } = this.state
    return (
      <div className={style.container}>
        <div className={style.input}>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={this.handleFileChange}
          />
        </div>
        {ModalVisible && (
          <div className={style.modal}>
            <CropperComponent
              src={fileData}
              aspectRatio={1 / 1}
              guides={false}
              crop={this._crop.bind(this)}
              className={style.cropper}
              preview=".cropper_preview"
              ref={el => {
                this.cropper = el
              }}
            />
            <div className={style.preview_box}>
              <img src={this.state.cropResult} alt="cropped image" />
            </div>
            <div className={style.preview_box_circle}>
              <img src={this.state.cropResult} alt="cropped image" />
            </div>
            <br style={{ clear: "both" }} />
            <div className={style.buttons}>
              <Button inline={true} onClick={this.handleCancel}>
                取消
              </Button>
              <Button type="primary" inline={true} loading={isLoading} onClick={this.handleSubmit}>
                确定
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
