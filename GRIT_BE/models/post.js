// 통합 post.js
const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {  //N:1
        //db.Post.belongsTo(db.User, { as: 'author' });
        // db.Post.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });

        db.Post.belongsTo(db.User, {as: 'author' });
    }
};
