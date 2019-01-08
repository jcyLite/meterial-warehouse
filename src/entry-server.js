import createApp from './app'
export default (context)=>{
	return new Promise((resolve,reject)=>{
		const {app,router}=createApp(context);
		const {url} = context;
		const {fullPath} = router.resolve(url).route;
		if(fullPath !== url){
			return reject({
				url:fullPath
			})
		}
		//设置服务器端router的位置
		router.push(context.url)
		router.onReady(()=>{
			const matchedComponents=router.getMatchedComponents();
			if(!matchedComponents.length){
				return reject({
					code:404
				})
			}
			resolve(app)
		},reject);
	})
}
