import AdminHeader from '@/Components/AdminHeader';
import mainimage from '@/assets/nft-removebg-preview.png';
import Image from 'next/image';



export default function Home() {

  return (
    <>
    <div className="flex min-h-screen flex-col p-20">
      <div>
        <AdminHeader/>
      </div>
      <section className="">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Administering Effortless Travel with QBUS!</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Manage, Monitor, Optimize — It's That Simple.</p>
            
            
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            {/* <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"> */}
            <Image src={mainimage} alt="mockup" />
        </div>                
    </div>
</section>
    </div>
    </>
  )
}
