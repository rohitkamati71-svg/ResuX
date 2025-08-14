import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { formateSize } from '~/lib/utils'
interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file)
    }, [onFileSelect])

    const maxFileSize = 10 * 1024 * 1024;

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "/application/pdf": ['.pdf'] },
        maxSize: 10 * 1024 * 1024,
    })


    const file = acceptedFiles[0] || null;

    return (
        <div className='w-full gradient-border' onClick={(e) => e.stopPropagation()}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='space-y-4 cursor-pointer'>
                    {
                        file ?
                            (
                                <div className="uploader-selected-file">
                                    <img src="/images/pdf.png" alt="pdf" className='size-10' />
                                    <div className='flex items-center space-x-3'>
                                        <div>
                                            <p className='text-sm font-medium text-gray-700 truncate max-w-xs'>
                                                {file.name}
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                {formateSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <button className='p-2 cursor-pointer' onClick={(e)=>{
                                        onFileSelect?.(null)
                                    }}>
                                        <img src="/icons/cross.svg" alt="remove" className='w-4 h-4' />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className='max-auto w-16 h-16 flex items-center justify-center '>
                                        <img src="/icons/info.svg" alt="upload" className='size-20 ml-200' />
                                    </div>
                                    <p className='text-lg text-gray-500'>
                                        <span className='font-semobold'>
                                            Click to upload
                                        </span> or drag and drop
                                    </p>
                                    <p className='text-lg text-gray-500'>PDF (max {formateSize(maxFileSize)})</p>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default FileUploader
