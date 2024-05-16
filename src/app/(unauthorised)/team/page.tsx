import Member from "./member";
import PublicNavbar from "../../../components/public_navbar";

export default function Home() {
    return (
        <main className="bg-banner bg-no-repeat bg-cover bg-center bg-fixed text-center h-max w-full flex flex-col z-10">
            <div className="h-screen w-full flex-1 flex flex-col items-center justify-center z-10 pb-3">
                <h2 className="p-5 text-white text-shadow-sm shadow-gray-200 font-bold text-3xl">TEAM</h2>
                <div className="w-full my-6 mx-0 grid min-[1400px]:grid-cols-2 grid-cols-1 gap-10 gap-x-10">
                    <Member index={0}></Member>
                    <Member index={1}></Member>
                    <Member index={2}></Member>
                    <Member index={3}></Member>
                    <Member index={4}></Member>
                    <Member index={5}></Member>
                </div>
            </div>

            <div className=" text-sm sm:text-base max-w-full z-10 space-y-3 pt-16 pb-16 pr-4 pl-4 sm:pl-36 bg-black bg-opacity-45">
                <h1 className="text-xl font-semibold mt-4 mb-2 text-space-purple sm:-translate-x-1/2">MEMBERS</h1>
                <li className="text-white text-left">Mathieu de Bony - Université Paris-Saclay, Email: <a className="hover:text-violet-400" href="mailto:mathieu.debony@cea.fr">mathieu.debony@cea.fr</a></li>
                <li className="text-white text-left">Hallie Fause, Email: <a className="hover:text-violet-400" href="mailto:hfausey@gwmail.gwu.edu">hfausey@gwmail.gwu.edu</a></li>
                <li className="text-white text-left">Giancarlo Ghirlanda - Osservatorio Astronomico di Brera, Email: <a className="hover:text-violet-400" href="mailto:giancarlo.ghirlanda@brera.inaf.it">giancarlo.ghirlanda@brera.inaf.it</a></li>
                <li className="text-white text-left">Ben Gompertz, Email: <a className="hover:text-violet-400" href="mailto:b.gompertz@bham.ac.uk">b.gompertz@bham.ac.uk</a></li>
                <li className="text-white text-left">Adelle Goodwin - Curtin University, Email: <a className="hover:text-violet-400" href="mailto:adelle.goodwin@curtin.edu.au">adelle.goodwin@curtin.edu.au</a></li>
                <li className="text-white text-left">Emil Lenc - CSIRO Astronomy and Space Science, Email: <a className="hover:text-violet-400" href="mailto:emil.lenc@csiro.au">emil.lenc@csiro.au</a></li>
                <li className="text-white text-left">Claire Morley - Curtin University, Email: <a className="hover:text-violet-400" href="mailto:claire.l.morley@student.curtin.edu.au">claire.l.morley@student.curtin.edu.au</a></li>
                <li className="text-white text-left">Tara Murphy - University of Sydney, Email: <a className="hover:text-violet-400" href="mailto:tara.murphy@sydney.edu.au">tara.murphy@sydney.edu.au</a></li>
                <li className="text-white text-left">Gavin Rowell - University of Adelaide, Email: <a className="hover:text-violet-400" href="mailto:gavin.rowell@adelaide.edu.au">gavin.rowell@adelaide.edu.au</a></li>
                <li className="text-white text-left">Antonia Rowlinson - University of Amsterdam and ASTRON, Email: <a className="hover:text-violet-400" href="mailto:b.a.rowlinson@uva.nl">b.a.rowlinson@uva.nl</a></li>
                <li className="text-white text-left">Thomas Russell - Istituto di Astrofisica Spaziale e Fisica Cosmica, Palermo, Italy, Email: <a className="hover:text-violet-400" href="mailto:thomas.russell@inaf.it">thomas.russell@inaf.it</a></li>
                <li className="text-white text-left">Stuart Ryder - Macquarie University Email: <a className="hover:text-violet-400" href="mailto:stuart.ryder@mq.edu.au">stuart.ryder@mq.edu.au</a></li>
                <li className="text-white text-left">Om Sharan Salafia - Osservatorio Astronomico di Brera, Email: <a className="hover:text-violet-400" href="mailto:om.salafia@inaf.it">om.salafia@inaf.it</a></li>
                <li className="text-white text-left">Fabian Schussler - Université Paris-Saclay, Email: <a className="hover:text-violet-400" href="mailto:fabian.schussler@cea.fr">fabian.schussler@cea.fr</a></li>
            </div>



            <div className="sm:mt-0 mt-8 sm:border-t-0 border-t-white border-t-2 border-t-solid -bottom-2 left-0 w-full h-fit bg-black p-2 sm:p-0 z-10">
                <p className="text-white text-center my-3 text-sm sm:text-base">
                    We acknowledge the Gomeroi people as the Traditional Owners of the Observatory site of the Australia Telescope Compact Array.
                </p>
            </div>

            <div className='fixed w-full h-svh -translate-y-[136px] bg-black/65'></div>

        </main>
    )
}
