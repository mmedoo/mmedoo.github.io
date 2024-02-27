function wait(ms){
    return new Promise(res=>{
        setTimeout(()=>{
            res();
        },ms);
    });
}


const mes = document.querySelector(".someInfo");
window.addEventListener("load",display);
async function display(){
    await wait(400);
    mes.classList.add("loaded");
}