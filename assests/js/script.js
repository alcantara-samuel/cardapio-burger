cart = []
modalKey = 0

let c = (el) => {
    return document.querySelector(el)
}
let cs = (el) =>{
    return document.querySelectorAll(el)
}
menu.map((item,index) => {
    let burguer = c('.cardapio-item').cloneNode(true)


    burguer.setAttribute('data-key',index)
    burguer.querySelector('.cardapio-item--img').style.backgroundImage = item.img;
    burguer.querySelector('.item-nome').innerHTML = item.nome;
    burguer.querySelector('.item-desc').innerHTML =item.desc;
    burguer.querySelector('.item-price span').innerHTML = item.price.toFixed(2);
    c('.cardapio').append(burguer)
    


    burguer.addEventListener('click', (evento) => {

        let key = evento.target.closest('.cardapio-item').getAttribute('data-key')
        modalQt = 1
        modalKey = key

        c('.modal-box--img').style.backgroundImage = menu[key].img
        c('.modal-box--textSabor').innerHTML = menu[key].nome
        c('.modal-box--textDesc').innerHTML = menu[key].desc
        c('.modal-box--textPreco span').innerHTML = menu[key].price.toFixed(2)
        c('.modal-options--buttonQt').innerHTML = modalQt



        c('.modal').style.opacity = 0;
        c('.modal').style.display = 'flex';
        setTimeout(() => {
            c('.modal').style.opacity = 1;
        },200)
    })
    
})


function closeModal(){
        c('.modal').style.opacity = 0;
        setTimeout(() => {
            c('.modal').style.display = 'none';
        },200)
}


cs('.modal-cancelButton, .modal-finallyButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

c('.modal-options--buttonMais').addEventListener('click', () => {
    modalQt += 1
    c('.modal-options--buttonQt').innerHTML = modalQt
})
c('.modal-options--buttonMenos').addEventListener('click', () => {
    if(modalQt > 1){
        modalQt -= 1
    }
    c('.modal-options--buttonQt').innerHTML = modalQt
})


c('.modal-finallyButton').addEventListener('click', () => {
    c('aside').style.width = '50vw'

    let key = cart.findIndex((item) => {
        return menu[modalKey].id == item.id
    })
    if(key > -1){
        cart[key].qt += modalQt
    }else{
        cart.push({
            id: menu[modalKey].id,
            img: menu[modalKey].img,
            nome: menu[modalKey].nome,
            price: menu[modalKey].price,
            qt: modalQt

        })
    }
    updateCart()
})




function updateCart(){
    let subTotal = 0
    let desconto = 0
    let total = 0;
    c('.cart-pedidos').innerHTML = ''; //Zerar para não repetir
    if(cart.length > 0){
       
        cart.map((item,index) => {
            
            let burguerCart = c('.cart-options').cloneNode(true)
        
            burguerCart.querySelector('.cart-options--name').innerHTML = item.nome;
            burguerCart.querySelector('.cart-options--buttonQt').innerHTML =item.qt;
            burguerCart.querySelector('.cart-options--img').style.backgroundImage = item.img;
            
            c('.cart-pedidos').append(burguerCart)
   
            

            burguerCart.querySelector('.cart-options--buttonMenos').addEventListener('click',() => {
                if(cart[index].qt -1 != 0){
                    cart[index].qt -= 1
                    
                }else{
                    cart.splice(index,1)
                }
                updateCart()
            })
            burguerCart.querySelector('.cart-options--buttonMais').addEventListener('click',() => {
                cart[index].qt += 1
                updateCart()
            })

            subTotal += item.price* item.qt
            
        })

        desconto += subTotal*0.1
        total = subTotal - desconto
        
        c('.cart-options--subtotal span').innerHTML = `R$ ${subTotal.toFixed(2)}`
        c('.cart-options--desconto span').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.cart-options--total span').innerHTML = `R$ ${total.toFixed(2)}`
    }else{
        c('aside').style.width = '0'
    }
}


