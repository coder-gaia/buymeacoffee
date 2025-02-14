import { model, models, Schema } from "mongoose";

type ProfileInfo = {
	email: string,
    username: string,
    displayName: string,
    bio:string,
    avatarUrl: string,
    coverUrl: string
}

const profileSchema = new Schema<ProfileInfo>({
	email: {type:String, unique:true, required:true},
    username: {type:String, required:true, unique:true},
    displayName: {type:String},
    bio: {type:String},
    avatarUrl: {type:String},
    coverUrl: {type: String}
}, {timestamps:true})

export const ProfileInfoModel = models.ProfileInfo || model('ProfileInfo', profileSchema);