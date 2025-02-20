import Image from 'next/image'

export function ImageGrid() {
  return (
    <div className="grid max-h-screen grid-cols-3 gap-4 bg-black p-4">
      <div className="col-span-3 h-52 rounded-lg bg-[url('/images/auth-1.svg')] bg-cover bg-center bg-no-repeat" />
      <div className="h-full rounded-lg bg-[url('/images/auth-2.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="h-full rounded-lg bg-[url('/images/auth-3.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="overflow-hidden rounded-lg">
        <Image
          src="/images/auth-4.jpg"
          alt="Auth Image"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
