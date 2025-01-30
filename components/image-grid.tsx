import Image from "next/image"

export function ImageGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 max-h-screen bg-black p-4">
      <div className="col-span-3 bg-[url('/images/auth-1.svg')] h-52 bg-cover bg-center bg-no-repeat rounded-lg" />
      <div className="bg-[url('/images/auth-2.jpg')] h-full bg-cover bg-center bg-no-repeat rounded-lg" />
      <div className="bg-[url('/images/auth-3.jpg')] h-full bg-cover bg-center bg-no-repeat rounded-lg" />
      <div className="rounded-lg overflow-hidden">
        <Image
          src="/images/auth-4.jpg"
          alt="Auth Image"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

