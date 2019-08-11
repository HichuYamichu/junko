const Router = require('koa-router');
const router = new Router()

router.get('/api/guilds', async ctx => {
  ctx.body = await ctx.rpc.fetchGuildsAsync(null);
});

router.get('/api/guild/:id', async ctx => {
  ctx.body = await ctx.rpc.fetchGuildAsync(ctx.params);
});

router.post('/api/say', async ctx => {
  ctx.body = await ctx.rpc.sayAsync(ctx.request.body);
});

module.exports = router