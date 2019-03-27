//app代表应用对象
module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    let UserSchema = new Schema({
        userName: { type: String  },
        password: { type: String  },
        email:{ type: String  }
    });
    return mongoose.model("User",UserSchema);
}