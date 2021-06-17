let vlan = document.getElementById('vlan')
let nomee = document.getElementById('nome')
let porta = document.getElementById('porta')
let check = document.getElementById('check')
let divtrunk =  document.getElementById('trunk')
let trunk = document.getElementById('texttrunk')
let resposta = document.getElementById('resp-text')
let cxtxt = document.getElementById('containerd')



document.getElementById('check').addEventListener('change', (e) =>{
    if (check.checked){
        divtrunk.style.display = 'block'
    }else{divtrunk.style.display = 'none'}
})

document.getElementById('formulario').addEventListener('submit', (e) =>{
    e.preventDefault()

    const formData = {
        nome: nomee.value,
        vlan: vlan.value,
        porta: porta.value,
    }

    if(check.checked){
        formData.porta += ',' + trunk.value + 'f'
    }
    
    let options= {
        method: 'post',
        headers: formData
    }

    fetch('/', options).then(response => response.text().then(txt => {
        cxtxt.style.display = 'block' 
        resposta.innerText = `${txt}` 
        nomee.value = ''
        vlan.value = ''
        porta.value = ''
        if(check.checked){
            trunk.value = ''
            check.checked = false
        }
    }))

})
