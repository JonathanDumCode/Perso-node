/*====================================================
IMPORT
====================================================*/
const pornpic = require('porn-picture')

const Save = require('./Save.js');
/*====================================================
Constante
====================================================*/

/*====================================================
fonction
====================================================*/

/*====================================================
Code
====================================================*/
let nsfw = {
    random: async () => { return await pornpic.nsfw.random() },
    thighs: async () => { return await pornpic.nsfw.thighs() },
    ass: async () => { return await pornpic.nsfw.ass() },
    panties : async () => { return await pornpic.nsfw.panties() },
    cosplay : async () => { return await pornpic.nsfw.cosplay() },
    pussy : async () => { return await pornpic.nsfw.pussy() },
    teen : async () => { return await pornpic.nsfw.teen() },
    catGirl : async () => { return await pornpic.nsfw.catGirl() },
}

let hentai = {
    random : async () => { return await pornpic.hentai.random() },
    rule34 : async () => { return await pornpic.hentai.rule34() },
}
let URL = {
    nsfw: nsfw,
    hentai: hentai
}

function pornSave(promesse,path,name="",k=-1){
    promesse.then((url)=>{
        if (name == "") {
            name = url.split("/");
            name = name[name.length -1];
        } else {
            ext = url.split("/");
            ext = ext[ext.length -1].split(".");
            ext = ext[ext.length -1];
            name = name+"."+ext;
            
        }
        Save.downloadS(url,path+name);
        if (k != -1) {
            console.log("Download "+path+name+" "+k);
        }
    })
}
async function pornSaveSync(promesse,path,name="",k=-1){
    let url = await promesse;
    if (name == "") {
        name = url.split("/");
        name = name[name.length -1];
    } else {
        ext = url.split("/");
        ext = ext[ext.length -1].split(".");
        ext = ext[ext.length -1];
        name = name+"."+ext;
        
    }
    Save.downloadS(url,path+name);
    if (k != -1) {
        console.log("Download "+path+name+" "+k);
    }
    
}

async function main() {

	for (let i = 0; i < 100; i++) {
		let url = Pornpic.URL.nsfw.random();
		await Pornpic.SaveSync(url,"./USB/NSFW/","",i);

		// let url = Pornpic.URL.hentai.random();
		// await Pornpic.SaveSync(url,"./USB/HENTAI/","",i);

		
	}
}

/*====================================================
Test
====================================================*/


async function test(pornpic){
    console.log(await pornpic.URL.nsfw.random())
    console.log(await pornpic.URL.hentai.random())
    pornpic.Save(pornpic.URL.nsfw.random(),"res/");
    pornpic.Save(pornpic.URL.nsfw.random(),"res/","force");

}





module.exports = {
    URL : URL,
    Save : pornSave,
    SaveSync : pornSaveSync,
    main:main,
    test:test
}