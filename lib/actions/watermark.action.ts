"use server"

import sharp from "sharp"

/**
 * Adds a repeating watermark pattern to an image and returns the watermarked image as base64
 * @param imageUrl URL of the image to watermark
 * @returns Base64 encoded watermarked image
 */
export async function addWatermark(imageUrl: string): Promise<string> {
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

    // Create watermark text with Adobe Stock-like pattern
    const watermarkText = "© Xperience 2025"
    const fontSize = Math.max(width, height) / 80 // Adjust size based on image dimensions
    const spacing = fontSize * 4 // Space between watermarks

    // Calculate how many watermarks we need in each direction
    const xRepeats = Math.ceil(width / spacing) * 2
    const yRepeats = Math.ceil(height / spacing) * 2

    // Create SVG with diagonal repeating pattern
    let watermarkElements = ""

    // Create a grid of watermarks
    for (let y = -yRepeats; y < yRepeats * 2; y++) {
      for (let x = -xRepeats; x < xRepeats * 2; x++) {
        const xPos = x * spacing
        const yPos = y * spacing
        watermarkElements += `
          <text 
            x="${xPos}" 
            y="${yPos}" 
            font-family="Arial, sans-serif" 
            font-size="${fontSize}px" 
            fill="rgba(0, 0, 0, 0.15)" 
            transform="rotate(-30, ${xPos}, ${yPos})"
          >${watermarkText}</text>
        `
      }
    }

    const watermarkSvg = Buffer.from(`
      <svg width="${width}" height="${height}">
        ${watermarkElements}
      </svg>
    `)

    // Add watermark to the image
    const watermarkedImage = await sharp(Buffer.from(imageBuffer))
      .composite([
        {
          input: watermarkSvg,
          blend: "over",
        },
      ])
      .toBuffer()

    // Convert to base64
    const base64Image = `data:image/jpeg;base64,${watermarkedImage.toString("base64")}`

    return base64Image
  } catch (error) {
    console.error("Error adding watermark:", error)
    throw error
  }
}
