import baseRepository from "../baseRepository"; 

export interface SignupBody {
    name: string,
    family: string,
    phoneNumber: string,
    nationalCode: string,
    emailAddress: string,
    password: string,
}
export interface LoginBody {
    phoneNumber: string,
    password: string
}

const authRepository = {
    Signup(body: SignupBody){
        return baseRepository.post('/signup', body);
    },
    Login(body:LoginBody){
        return baseRepository.post('/login', body);
    },
    Logout() {
        localStorage.removeItem("access_token");
    }
}

export default authRepository;
