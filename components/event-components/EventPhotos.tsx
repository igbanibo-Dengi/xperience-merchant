import { Event } from '@/types/event'
import Image from 'next/image'

const pexelsImages = [
  'https://images.pexels.com/photos/3184193/pexels-photo-3184193.jpeg',
  'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg',
  'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg',
  'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg',
  'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg',
  'https://images.pexels.com/photos/3771847/pexels-photo-3771847.jpeg',
  'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
  'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg',
  'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg',
  'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg',
  'https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg',
  'https://images.pexels.com/photos/3182740/pexels-photo-3182740.jpeg',
  'https://images.pexels.com/photos/3182740/pexels-photo-3182740.jpeg',
  'https://images.pexels.com/photos/3182740/pexels-photo-3182740.jpeg',
  'https://images.pexels.com/photos/3182740/pexels-photo-3182740.jpeg',
]

export default function EventPhotos({ event }: { event: Event }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {pexelsImages.map((url, i) => (
        <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={`${url}?auto=compress&cs=tinysrgb&dpr=2&h=500&w=500`}
            alt={`Event photo ${i + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}
