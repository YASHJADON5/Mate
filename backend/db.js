const mongoose= require("mongoose");

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed in connecting with MongoDB:", error);
    }
};


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project' 
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task' 
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const projectSchema =  mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task' 
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Not Started'
    },
    remarks: {
        type: [String], 
        default: [] 
    }
    ,

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const user= mongoose.model('user', userSchema)
const task= mongoose.model('task', taskSchema)
const project= mongoose.model('project', projectSchema)







module.exports={
    connectMongoose,
    user,
    task,
    project
}