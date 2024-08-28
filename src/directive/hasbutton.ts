import pinia from '@/store'
import useUserStore from '@/store/modules/userstore'
let userStore = useUserStore(pinia);

export const hasButton = (app:any)=>{
    app.directive('has',{
        onMounted(el:any,option:any){
            if(!userStore.button.includes(option.value)){
                el.parentNode.removeChild(el);
            }
        }
    })
}