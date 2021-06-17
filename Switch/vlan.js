const { appendFile } = require('fs/promises');
const { writeFile } = require('fs/promises');

module.exports =  async (vlan, nome, porta) => {
    let directory = '/home/chikenitos/Projetos/GIOS/vlan.txt'
    let comeco = "enable\nconfigure terminal"
    let qntdvlan = vlan.split(',').length
    let qtntdnome = nome.split(',').length
    let qntdporta = porta.split(',').length
        
    if(qntdvlan != qtntdnome){
        console.log("Esse filho não é meu")
    }else{
    
        for(let i = 0; i < qntdvlan; i++){

            let escreva = ''

            if(qntdvlan - 1 == i ){
                //escrever a ultima linha com um "exit" no final
                escreva = `\nvlan ${vlan.split(',')[i]}\nname ${nome.split(',')[i]}\nexit`
            }
            if(i == 0){
                //reecrever o arquivo com a primeira linha normal
                await writeFile(directory, comeco, (err) => {
                    if(err){throw err};
                    console.log('Foi');
                });
                escreva = `\nvlan ${vlan.split(',')[i]}\nname ${nome.split(',')[i]}`
            }
            else{
                //escrever linhas normais
                escreva = `\nvlan ${vlan.split(',')[i]}\nname ${nome.split(',')[i]}`
            }
            //escrever linhas no arquivo
            await appendFile(directory, escreva, err => {
                if(err){throw new Error('alguma coisa deu errado')}
                
                console.log('deu cert')
            })
        }

        for(let i = 0; i < qntdporta; i++){
            let escreva = ''
            let txt = ''
            let teste =  porta.toUpperCase().split(',')[i].split('/')[0].substr(1) + '/' + porta.toUpperCase().split(',')[i].split('/')[1]
            let vlann = ''
            
            if(qntdporta - 1 != i){
                vlann = vlan.split(',')[i]
            }else{
                vlann = `${vlan.split(',')[i]}\nexit\ndo wr`
            }

            if(porta.toUpperCase().split(',')[i].startsWith('G')){
                txt = 'gigabit'
            }
            else if(porta.toUpperCase().split(',')[i].startsWith('F')){
                txt = 'fast'
            }

            if(porta.toUpperCase().split(',')[i].split('/')[1].endsWith('F')){
                escreva = `\ninterface ${txt}ethernet ${teste.split('F')[0]}\nswitchport mode trunk\nexit\ndo wr`
            }else{
                escreva = `\ninterface ${txt}ethernet ${teste}\nswitchport mode access\nswitchport access vlan ${vlann}\nexit`
            }

                await appendFile(directory, escreva, err => {
                    if(err){throw new Error('alguma coisa deu errado')}
                    
                    console.log('deu cert')
                })
        }
    }
}

//vlan("10,20,120","opa,deus","g0/1,f0/3,G0/2,f0/10f")
//var s = "g0/1,f0/3,G0/2"
//console.log(s.split(',').length)
/*let directory = '/home/chikenitos/Projetos/GIOS/vlan.txt'
stat(directory, (err, stats) =>{
    if(err){
        console.log(err)
    }
})
s.toUpperCase().split(',')[0].split('/')[0].substr(1) +'/'+
*/