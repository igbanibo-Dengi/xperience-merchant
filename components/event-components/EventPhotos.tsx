import Image from 'next/image'

export default function EventPhotos() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-square rounded-lg bg-gray-200"></div>
      ))}
    </div>
  )
}
