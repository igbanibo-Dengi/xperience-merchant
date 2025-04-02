"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";

export default function QRCodeComponent({ value }: { value: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const downloadQRCode = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <QRCodeCanvas
        value={value}
        size={300} // Ensures high resolution
        bgColor="white"
        fgColor="black"
        level="H" // High error correction level
        includeMargin={true} // Adds white border for better scanning
        ref={canvasRef}
      />
      <Button onClick={downloadQRCode}>Download QR Code (PNG)</Button>
    </div>
  );
}
