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
  }, {
    tableName: 'dorms',
  }
);

const DormImage = sequelize.define('DormImage',
 {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dorm_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'dorm_images',
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
  }, {
    tableName: 'listings',
  }
);

const ListingImage = sequelize.define('ListingImage', 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'listing_images',
  }
);

const ChatMessage = sequelize.define('ChatMessage', 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'chat_messages',
  }
);

User.hasMany(TutorCourse, { foreignKey: 'user_id' });
TutorCourse.belongsTo(User, { foreignKey: 'user_id' });


Dorm.hasMany(DormImage, { foreignKey: 'dorm_id' });
DormImage.belongsTo(Dorm, { foreignKey: 'dorm_id' });

Listing.hasMany(ListingImage, { foreignKey: 'listing_id' });
ListingImage.belongsTo(Listing, { foreignKey: 'listing_id' });

ChatMessage.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
ChatMessage.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

module.exports = { sequelize, User, TutorCourse, Dorm, DormImage, Listing, ListingImage, ChatMessage };
