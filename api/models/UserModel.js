'use strict';

module.exports = function (sequelize, DataTypes) {
    const UserModel = sequelize.define('UserModel', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        otp :{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('active', 'pending', 'suspended', 'cancelled'),
            allowNull: false,
            defaultValue: 'active'
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
    }, {
        tableName: 'users'
    });

    return UserModel;
};