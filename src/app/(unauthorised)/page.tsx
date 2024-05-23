import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



export default function Home() {

  let width: number = 500;
  let height: number = 300;

  return (
    <main className='bg-gradient-to-t to-black via-black from-home-purple w-full min-h-screen flex flex-col'>

      {/* <div className='flex justify-center w-full'>

        <Image
          className=' z-10 translate-y-28 max-h-[15.5rem]  w-full'
          src={"/upscaledbanner.png"}
          alt={""}
          fill={true}
          objectFit="cover"
        >
        </Image>
        <Image
          className='pb-9 pt-5 scale-0 '
          src={"/panradio-logo.png"}
          alt={""}
          width={width}
          height={25}
        >
        </Image>
      </div> */}

      <div className='flex justify-center w-full relative'>
        {/* <div className='w-full h-[15.5rem] lg:h-[15.5rem]  min-[853px]:h-[11.5rem] sm:h-[9.5rem] min-[689px]:h-[7.5rem]  min-[320px]:h-[4.5rem] relative'> */}
        <div className='w-full  lg:h-[14.5rem] min-[853px]:h-[10.5rem]  sm:h-[7.5rem]  min-[320px]:h-[4.5rem] relative'>

          <Image
            className='z-10 w-full h-full object-cover'
            src={"/upscaledbanner.png"}
            alt={""}
            fill={true}
          />
        </div>
      </div>


      <div className='flex lg:flex-row md:flex-row min-[320px]:flex-col'>
        <section className=' text-white opacity-80 md:pt-20 pl-16 md:self-auto self-center md:px-0 px-10 md:order-first md:ml-10   '>
          <h1 className='p-6  text-xl font-semibold -translate-x-4 pb-2  text-center '>Quick Links</h1>
          <ul className=''>
            <li>
              <Link className='hover:underline flex flex-row gap-2 ' href='https://github.com/tvtom99/PanradioGRB'>
                <FaGithub className='translate-y-1 ' />
                <p className="">PanRadioGRB Github</p>
              </Link>
            </li>
          
            <li>
              <Link href='mailto:gemma.anderson@curtin.edu.au' className='hover:underline flex flex-row gap-2 '>
                <MdEmail className='translate-y-1' />
                <p>Reach Gemma Anderson</p>
              </Link>
            </li>
            <li>
              <Link className='hover:underline flex flex-row gap-2 ' href='https://ui.adsabs.harvard.edu/'>
              <Image className=' -mx-1 ' src={"/ads.png"}  width={25} height={5} alt={""}/>
                <p className="">Astrophysics Data System</p>
              </Link>
            </li>
          </ul>
        </section>
        <section className='text-white grid grid-cols-1  lg:grid-cols-2 justify-items-center md:pt-20 pt-10 flex-1 text-justify gap-y-5 gap-x-16 px-16 pb-16 '>


          <div>
          <h1 className='text-purple-text font-semibold text-4xl p-5 text-center'>
            ABOUT US
          </h1>
            The PanRadio GRB project seeks to study the radio light (afterglow) emitted by gamma-ray bursts (GRBs) using the<span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.narrabri.atnf.csiro.au/'>CSIRO Australia Telescope Compact Array (ATCA)</Link>.
            PanRadio GRB falls under the Australia Telescope National Facility <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.atnf.csiro.au/observers/docs/opal/guide.html#OPALLongTermProjects'>(ATNF) Long-term project scheme</Link>
            <span> </span>and has been awarded 1000 hrs of observing time since 2023 to observe all GRBs detected by <span> </span>
            <Link className='hover:underline text-space-purple' href='https://swift.gsfc.nasa.gov/'>The Neil Gehrels Swift Observatory (Swift)</Link><span> </span>
            below a declination of -10 deg. The novelty of this project lies in the utilisation of the<span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.atnf.csiro.au/observers/apply/too_apply.html'>ATCA rapid-response service</Link>,
            which can automatically begin observing the GRB within minutes of detection by Swift, allowing us to capture the earliest radio light emitted by these events. We continue to monitor these GRBs with ATCA in combination with other state-of-the-art facilities such as the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.csiro.au/en/about/facilities-collections/atnf/askap-radio-telescope'>Australian Square Kilometre Array Pathfinder (ASKAP)</Link>, the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.sarao.ac.za/science/meerkat/'>South African MeerKAT radio telescope</Link>, the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.phy.cam.ac.uk/research/research-groups/ap/ami'>Arcminute Microkelvin Imager (AMI)</Link>, the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.e-merlin.ac.uk/'>enhanced Multi Element Remotely Linked Interferometer Network (eMERLIN)</Link>, and the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.seti.org/ata'>Allen Telescope Array</Link>. We have an International team providing broad multi-wavelength and theoretical experience in GRB astrophysics, providing collaborative links to ongoing GRB efforts with the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://webb.nasa.gov/'>James Webb Space Telescope</Link>, the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.mpi-hd.mpg.de/hfm/HESS/pages/about/telescopes/'>High Energy Stereoscopic System (H.E.S.S.)</Link>, and the <span> </span>
            <Link className='hover:underline text-space-purple' href='https://www.almaobservatory.org/en/home/'>Atacama Large Millimeter/submillimeter Array (ALMA)</Link>.
          </div>
          
          <div className='flex justify-center flex-col content-center'>
          <h1 className='text-purple-text font-semibold text-4xl p-5 text-center'>
            OUR MISSION
          </h1>

            PanRadio GRB will perform the first comprehensive radio survey of GRBs, the most powerful explosions in the Universe. In the 25+ years following the discovery of the first afterglow, few GRBs have comprehensive enough radio monitoring to provide a complete understanding of what drives these explosions and how they interact with the surrounding environment. Our goal is to obtain the most comprehensive and unbiased dataset of GRB radio afterglows from minutes to years post-burst by observing all GRB detected by Swift in the Southern Hemisphere.
            <Image
              className="rounded-3xl self-center p-3"
              src={"/telescopes.jpg"}
              width={400}
              height={400}
              alt={"telescopes"}
            ></Image>
          </div>
        </section>
      </div>

      <div className="w-full h-fit bg-black py-4">
        <p className="text-white text-center text-sm">
          We acknowledge the Gomeroi people as the Traditional Owners of the Observatory site of the Australia Telescope Compact Array.
        </p>
      </div>
    </main>
  );
}
