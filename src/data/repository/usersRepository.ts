import baseRepository from "../baseRepository"

const usersRepository = {
    getUsers() {
        return baseRepository.get('/users');
    }
}

export default usersRepository;