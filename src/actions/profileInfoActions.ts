'use server'
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function saveProfile(formData: FormData){
    await mongoose.connect(process.env.MONGODB_URI as string);

    const session = await getServerSession(authOptions);
    if(!session) throw "You must be logged in."
    const email = session.user?.email;

    const {username, displayName, bio, coverUrl} = Object.fromEntries(formData);

    const profileInfoDoc = await ProfileInfoModel.findOne({email})

    if(profileInfoDoc){
        profileInfoDoc.set({username, displayName, bio, coverUrl});
        await profileInfoDoc.save();
    }else{
        await ProfileInfoModel.create({email, username, displayName, bio, coverUrl})
    }

    return true;
}