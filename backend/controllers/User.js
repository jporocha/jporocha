// import UserModel from '../models/user';
// import CompanyModel from '../models/company';

module.exports = class UserService {

    constructor(user) {
        return '200'
    }

    async Signup(user) {
        // const userRecord = await UserModel.create(user);
        // const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id 
        // const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created

        setTimeout(() => {
            return {
                name: user.name,
                email: user.mail
            }
        }, 1000)
    }
}