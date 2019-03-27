const { Controller } = require('egg');

class BaseController extends Controller{
    async getPager(modelName,fields=[]){
        const {ctx} = this;
        let {pageNum=1,pageSize = 5,keyword = ''} = ctx.query;
        pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
        pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
        let query = {};
        if(keyword && fields.length>0){
            query['$or'] = fields.map(field => ({ [fields] : new RegExp(keyword)}))
        }
        console.log(query);
        console.log(1);
        let items = await ctx.model[modelName].find(query).skip((pageNum - 1)*pageSize).limit(pageSize);
        let total = await ctx.model[modelName].count(query);
        return {
                items,
                total,
                pageNum,
                pageSize,
                pageCount:Math.ceil(total/pageSize)
            };
    }
    get user(){
        return this.ctx.session.user;
    }
    success(data){
        let {ctx} = this;
        ctx.body = {
            code:1,
            data
        }
    }
    error(error){
        let {ctx} = this;
        ctx.body = {
            code:0,
            error
        }
    }
}
module.exports = BaseController;