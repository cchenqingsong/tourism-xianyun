<template>
      <el-card class="comments">
          <!-- 评论个人信息区域 -->
      <el-row class="userinfo" type="flex">
          <!-- 用户小头像 -->
          <el-avatar size='small'  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <!-- 用户名 -->
          <span>爱情绞肉机</span>
          <!-- 评论时间 -->
          <span>2019-12-14 4:53</span>
      </el-row>

      <!-- 评论文本区域 -->
      <el-row class="comments-content" >
          文本
      </el-row>

      <!-- 回复按钮 -->
      <el-row type="flex" style="justify-content: space-between">
          <div></div>
           <a href="javascript:;" style="font-size:12px">回复</a>
      </el-row>
      </el-card>
</template>

<script>
export default {
    data(){
        return{
            isshow: false
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