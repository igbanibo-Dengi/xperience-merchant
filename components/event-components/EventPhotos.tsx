import Image from "next/image"

export default function EventPhotos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  )
}
