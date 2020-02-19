<template>
      <el-card class="comments">
          <!-- 评论个人信息区域 -->
      <el-row class="userinfo" type="flex">
          <!-- 用户小头像 -->
          <el-avatar size='small' :src="$axios.defaults.baseURL + data.account.defaultAvatar"></el-avatar>
          <!-- 用户名 -->
          <span>{{data.account.nickname}}</span>&nbsp;&nbsp;
          <!-- 评论时间 -->
          <span>2019-12-14 4:53</span>
      </el-row>

      <!-- 评论文本区域 -->
      <el-row class="comments-content" >
          <!-- 显示的文本 -->
          <p>{{data.content}}</p>
          <!-- 遍历图片 -->
          <img :src="$axios.defaults.baseURL + item.url" alt="" v-for="(item,index) in data.pics" :key="index" >
      </el-row>

      <!-- 回复按钮 -->
      <el-row type="flex" style="justify-content: space-between">
          <div></div>
           <a href="javascript:;" style="font-size:12px" @click="reply">回复</a>
      </el-row>
      </el-card>
</template>

<script>
export default {
    props:{
        data:{
            type: Object,
            default:{
                // pics:[]
            }
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
    padding: 20px 20px 5px;
    font-size: 16px;
}
.comments-content{
    padding-left: 30px; 
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