<style lang="less">
	.page-tips{
		position:relative;
		.content{
			padding:20px;
			background:#fff;
			h1{
				text-align: center;
				font-size:20px;
				line-height:30px;
				height:30px;
			};
			p{
				line-height:20px;
			}
		}
		.buttons{
			position:fixed;
			bottom:0;
			width:100%;
			>div{
				height:50px;
				line-height:50px;
				
				&:last-child{
					
				}
			}
		}
	}
</style>
<template>
	<div class="page-tips">
		<tk-header 
			:back=false 
			style="position:absolute;top:0;background:#fff;color:#000;">
			物资设备安全使用责任书
		</tk-header>
				<div class="content">
					<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据有关安全生产法律法规及江阴市防汛防旱指挥部要求，现就外借物资设备安全使用责任告知如下：
	  1、你单位是本批次外借设备安全生产管理的责任主体，应全面贯彻安全生产法律法规的要求，确保外借设备的安全生产运行。
	  2、你单位应具备使用本批次外借设备的基本安全生产条件，建立、健全安全生产责任制和各项管理制度，建立完善外借设备安全运行管理台账。
	  3、你单位应加强对管理人员和作业人员的安全生产培训，保证他们具备必要的安全生产知识和技能，特种作业人员（如电工、起重工等）必须持证上岗。
	  4、你单位必须组织管理人员和相关作业人员认真学习本批次外借设备的安全使用说明，并严格按相关使用说明和警示事项进行操作和实施，并加强监督检查。
	  5、你单位必须为现场管理和作业人员配备符合标准的劳动防护用品，并监督作业人员正确佩戴使用，加强作业区域范围的安全管理。
	  6、本批次外借设备均已检验合格后出库。你单位在使用前应按照设备使用说明书中相关要求进行必要的安全检查检测，在各项检查检测内容符合安全运行要求后方能投入使用。
	  7、抗排机泵是重要的防汛防旱设备，在运输装卸过程中应注意设备不碰撞、不挤压、不损坏，在使用过程中，应由专业人员负责操作，做到不断水、不断油、机泵不带病运行，电动机、电瓶等电气设备要注意防潮、防湿、防雨淋。
	  8、应认真落实安全生产检查制度，设备运行期间应派专人现场监管，发现异常或问题及时妥善处理，坚决杜绝设备带病运行。
	  9、抗排任务完成后，你单位应拆卸清洗机泵设备后及时归还入库、经双方工作人员确认，如机泵有非自然损坏，主要机件零配件缺失，乙方应按市场价赔偿，赔偿金在归还时一次性结清。 
	
	        我已阅读并接受物资设备安全使用责任书协议
				</p>
				</div>
			
	</div>
</template>

<script>
	export default {
		data(){
			return {
				hasgree:false//true为已同意
			}
		},
		//记忆功能
		watch:{
			hasgree(newV){
				var uid=this.$store.state.uid
				var localString=localStorage.getItem(uid)||"{}";
				var local=JSON.parse(localString);
				local.hasgree=newV;
				localStorage.setItem(uid,JSON.stringify(local));
			}
		}
	}
</script>

