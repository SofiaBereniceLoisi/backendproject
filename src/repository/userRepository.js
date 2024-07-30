import UserManager from '../persistence/dao/mongoDB/userManagerM.js';
import UsersDTO from '../persistence/dtos/usersReqDto.js';
const userDao = new UserManager();

export default class UserRepository {
    constructor() {
        this.dao = userDao;
    }

    async getUserById(id){
        try {
            const user = await this.dao.getById(id);
            return new UsersDTO(user);
        } catch (error) {
            throw new Error(error);
        }
    }
}