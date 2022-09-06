import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import {MongoClient} from 'mongodb'

const DUMMY_DATA = [
    {
        id: 'm1',
        title: 'visiting the Trump tower down town',
        image: 'https://images.unsplash.com/photo-1548260616-b71c60ccea3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80',
        address: '401 N Wabash Ave, Chicago, IL 60611',
        description: 'The Trump International Hotel and Tower is a skyscraper condo-hotel in downtown Chicago, Illinois. The building, named for Donald Trump, was designed by architect Adrian Smith of Skidmore, Owings and Merrill. Bovis Lend Lease built the 100-story structure, which reaches a height of 1,388 feet (423.2 m) including its spire, its roof topping out at 1,171 feet (357 m). It is next to the main branch of the Chicago River, with a view of the entry to Lake Michigan beyond a series of bridges over the river. The building received publicity when the winner of the first season of The Apprentice reality television show, Bill Rancic, chose to manage the construction of the tower over managing a Rancho Palos Verdes based "Trump National Golf Course & Resort" in the Los Angeles metro area.\n' +
            '\n' +
            'Trump announced in 2001 that the skyscraper would become the tallest building in the world, but after the September 11 attacks that same year, the architects scaled back the building\'s plans, and its design underwent several revisions. When topped out in 2009, it became the seventh-tallest building in the U.S. It surpassed the city\'s John Hancock Center as the building with the highest residence (apartment or condo) in the world, and briefly held this title until the completion of the Burj Khalifa.\n' +
            '\n' +
            'The design of the building includes, from the ground up, retail space, a parking garage, a hotel and condominiums. The 339-room hotel opened for business with limited accommodations and services on January 30, 2009, then full accommodation and services on April 28. The building topped out in late 2008 and construction was completed in 2009. Sixteen was one of five restaurants in Chicago with at least a Michelin Guide two-star rating in 2016 and one of three five-star Forbes-rated restaurants in the city until it closed in 2018. The spa is one of six with at least a four-star Forbes rating in the Chicago area in 2015. (WIKI)'
    },
    {
        id: 'm2',
        title: 'visiting the Willis tower down town',
        image: 'https://images.unsplash.com/photo-1548454934-789466bdec3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
        address: '233 S Wacker Dr, Chicago, IL 60606',
        description: 'The Willis Tower (formerly the Sears Tower) is a 108-story, 1,451-foot (442.3 m) skyscraper in Chicago. The tower has 108 stories as counted by standard methods, though the building\'s owners count the main roof as 109 and the mechanical penthouse roof as 110.[4][3] At completion in 1974, it surpassed the World Trade Center in New York City to become the tallest building in the world, a title that it held for nearly 25 years. It was also the tallest building in the Western Hemisphere for 41 years, until the One World Trade Center surpassed it in 2013, and had the highest occupiable floor until surpassed by the Central Park Tower in 2022.\n' +
            '\n' +
            'The Willis Tower is considered a seminal achievement for engineer Fazlur Rahman Khan.[5] It is currently the third-tallest building in the United States and the Western hemisphere – and the 23rd-tallest in the world. Each year, more than one million people visit its observation deck, the highest in the United States, making it one of Chicago\'s most popular tourist destinations.\n' +
            '\n' +
            'As of April 2018, the building\'s largest tenant is United Airlines, which moved its corporate headquarters from 77 West Wacker Drive (then the United Building) in 2012, occupying around 20 floors.[6][7][8] Other major tenants include the building\'s namesake Willis Towers Watson and law firms Schiff Hardin and Seyfarth Shaw.[8] Morgan Stanley became the building\'s fourth-largest tenant in 2017.[8][9]\n' +
            '\n' +
            'Known as the Sears Tower from its construction until the naming rights were included in a 2009 lease with the Willis Group, it served as the headquarters of retail company Sears from 1974 to 1994. Local area residents still refer to the building by its old name.[10] (WIKI)'
    },
    {
        id: 'm3',
        title: 'visiting the Bean tower down town',
        image: 'https://images.unsplash.com/photo-1590253230659-0863d300f57d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3873&q=80',
        address: '201 E Randolph St, Chicago, IL 60602',
        description: 'Cloud Gate is a public sculpture by Indian-born British artist Anish Kapoor, that is the centerpiece of AT&T Plaza at Millennium Park in the Loop community area of Chicago, Illinois. The sculpture and AT&T Plaza are located on top of Park Grill, between the Chase Promenade and McCormick Tribune Plaza & Ice Rink. Constructed between 2004 and 2006, the sculpture is nicknamed "The Bean" because of its shape, a name Kapoor initially disliked, but later grew fond of. Made up of 168 stainless steel plates welded together, its highly polished exterior has no visible seams. It measures 33 by 66 by 42 feet (10 by 20 by 13 m), and weighs 110 short tons (100 t; 98 long tons).\n' +
            '\n' +
            'Kapoor\'s design was inspired by liquid mercury and the sculpture\'s surface reflects and distorts the city\'s skyline. Visitors are able to walk around and under Cloud Gate\'s 12-foot (3.7 m) high arch. On the underside is the "omphalos" (Greek for "navel"), a concave chamber that warps and multiplies reflections. The sculpture builds upon many of Kapoor\'s artistic themes, and it is popular with tourists as a photo-taking opportunity for its unique reflective properties.\n' +
            '\n' +
            'The sculpture was the result of a design competition. After Kapoor\'s design was chosen, numerous technological concerns regarding the design\'s construction and assembly arose, in addition to concerns regarding the sculpture\'s upkeep and maintenance. Various experts were consulted, some of whom believed the design could not be implemented. Eventually, a feasible method was found, but the sculpture\'s construction fell behind schedule. It was unveiled in an incomplete form during the Millennium Park grand opening celebration in 2004, before being concealed again while it was completed. Cloud Gate was formally dedicated on May 15, 2006, and has since gained considerable popularity, both domestically and internationally.'
    },
    {
        id: 'm4',
        title: 'visiting the John hancock tower down town',
        image: 'https://images.unsplash.com/photo-1550548105-e596e5512266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
        address: '875 North Michigan Avenue',
        description: 'The John Hancock Center is a 100-story, 1,128-foot[7] supertall skyscraper located in Chicago, Illinois. Located in the Magnificent Mile district, its name was changed to 875 North Michigan Avenue in 2018. Despite this, the building is still colloquially called the John Hancock Center.\n' +
            '\n' +
            'The skyscraper was constructed under the supervision of Skidmore, Owings and Merrill (SOM),[7] by SOM partners, Peruvian-US chief designer Bruce Graham and Bangladeshi-US structural engineer Fazlur Rahman Khan.[8] When the building topped out on May 6, 1968,[1] it was the second-tallest building in the world after the Empire State Building, and the tallest in Chicago. It is currently the fifth-tallest building in Chicago and the thirteenth-tallest in the United States, behind the Aon Center in Chicago and ahead of the Comcast Technology Center in Philadelphia. When measured to the top of its antenna masts, it stands at 1,500 feet (457 m).[9] The building is home to several offices and restaurants, as well as about 700 condominiums, and at the time of its completion contained the highest residence in the world. The building was named for John Hancock Mutual Life Insurance Company, a developer and original tenant of the building, which itself was named for the U.S. Founding Father John Hancock.[10] In 2018, John Hancock Insurance, years after leaving the building requested that its name be removed and the owner is seeking another naming rights deal.[10]\n' +
            '\n' +
            'From the 95th floor restaurant, diners can look out at Chicago and Lake Michigan. The observatory (360 Chicago),[11] which competes with the Willis Tower\'s Skydeck, has a 360° view of the city, up to four states, and a distance of over 80 miles (130 km). 360 Chicago is home to TILT, a moving platform that leans visitors over the edge of the skyscraper to a 30-degree angle,[12] a full bar with local selections,[13] Chicago\'s only open-air SkyWalk, and also features free interactive high definition touch screens in six languages.[14] The 44th-floor sky lobby features America\'s highest indoor swimming pool. (WIKI)'
    },
    {
        id: 'm5',
        title: 'visiting Navy Pier tower down town',
        image: 'https://images.unsplash.com/photo-1547838555-1a3b10c67181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
        address: '600 E Grand Ave, Chicago, IL 60611',
        description: 'Navy Pier is a 3,300-foot-long (1,010 m) pier on the shoreline of Lake Michigan, located in the Streeterville neighborhood of the Near North Side community area in Chicago, Illinois, United States. Navy Pier encompasses over 50 acres (20 ha) of parks, gardens, shops, restaurants, family attractions and exhibition facilities and is one of the top destinations in the Midwestern United States, drawing nearly over nine million visitors annually.[2][3] It is one of the most visited attractions in the entire Midwest and is Chicago\'s second-most visited tourist attraction.[2][4 (WIKI)'
    }
]

export default function HomePage(props) {
    return (
        <>
            <Head>
                <title>Tourists Meetups</title>
                <meta
                    name='description'
                    content='Add or browse for your favorite tourist attractions'
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        }
    }
}