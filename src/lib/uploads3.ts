"use server"

import { PutObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import s3 from './s3client'


export async function getSignedURL(file: File, key: string) {

    //PUT command to send to S3 bucket
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_NAME!,
        Key: key,
        ContentType: file.type,
        //can embed metadata, i.e. GRB observation name
    })
    //web app has 60 seconds to upload otherwise it expires
    const signedURL = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60,
    })
    // Use fetch to upload the file to S3
    const response = await fetch(signedURL, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to upload file to S3: ${response.statusText}`);
    }

    return {
        success: true,
        url: signedURL,
    };
}