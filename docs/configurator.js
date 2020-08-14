document.getElementById("changeTexture").addEventListener("click",(elm,event)=>{
    console.log("clicked changeTexture");
    unityInstance.SendMessage("ApiManager","setParameter","texture:change");
})
document.getElementById("toggleHat").addEventListener("click",(elm,event)=>{
    console.log("clicked toggleHat");
    unityInstance.SendMessage("ApiManager","setParameter","hat:change");
})
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imgback').src=e.target.result;
            document.getElementById('viewerContainer').style.backgroundImage="url('" + document.getElementById('imgback').src + "')";
        };
        reader.readAsDataURL(input.files[0]);
    }
}