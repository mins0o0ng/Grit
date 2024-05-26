const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            username: {     // 아이디 (email)
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            name: {         // 이름 (nick)
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {     // 비밀번호
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            school: {       // 학교
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            grade: {        // 학년
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            gender: {       // 성별
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            student_id: {    // 학생증 인증 (idcardimg)
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        //db.User.hasMany(db.Post);

        db.User.hasMany(db.Post, { foreignKey: 'userId', as: 'posts' });
    }
}