import { create } from 'zustand';
import realTimeDb from './fireBase'
const tabState = create((set) => ({
    crntMenu: {
        login:true,
        sginup:false,
        forgotpass:false,
    },
    setTab: (pageValue)=> set({
        crntMenu:({
            login: pageValue === 'login',
            sginup: pageValue === 'sginup',
            forgotpass: pageValue === 'forgotPass',
        })
    })
}))
export const tabManager2O = create((set)=>({
  crntStatus: {
    create:true,
    edit:false,
  },
  setTab: (pageValue)=> set({
    crntStatus:({
      create: pageValue === 'create',
      edit: pageValue === 'edit',
    })
  })
}))
export const handleLogin = create((set) => {
  // Trigger Firebase listener immediately
  (function triggerFirebase() {
    try {
      realTimeDb.child('loginData').on('value', (snap) => {
        if (snap.exists()) {
          const data = snap.val();
          const userData = snap.val();
          const userNames = [];
          const Emails = [];

          Object.keys(data).forEach((key) => {
            const user = data[key];
            userNames.push(user.Username);
            Emails.push(user.Email);

          });

          set({ userNames, Emails, loading: false,userData });
        } else {
          set({ userNames: [], Emails: [], loading: false,userData:{} });
          console.log('No data found');
        }
      });
    } catch (error) {
      console.log('Firebase error:', error);
      set({loading:false})
    }
  })();


    return {
        userNames: [],
        Emails: [],
        userData: {},
        loading: true,
  };
})
export const likeblog =  (likedPost,likeBy, ownerKey)=>{
  realTimeDb.child(`Blogs/${ownerKey}/${likedPost}/likes`).push({'key':likeBy});
  realTimeDb.child(`loginData/${likeBy}/likedPost`).push({'key':likedPost})
}
export default tabState