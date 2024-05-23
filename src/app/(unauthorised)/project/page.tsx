import Image from "next/image";
export default function Home() {
    return (
        <main className="min-h-screen bg-header bg-no-repeat bg-cover bg-center bg-fixed my-0 mx-0 text-center h-max w-full flex flex-col text-white">
            <div className="sm:text-3xl w-full sm:px-14 flex flex-row text-white font-bold items-end z-10  min-[320px]:text-l  min-[320px]:px-6  ">
                PanRadio <span className="sm:text-5xl min-[320px]:text-3xl px-4 text-space-purple">GRB</span> Project Description
            </div>


            <div className="flex flex-col pb-9 flex-1 text-justify mx-32 text-xl bg-gradient-to-t to-black via-black from-home-purple px-10 mt-6 mb-6 rounded-xl z-10 w-11/12 self-center">
                {/* FIRST SECTION */}
                <h1 className="text-left mx-10 mb-12 mt-6 w-fit sm:text-3xl min-[320px]:text-2xl min-[320px]:text-center text-white font-bold text-shadow-sm shadow-white">GRBs and their radio afterglows</h1>

                <p className="sm:text-l min-[320px]:text-sm text-justify sm:text-left">
                    GRBs are the most extreme explosions in our Universe caused by either a massive star going supernova (long GRBs) or the merger of two neutron stars (short GRBs). As suggested by their name, GRBs release an initial flash of gamma-ray radiation lasting for seconds to minutes that are detected by dedicated space satellites such as The Neil Gehrels Swift Observatory. GRBs launch relativistic and highly collimated (jetted) outflow that collide with the surrounding gas and dust, generating a forward and reverse shock. Electrons at the shock front are then accelerated by the compression of magnetic fields, which causes them to produce synchrotron radiation that we observe as a long-lived “afterglow” emitting across the entire electromagnetic spectrum - from radio to gamma-ray wavelengths.
                </p>
                <div className='self-center w-full flex flex-col gap-1 py-10'>
                    <Image
                        src={"/gemma-image-1.png"}
                        width={800}
                        height={800}
                        alt='project-image-1'
                        className="self-center rounded"
                    >
                    </Image>

                    <p className=' text-xs text-center sm:text-sm text-white/50 sm:p-4  lg:px-32 md:px-16'>
                        Schematic of the expected radio emission from a GRB, which arises from the forward and reverse shock. Radio is the best wavelength to probe the reverse shock as it usually fades below detectability at optical, X-ray and gamma-ray wavelengths within seconds. ATCA can target both forward and reverse shock emission between 1-50 GHz. Early time radio emission and the reverse shock can tell us about the central engine of the GRB (black hole or supramassive neutron star) and the composition of the outflow. We also use the more sensitive MeerKAT and ASKAP facilities to follow the afterglow evolution to late times (months to years post-burst) at lower (less than 5 GHz) radio frequencies to probe the outflow geometry and energetics as well as the density of the surrounding environment. GRB graphic credit: NASA
                    </p>
                </div>

                <p className="sm:text-l min-[320px]:text-sm text-justify sm:text-left"> 
                    The gamma-ray, X-ray and optical light of GRB afterglows are usually well captured by space and ground-based instruments. However, radio observations, particularly just following the explosion are often lacking, which may be due to the comparatively smaller number of radio facilities that are difficult to schedule rapidly. As a result, radio follow-up of GRBs is often motivated by some other known property of the event such as being optically bright or nearby, further biasing our sample of radio observed events. Nonetheless, radio observations of GRBs track the fastest-moving ejecta and are therefore crucial for understanding the composition of their outflows as well as their energetics and environmental properties.
                </p>


                {/* SECOND SECTION */}
                <h1 className="text-left mx-10 my-12 w-fit sm:self-start sm:text-3xl min-[320px]:text-2xl min-[320px]:self-center text-white font-bold text-shadow-sm shadow-white">Science Goals</h1>
                <p className="sm:text-l min-[320px]:text-sm text-left sm:text-center">Over 4 years we will use ATCA to establish a complete and unbiased, multi-frequency and high-cadence radio view of GRBs, which will be used to address the following fundamental questions: </p>
                <ol type='1' className='list-decimal list-inside  sm:px-12 py-5 text-lg sm:text-l min-[320px]:text-xs text-center sm:text-left'>
                    <li className="p-2">
                        What is the composition of the GRB jet and the source of the radio emission at early times?
                    </li>
                    <li className="p-2">
                        What is the geometry of GRB outflows?
                    </li>
                    <li className="p-2">
                        Is there universality to GRB shock wave physics and do these properties evolve with time?
                    </li>
                    <li className="p-2"> 
                        What are the total energy budgets of GRBs and the nature of their environments?
                    </li>
                </ol>
                <p className="pt-6 sm:text-l min-[320px]:text-sm " >In particular, early- and late-time radio, on which these questions rely are very seldom explored. Our program will help to answer these questions by doubling the number of GRBs with comprehensive radio monitoring, from early (within a day) through to late (years) time. </p>

                {/* THIRD SECTION */}
                <h1 className="text-center sm:text-left mx-10 my-12 w-fit sm:text-3xl min-[320px]:text-2xl sm:self-start self-center text-white font-bold text-shadow-sm shadow-white">Observing Strategy</h1>
                <p className="sm:text-l min-[320px]:text-sm text-justify sm:text-left">Beginning in the 2023 April ATCA observing semester, we expect to observe 10 long and 2 short GRBs per year over 4 years below a declination of -10 deg, obtaining an unbiased radio sample from early (less than 24 hours) to late (months to years) times post-burst. We are using the rapid-response observing system on ATCA to automatically and rapidly trigger observations of GRBs within minutes of their discovery (or when they have risen above the horizon), collecting the very earliest light emitted by these events. We then continue to monitor their radio afterglows from days to weeks post-burst over multiple radio frequencies using ATCA (1-50 GHz). We will continue to monitor any radio afterglow with ATCA until they fade below detectability. </p>
                
                
                {/* FOURTH SECTION */}
                <h1 className="text-left mx-10 my-12 w-fit sm:text-3xl min-[320px]:text-2xl min-[320px]:text-center text-white font-bold text-shadow-sm shadow-white">Australia Rapid-response radio telescopes</h1>
                <p className="sm:text-l min-[320px]:text-sm text-justify  sm:text-left">Both the Australia Telescope Compact Array (ATCA) and the Murchison Widefield Array (MWA) are equipped with rapid-response observing systems, which allow them to automatically respond to transient alerts broadcast via the General Coordinates Network causing them to repoint and begin observing the event between seconds to minutes post-burst. </p>
                
                <div className='self-center w-full flex flex-col gap-1 py-4'>
                    <Image
                        src={"/gemma-image-2.png"}
                        width={600}
                        height={600}
                        alt='project-image-2'
                        className="self-center rounded"
                    >
                    </Image>

                    <p className='text-xs sm:text-sm text-white/50 p-1 sm:p-4 lg:px-32 md:px-16 text-center '>
                    Flow diagram depicting the rapid-response observing system required for detecting early time radio emission from GRBs. Following a GRB (1), Swift will detect the event (2) and then transmit its position down to Earth (3). This positional information will then be received by MWA and ATCA, resulting in radio observations of the event with response times within minutes of the burst’s detection (4).
                    </p>
                </div>
            
            </div>



            {/**************************/
            // ACKNOWLEDGEMENT HEADER
            /**************************/}
            <div className="sm:mt-0 sm:border-t-0 border-t-black border-t-2 border-t-solid -bottom-2 left-0 w-full h-fit bg-black p-2 sm:p-0 z-10">
                <p className="text-white text-center my-3 text-sm sm:text-base">
                    We acknowledge the Gomeroi people as the Traditional Owners of the Observatory site of the Australia Telescope Compact Array.
                </p>
            </div>

            <div className='fixed w-full h-svh -translate-y-[136px] bg-black/45'></div>
        </main>
    )
}
