import { PickerDropPane } from 'filestack-react'
import React, { useEffect, useState } from 'react'
import { environment } from '../constants'
import filePickerService from '../file-picker/file-picker.service'

const FilePickerInline = (props) => {
  const [options, setOptions] = useState({
    displayMode: 'dropPane',
    container: '#inline',
    maxFiles: 500,
    fromSources: ['local_file_system'],
    onClose: () => {
      localStorage.removeItem('inline-files')
    },
  })
  const apiKey = environment.filePickerApi.key
  const [files, setFiles] = useState([])

  useEffect(() => {
    setFiles(props.data ? props.data : [])
    setOptions(Object.assign({}, options, props.options ? props.options : {}))
  }, [props])

  const onUploadDone = (fileData) => {
    let oldfiles = localStorage.getItem('inline-files')
      ? JSON.parse(localStorage.getItem('inline-files'))
      : []
    let newFiles = [...oldfiles]
    fileData.filesUploaded.map(function(file) {
      var fileAdded = newFiles.find((x) => x.FileHandler == file.handle)
      if (!fileAdded) {
        newFiles.push({
          FileHandler: file.handle,
          FileName: file.filename,
          FileSize: file.size,
          FileType: file.mimetype,
          FilePath: file.url,
        })
      }
    })
    setFiles(newFiles)
    localStorage.setItem('inline-files', JSON.stringify(newFiles))
    props.afterUpload(newFiles)
  }

  const remove = (key) => {
    let newFiles = files.splice(key, 1)
    localStorage.setItem('inline-files', JSON.stringify(newFiles))
    props.afterUpload(newFiles)
  }

  return (
    <>
      <PickerDropPane
        apikey={apiKey}
        pickerOptions={options}
        onSuccess={onUploadDone}
      />
      <div id='inline' className='dropPane'></div>
      {files &&
        files.map((file, index) => {
          return (
            <div className='btn-panel'>
               <i
                className={filePickerService.getFileIcon(file.FileType)}
              ></i>
              {file.FileName}
              <i className='fa fa-times' onClick={() => remove(index)}></i>
            </div>
          )
        })}
    </>
  )
}

export default FilePickerInline
