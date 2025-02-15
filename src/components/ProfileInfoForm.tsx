'use client'
import saveProfile from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";

type Props = {
    profileInfo:ProfileInfo|null;
}

export default function ProfileInfoForm({profileInfo}:Props){

    const [coverUrl, setCoverUrl] = useState("");

    const handleFormAction = async (formData: FormData) => {
        const result = await saveProfile(formData);
        console.log(result);
    }

    return (
        <form action={handleFormAction}>
        <div className="bg-gray-100 p-4 rounded-lg">
                <div className="bg-gray-100 size-24 rounded-full p-4">avatar</div>
                <div>
                    cover image    
                    <UploadButton onUploadComplete={setCoverUrl}/>
                    <input type="hidden" name="coverUrl" value={coverUrl} />
                </div>
            </div>
            <div>
                <label className="block mt-4" htmlFor="usernameIn">username:</label>
                <input defaultValue={profileInfo?.username} name="username" id="usernameIn" type="text" placeholder="username"/>
            </div>
            <div>
                <label className="block mt-4" htmlFor="displayNameIn">display name:</label>
                <input defaultValue={profileInfo?.displayName} name="displayName" id="displayNameIn" type="text" placeholder="display name"/>
            </div>
            <div>
                <label className="block mt-4" htmlFor="bioIn">bio:</label>
                <textarea defaultValue={profileInfo?.bio} name="bio" placeholder="bio" id="bioIn"></textarea>
            </div>
            <div>
                <button className="bg-yellow-300 px-4 py-2 rounded-lg mt-4">Save profile</button>
        </div>
        </form>
    )
}