import { create } from "zustand";
import realTimeDb from './fireBase'
const crntuserData = create((set)=> ({
    userInfo: {},

    fetchUserInfo: (key)=>{
        if (!key) return;
        console.log('in userInfo')
        realTimeDb.child(`loginData/${key}`).once('value',(snap)=>{
            set({userInfo:snap.val()})
            console.log(snap.val())
        })
    }
}))

export const crntUserBlogs = create((set)=>({
    myBlogs: {},
    isLoading: true,
    fetchUserBlogs : (key)=>{
        realTimeDb.child(`Blogs/${key}`).on('value',(snap)=>{
            set({myBlogs:snap.val()});
        })
        set({isLoading:false})
    }
}))

export default crntuserData