const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');


const User = sequelize.define('User',
  {
    id : {
      type : DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true
    },
    name : {
      type : DataTypes.STRING(100),
      allowNull : false
    },
    email : {
      type : DataTypes.STRING(100),
      allowNull : false,
      unique : true
    },
    password : {
      type : DataTypes.STRING(255),
      allowNull : false 
    },
    profile_picture : {
      type : DataTypes.STRING(255),
      defaultValue : '/assets/default-profile.png'
    },
    bio : {
      type : DataTypes.TEXT
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },    
    verification_code : {
      type : DataTypes.STRING(6)
    },
    is_verified : {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    },
  }, {
    timestamps: true,
    tableName : 'users'
  }
);



const TutorCourse = sequelize.define('TutorCourse', 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_name : {
      type : DataTypes.STRING(100),
      allowNull : false,
      unique : true 
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: false, 
    }
  }, 
  {
    timestamps: true,
    tableName: 'tutor_courses'
  }
);

const Dorm = sequelize.define('Dorm', 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_urls: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('image_urls');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('image_urls', JSON.stringify(value));
      }
    }    
  }, {
    timestamps: true,
    tableName: 'dorms'
  }
);


const Listing = sequelize.define('Listing', 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_urls: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('image_urls');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('image_urls', JSON.stringify(value));
      }
    }    
  },    
  {
    timestamps: true,
    tableName: 'listings'
  }
);


User.hasMany(TutorCourse, { foreignKey: 'user_id', as: 'tutor_courses' });
TutorCourse.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

User.hasMany(Listing, { foreignKey: 'user_id', as: 'listings' });
Listing.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

module.exports = { sequelize, User, TutorCourse, Dorm, Listing };
