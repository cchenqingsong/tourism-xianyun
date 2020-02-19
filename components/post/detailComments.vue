<template>
      <div class="comments">
          <detailComments :data='data.parent' v-if="data.parent" style="width:100%;"></detailComments>
                <!-- 评论个人信息区域 -->
            <el-row class="userinfo" type="flex" style="padding-bottom:5px;">
                <!-- 用户小头像 -->
                <el-avatar size='small' :src="$axios.defaults.baseURL + data.account.defaultAvatar"></el-avatar>
                <!-- 用户名 -->
                <span>{{data.account.nickname}}</span>&nbsp;&nbsp;
                <!-- 评论时间 -->
                <span>2019-12-14 4:53</span>
            </el-row>

            <!-- 评论文本区域 -->
            <el-row class="comments-content" >
                <!-- 遍历图片 -->
                <img :src="$axios.defaults.baseURL + item.url" alt="" v-for="(item,index) in data.pics" :key="index" style="padding-left:10px;">
                <!-- 显示的文本 -->
                <p style="padding-left:10px;">{{data.content}}</p>
            </el-row>

            <!-- 回复按钮 -->
            <el-row type="flex" style="justify-content: space-between">
                <div></div>
                <a href="javascript:;" style="font-size:12px;padding:0 10px 10px 0" @click="reply">回复</a>
            </el-row>
            
      </div>
</template>

<script>
export default {
    name: 'detailComments' ,
    props:{
        data:{
            type: Object,
            default:{}
        }
    },
    data(){
        return{

        }
    },
    methods: {
        reply(){
            console.log(this.data)
        }
    }
}
</script>

<style scroped lang='less'>
.comments{
    padding: 2px;
    font-size: 16px;
    background-color: #f9f9f9;
    border: 1px solid #dddddd;
}
.comments-content{
    img{
        width: 80px;
    }
}
.userinfo{
    align-items: center;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 10px;
    span{
        font-size: 12px;
        color: #666;
        
    }
}
</style>