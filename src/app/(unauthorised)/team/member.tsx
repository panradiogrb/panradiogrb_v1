import React from 'react';
import Image from 'next/image';

type TeamMember = {
    name: string,
    role: string,
    image: string,
    institute: string,
    email: string,
    website: string,
    url: string
}

function GetMember(index: number): TeamMember {
    /*
        gemma - 0
        james - 1
        alexander - 2

        actually should we maybe store the people in a databse incase gemma wants them to be edited later?
        for now implement using index
    */

    let member: TeamMember = {
        name: '',
        role: '',
        image: '',
        institute: '',
        email: '',
        website: '',
        url: ''
    };

   switch(index)
   {
    //gemma
    case 0:
        //Gemma
        member.name = "Gemma Anderson"
        member.role = "PROJECT LEAD"
        member.image = "/profile-gemma.jpg"
        member.institute = "International Centre for Radio Astronomy Research – Curtin University"
        member.email = "gemma.anderson@curtin.edu.au"
        member.website = "Gemma Anderson's Profile"
        member.url = "https://staffportal.curtin.edu.au/staff/profile/view/gemma-anderson-86adab43/"
        break;
    case 1:
        member.name = "James Leung"
        member.role = "PROJECT CO-LEAD"
        member.image = "/profile-james.jpeg"
        member.institute = "University of Toronto and Hebrew University of Jerusalem"
        member.email = "jamesk.leung@utoronto.ca"
        member.website = "James Leung's Website"
        member.url = "https://jameskleung.github.io/"
        break;
    case 2:
        member.name = "Alexander van der Horst"
        member.role = "PROJECT CO-LEAD"
        member.image = "/profile-alexander2.jpg"
        member.institute = "George Washington University"
        member.email = "ajvanderhorst@email.gwu.edu"
        member.website = "Alexander van der Horst's Profile"
        member.url = "https://physics.columbian.gwu.edu/alexander-van-der-horst"
        break;
    case 3:
        member.name = "Sarah Chastain"
        member.role = "BURST ADVOCATE"
        member.image = "/profile-sarah.png"
        member.institute = "University of New Mexico"
        member.email = "sarahchastain1@unm.edu"
        member.website = "Sarah Chastain's Profile"
        member.url = "https://physics.unm.edu/pandaweb/people/person.php?personID=2079"
        break;
    case 4:
        member.name = "Ashna Gulati"
        member.role = "BURST ADVOCATE"
        member.image = "/profile-ashna.jpeg"
        member.institute = "University of Sydney"
        member.email = "agul8829@uni.sydney.edu.au"
        member.website = "Ashna Gulati's Profile"
        member.url = "https://www.sydney.edu.au/science/about/our-people/research-students/ashna-gulati-206.html"
        break;
    case 5:
        member.name = "Lauren Rhodes"
        member.role = "BURST ADVOCATE"
        member.image = "/profile-lauren.png"
        member.institute = "University of Oxford"
        member.email = "lauren.rhodes@physics.ox.ac.uk"
        member.website = "Lauren Rhodes's Profile"
        member.url = "https://www.physics.ox.ac.uk/our-people/rhodes"
        break;
        break;
    default:
        //If nothing passed, give it placeholder square photo & disply 
        member.name = "ERROR LOADING"
        member.role = "ERROR LOADING"
        member.image = "/placeholder-square.png"
        member.institute = "ERROR LOADING"
        member.email = "ERROR LOADING"
        member.website = "ERROR LOADING"
        member.url = ""

            break;
    }

    return member;
}

const Member = ({ index }: { index: number }) => {
    //Get the correct team member
    const member: TeamMember = GetMember(index)

    return (
        <div className="group flex sm:flex-row flex-col w-auto sm:mx-16 gap-y-10 sm:p-0 sm:pl-8 place-items-center">
            <Image
                src={member.image}
                width={187.5}
                height={187.5}
                alt="White square placeholder"
                className="flex-initial rounded-[100px] group-hover:rounded-3xl group-hover:drop-shadow-glow group-hover:scale-110 transition-all ease-linear"
            >
            </Image>
            <section className="text-center sm:text-left max-w-full flex-1 group-hover:scale-110 sm:group-hover:translate-x-8 transition text-white mx-8 sm:-translate-y-2">
                <h1 className="text-xl sm:max-[1400px]:ml-8 sm:max-[1400px]:text-left text-center sm:text-center min-[1400px]:text-center text-space-purple font-bold">{member.role}</h1>
                <h2><span className='text-lg font-bold text-space-purple'>Name:</span> {member.name}</h2>
                <h2><span className='text-lg font-bold text-space-purple'>Institute:</span> {member.institute}</h2>
                <h2><span className='text-lg font-bold text-space-purple'>Email:</span> <a className='hover:text-violet-400' href={`mailto:${member.email}`}>{member.email}</a></h2>
                {/* <h2><span className='text-lg font-bold text-space-purple'>Website:</span> {member.website}</h2> */}
            </section>
        </div>
    );
}

export default Member;