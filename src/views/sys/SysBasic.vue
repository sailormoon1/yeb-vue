<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="DepMana"><DepMana></DepMana></el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana"><PosMana></PosMana></el-tab-pane>
      <el-tab-pane label="职称管理" name="JoblevelMana"><JoblebelMana></JoblebelMana></el-tab-pane>
      <el-tab-pane label="奖惩管理" name="EcMana"><EcMana></EcMana></el-tab-pane>
      <el-tab-pane label="权限组" name="PermissMana"><PermissMana></PermissMana></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepMana from "../../components/sys/DepMana";
import EcMana from "../../components/sys/EcMana";
import JoblebelMana from "../../components/sys/JoblevelMana";
import PermissMana from "../../components/sys/PermissMana";
import PosMana from "../../components/sys/PosMana";


export default {
  name: "SysBasic",
  data() {
    return {
      activeName: "PermissMana"
    }
  },
  components:{
    DepMana,
    EcMana,
    JoblebelMana,
    PermissMana,
    PosMana
  }

}
</script>

<style scoped>

</style>