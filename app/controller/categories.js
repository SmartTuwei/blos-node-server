const BaseController = require('./base');

module.exports = class CategoriesController extends BaseController{
    //查询 分页
    async index(){
        try{
            let items = await this.getPager('Category',['name']) //skip跳过执行条数；limit 限定返回条数
            this.success(items);
        }catch(error){
            this.error(error);
        }
    }
    //增加文章分类
    async create(){
        let {ctx } = this;
        let category = ctx.request.body;
        try{    
            let doc = await ctx.model.Category.findOne(category);
            if(doc){
                this.error("次分类已经存在!");
            }else{
                doc = await ctx.model.Category.create(category);
                this.success("保存成功！");
            }
        }catch(error){
            console.log(error)
        }
    } 
    //更新
    async update(){
        let {ctx } = this;
        let id = ctx.params.id
        let category = ctx.request.body;//{name:"new"};
        try{    
           let result = await ctx.model.Category.findByIdAndUpdate(id,category);
           this.success(result);
        }catch(error){
            console.log(error);
        }
    }
    //更新
    async destroy(){
        let {ctx} = this;
        let id = ctx.params.id;
        //能够同时支持删除一个或者多个 ；
        let {ids = []} = ctx.request.body;
        ids.push(id);
        try{    
            await ctx.model.Category.remove({_id:{$in:ids}});
            this.success("删除成功!");
        }catch(error){
            console.log(error);
        }
    }     
}