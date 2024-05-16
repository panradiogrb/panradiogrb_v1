"use server"
import { prisma } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache';


export async function getImageById(id: number) {
    noStore();  // Stops event data retrieved from the database being cached (enabling dynamic data rendering), which is better for displaying data that changes often
    //console.log(id)
    try {
        const image = await prisma.images.findFirst({  // Should ideally be using findUnique, but couldn't get it to work
            where: {
                observation_id: id
            }
        })
        //console.log(image)
        return image?.key;
    } catch (error) {
        console.error(`fetchImageById(): Failed to fetch image with observation id '${id}'`, error);
        throw new Error(`fetchImageById(): Failed to fetch image with observation id '${id}'`);
    }
}