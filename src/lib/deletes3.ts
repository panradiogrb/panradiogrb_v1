"use server"
import {DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from './s3client'

export async function deleteFile(key:string){
    try {

    
    const deleteParams = {
        Bucket: process.env.AWS_S3_NAME!,
        Key: key
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3.send(deleteCommand);
    } catch (error) {
        console.error('Error deleting Image:', error);
        throw error; 
    }
}