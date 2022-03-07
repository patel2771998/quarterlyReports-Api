'use strict';

module.exports = function (sequelize, DataTypes) {
    const FollowModel = sequelize.define('FollowModel', {
        id_user:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fiscalDateEnding: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'follows'
    });
    return FollowModel;
};