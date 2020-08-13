document.getElementById("changeTexture").addEventListener("click",(elm,event)=>{
    console.log("clicked changeTexture");
    unityInstance.SendMessage("ApiManager","setParameter","texture:change");
})
document.getElementById("toggleHat").addEventListener("click",(elm,event)=>{
    console.log("clicked toggleHat");
    unityInstance.SendMessage("ApiManager","setParameter","hat:change");
})