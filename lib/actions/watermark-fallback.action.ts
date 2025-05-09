"use server"

import sharp from "sharp"

/**
 * Fallback watermark implementation that uses a simpler approach
 * @param imageUrl URL of the image to watermark
 * @returns Base64 encoded watermarked image
 */
export async function addWatermarkFallback(imageUrl: string): Promise<string> {
  try {
    // Fetch the image
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`)
    }

    const imageBuffer = await imageResponse.arrayBuffer()

    // Get image dimensions
    const metadata = await sharp(Buffer.from(imageBuffer)).metadata()
    const width = metadata.width || 800
    const height = metadata.height || 600

    // Create a simple watermark overlay
    const watermarkOverlay = {
      create: {
        width,
        height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    }

    // Create a grid of watermark text
    const compositeOperations = []
    const spacing = Math.max(width, height) / 5

    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        // Add offset to create diagonal pattern
        const offsetX = (y / spacing) % 2 === 0 ? 0 : spacing / 2

        compositeOperations.push({
          input: Buffer.from(
            `<svg width="${spacing}" height="${spacing / 4}">
              <text 
                x="50%" 
                y="50%" 
                font-family="Arial, sans-serif" 
                font-size="${spacing / 6}px" 
                fill="rgba(128, 128, 128, 0.5)" 
                text-anchor="middle" 
                dominant-baseline="middle"
              >© Xperience</text>
            </svg>`,
          ),
          left: Math.round(x + offsetX),
          top: Math.round(y),
        })
      }
    }

    // Create watermark overlay
    const watermarkBuffer = await sharp(watermarkOverlay).composite(compositeOperations).toBuffer()

    // Add watermark to the image
    const watermarkedImage = await sharp(Buffer.from(imageBuffer))
      .composite([
        {
          input: watermarkBuffer,
          blend: "over",
        },
      ])
      .toBuffer()

    // Convert to base64
    const base64Image = `data:image/jpeg;base64,${watermarkedImage.toString("base64")}`

    return base64Image
  } catch (error) {
    console.error("Error adding fallback watermark:", error)
    throw error
  }
}
