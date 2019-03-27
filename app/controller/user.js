const BaseController = require('./base');
class UserController extends BaseController{
    async signup(){
       // 1.得到请求体
        let {ctx} = this;
        let user = ctx.request.body;
        console.log(user);
        try{
            user = await ctx.model.User.create(user);
            this.success(user);
        }catch(err){
            this.error({user});
        }
    }
    async signin(){
        let {ctx} = this;
        let user = ctx.request.body;
        try{
            user = await ctx.model.User.findOne(user);
            if(user){
                ctx.session.user = user;
                this.success({user:user});
            }else{
                this.error("用户名密码错误!")
            }
        }catch(error){
            console.log(error)
        }
    }
    async signout(){
        let {ctx} = this;
        ctx.session.user = null;
        this.success("退出成功!");
    }
}

module.exports = UserController;