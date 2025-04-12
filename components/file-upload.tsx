"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileAccepted: (file: File) => void
  maxSize?: number
  acceptedFileTypes?: string[]
  className?: string
}

export function FileUpload({
  onFileAccepted,
  maxSize = 104857600, // 100MB
  acceptedFileTypes = [".stl", ".obj", ".3mf"],
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0]
      if (selectedFile) {
        setFile(selectedFile)
        setUploadStatus("uploading")

        // Simulate upload progress
        let progress = 0
        const interval = setInterval(() => {
          progress += 5
          setUploadProgress(progress)

          if (progress >= 100) {
            clearInterval(interval)
            setUploadStatus("success")
            onFileAccepted(selectedFile)
          }
        }, 100)
      }
    },
    [onFileAccepted],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFileTypes.reduce(
      (acc, type) => {
        acc[type] = []
        return acc
      },
      {} as Record<string, string[]>,
    ),
    maxFiles: 1,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0]
      if (error) {
        setErrorMessage(
          error.code === "file-too-large"
            ? `File is too large. Max size is ${maxSize / 1024 / 1024}MB.`
            : error.message,
        )
        setUploadStatus("error")
      }
    },
  })

  const cancelUpload = () => {
    setFile(null)
    setUploadProgress(0)
    setUploadStatus("idle")
    setErrorMessage("")
  }

  return (
    <div className={cn("w-full", className)}>
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">Drag & drop your 3D model file</h3>
            <p className="text-sm text-muted-foreground">or click to browse (STL, OBJ, 3MF up to 100MB)</p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <File className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium truncate max-w-[200px]">{file.name}</span>
              <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
            <Button variant="ghost" size="icon" onClick={cancelUpload}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>

          <div className="space-y-2">
            <Progress value={uploadProgress} className="h-2" />
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                {uploadStatus === "uploading" && (
                  <span className="text-muted-foreground">Uploading... {uploadProgress}%</span>
                )}
                {uploadStatus === "success" && (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Upload complete
                  </span>
                )}
                {uploadStatus === "error" && (
                  <span className="text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errorMessage}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
