'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/users/signup', controller.user.signup);
  router.post('/api/users/signin', controller.user.signin);
  router.get('/api/users/signout', controller.user.signout);

  //分类
  router.resources("categories","/api/categories",controller.categories);
  //文章
  router.resources("articles","/api/articles",controller.articles);
   
  router.get('/api/articles/pv/:id', controller.articles.addPv); //阅读量
  router.post('/api/articles/comment/:id', controller.articles.addComment);//评论接口
  router.delete('/api/articles/:article_id/comment/:comment_id',controller.articles.removeComment);//删除评论
};
// router.get("/api/categories",controller.categories.index);
// router.get("/api/categories",controller.categories.create);//创建
// router.get("/api/categories/:id",controller.categories.upadta);//更新
// router.get("/api/categories/:id",controller.categories.destroy);//销毁