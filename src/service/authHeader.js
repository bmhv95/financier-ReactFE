export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.jwttoken){
        return 'Bearer ' + user.jwttoken;
    } else{
        return {};
    }
}