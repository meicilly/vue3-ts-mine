export let BASE_URL = ''
export const TIME_OUT = 5000

if(process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://120.27.159.12:8000'
}else if(process.env.NODE_ENV === 'production'){
    BASE_URL = 'http://120.27.159.12:8000'
}