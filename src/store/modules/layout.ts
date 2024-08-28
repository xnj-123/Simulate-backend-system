import {defineStore} from 'pinia'

const layoutStore = defineStore('layout',{
    state:():any=>{
        return {
            isexpand:false,
            refresh:false,
        }
    },
    actions:{

    },
    getters:{

    }
})

export default layoutStore;