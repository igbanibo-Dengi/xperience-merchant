'use client'

import { useRef, useState, useCallback } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Button } from '@/components/ui/button'

interface QRCodeComponentProps {
  value: string
  size: number
  download?: boolean
  share?: boolean
}

export default function QRCodeComponent({ value, size, download, share }: QRCodeComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [copied, setCopied] = useState(false)

  const copyEventLink = useCallback(() => {

    try {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Reset after 2s
      })
    } catch (err) {
      console.error('Failed to copy QR Code link:', err)
    }
  }, [])

  const downloadQRCode = useCallback(() => {
    if (!canvasRef.current) return

    const pngUrl = canvasRef.current.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = pngUrl
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
      <QRCodeCanvas
        value={value}
        size={size}
        bgColor="white"
        fgColor="black"
        level="H"
        includeMargin
        ref={canvasRef}
      />
      <div className="flex flex-col items-center justify-center gap-4">
        {download && (
          <Button onClick={downloadQRCode} className="w-full">
            Download QR Code (PNG)
          </Button>
        )}
        {share && (
          <Button onClick={copyEventLink} className="w-full" variant="outline">
            {copied ? 'Copied!' : 'Copy Event Link'}
          </Button>
        )}
      </div>
    </div>
  )
}
