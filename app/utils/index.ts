import bcrypt from 'bcrypt';

export const hashPass=async(password:string)=>{
    try {
        const hashedPass =await bcrypt.hash(password,10);
        return hashedPass
    } catch (error) {
            console.error(error)
    }

}


export const isSamePass=async(password:string,hashedPass:string)=>{
    try {
        const isSame =await bcrypt.compare(password,hashedPass);
        return isSame
    } catch (error) {
            console.error(error)
    }

}

