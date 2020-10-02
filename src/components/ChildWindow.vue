<template>
  <div :style="divStyle">
    <h1>Child Page No.{{count}}</h1>
    <h2>My Color : {{childProperty.label}}</h2>
    <button type="button" @click="setMainChildProperty()"> Change it! </button>
  </div>
</template>

<script lang="ts">
import { Options,Vue } from 'vue-class-component';
import { ChildProperty } from '../models/ChildProperty';
import { ipcRenderer } from 'electron';

@Options({
  props: {
    childProperty: ChildProperty
  }
})

export default class ChildWindow extends Vue {
  childProperty = { 
    label : "none",
    color :"white"
  };

  count:number = 0;

  divStyle = {
    height: '100%',
    color: 'white',
    background: 'white'
  }

  created():void{
    ipcRenderer.on("child-property", (event:any, args:any)=>{
      console.log(args.childProperty);
      this.setChildProperty(args.childProperty);
      this.count = args.count;
    })
  }
  
  private setChildProperty(childProperty:ChildProperty ):void{
    this.childProperty = childProperty;
    this.divStyle.background = this.childProperty.color;
    console.log("Child property update");
  }

  setMainChildProperty() : void{
    console.log("Send request");
    ipcRenderer.send("request-update-child-property", {...this.childProperty});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1{
  margin-block-start: 0;
}
</style>
