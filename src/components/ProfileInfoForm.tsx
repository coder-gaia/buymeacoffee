'use client'
import saveProfile from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
    profileInfo:ProfileInfo|null;
}

export default function ProfileInfoForm({profileInfo}:Props){

    const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
    const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

    const handleFormAction = async (formData: FormData) => {
        await saveProfile(formData);
        toast.success("Changes saved!")
    }

    return (
        <form action={handleFormAction}>
        <div className="relative bg-gray-100 rounded-lg h-48 mb-4">

                <Image alt="cover-img" src={coverUrl || ''} width={1024} height={1024} className="object-cover object-center w-full h-48 rounded-lg"/>

                <div className="absolute -bottom-4 left-4 z-10 bg-gray-100 size-24 rounded-lg">

                    <div className="rounded-lg size-24 overflow-hidden"> 
                        <Image src={avatarUrl || ''} alt="avatar" width={120} height={120}/>
                    </div>

                    <div className="absolute -bottom-2 -right-2">
                        <UploadButton onUploadComplete={setAvatarUrl}/>
                    </div>

                    <input type="hidden" name="avatarUrl" value={avatarUrl} />
                </div>

                <div className="absolute right-2 bottom-2">
                    <UploadButton onUploadComplete={setCoverUrl}/>
                    <input type="hidden" name="coverUrl" value={coverUrl} />
                </div>

        </div>

        <div className="grid grid-cols-2 gap-2">

            <div>
                <label className="input-label" htmlFor="usernameIn">username:</label>
                <input defaultValue={profileInfo?.username} name="username" id="usernameIn" type="text" placeholder="username"/>
            </div>

            <div>
                <label className="input-label" htmlFor="displayNameIn">display name:</label>
                <input defaultValue={profileInfo?.displayName} name="displayName" id="displayNameIn" type="text" placeholder="display name"/>
            </div>

        </div>

        <div>
                <label className="input-label" htmlFor="bioIn">bio:</label>
                <textarea defaultValue={profileInfo?.bio} name="bio" placeholder="bio" id="bioIn"></textarea>
        </div>
        <div>
                <button className="bg-yellow-300 px-4 py-2 rounded-lg mt-4">Save profile</button>
        </div>
        </form>
    )
}