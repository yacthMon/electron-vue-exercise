<template>
  <div :style="divStyle">
    <h1>Main Page</h1>
    <h2>Current Color : {{currentChildProperties.label}}</h2>
    <button type="button" @click="callChild()"> Call Child! </button>
  </div>
</template>

<script lang="ts">
import { Options,Vue } from 'vue-class-component';
import { remote, ipcRenderer } from 'electron';
import { ChildProperty } from '../models/ChildProperty';

@Options({
  props: {
    currentChildProperties: ChildProperty,
  }
})

export default class MainWindow extends Vue {

  divStyle = {
    height: '100%',
    background: 'white'
  }

  currentChildProperties:ChildProperty = {
    label:"None",
    color:"white"
  }

  childProperties:ChildProperty[] = [{
    label:"Red", 
    color:"red"
  },{
    label:"Orange", 
    color:"orange"
  },{
    label:"Yellow", 
    color:"yellow"
  },{
    label:"Green", 
    color:"green"
  },{
    label:"Blue", 
    color:"blue"
  },{
    label:"Indigo", 
    color:"indigo"
  },{
    label:"Violet", 
    color:"violet"
  },];

  count:number = 0;

  created(){
    ipcRenderer.on("update-child-property", (event:any, arg:any)=>{
      console.log("Data receive");
      console.log(arg);
      this.setChildProperty(arg);
    })
  }

  callChild() : void{
    const { BrowserWindow } = remote;
    let win:any = new BrowserWindow({ width: 500, height: 500 , webPreferences: {webSecurity: false, nodeIntegration: true } });
    let path:string = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/#/child'
    : `file://${__dirname}/index.html#child`
    win.setMenu(null);
    win.loadURL(path);
    win.webContents.on('did-finish-load', ()=>{
      console.log("Send");
      win.webContents.send('child-property',{ childProperty : this.childProperties[this.count], count:this.count+1});
      this.count = ++this.count % this.childProperties.length; 
    });
  }

  setChildProperty(childProperty:ChildProperty) : void{
    this.currentChildProperties = childProperty;
    this.divStyle.background = this.currentChildProperties.color;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1{
  margin-block-start: 0;
}
</style>
