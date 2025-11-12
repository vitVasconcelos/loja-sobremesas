document.addEventListener('DOMContentLoaded', () => { 
   

    const cartTitle = document.querySelector('.cart h2');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartFooter = document.querySelector('.cart-footer');
    const cartTotal = document.querySelector('.cart-total');
    const emptyCartImg = document.querySelector('.empty-cart-img');
    const emptyCartMsg = document.querySelector('.cart p');
 

    let cart = [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0; 

        if (cart.length === 0) {
            emptyCartImg.style.display = 'block';
            emptyCartMsg.style.display = 'block';
        } else {
            emptyCartImg.style.display = 'none';
            emptyCartMsg.style.display = 'none';
           
        }

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="info">
                    <strong>${item.name}</strong><br>
                    ${item.quantity}x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}
                </div>
                <button class="remove-btn" data-index="${index}">✖</button>
            `;
            cartItemsContainer.appendChild(li);
            
        });

        cartTitle.textContent = `Your Cart (${cart.length})`;
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartFooter.style.display = cart.length ? 'block' : 'none';

        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
           
        });
    }

    document.querySelectorAll('.add-button').forEach(button => { 
        let step = 0; 

        const originalText = button.querySelector('.original-text');
        const controleHover = button.querySelector('.controle-hover');
        const numberSpan = button.querySelector('.number');
        const plusBtn = button.querySelector('.plus');
        const minusBtn = button.querySelector('.minus');
        const productContainer = button.closest('li');
        const productName = productContainer.querySelector('h3').textContent;
        const productPrice = parseFloat(productContainer.querySelector('.price').textContent.replace('$', ''));


        plusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let count = parseInt(numberSpan.textContent);
            numberSpan.textContent = count + 1;
        });

        minusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let count = parseInt(numberSpan.textContent);
            if (count > 1) {
                numberSpan.textContent = count - 1;
            }
        }); 

        button.addEventListener('click', () => {
            if (step === 0) {
                originalText.style.display = 'none';
                controleHover.style.display = 'flex';
                button.classList.add('ativo');
                step = 1;
             
            } else {
                const quantity = parseInt(numberSpan.textContent);
           
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: quantity
                });

                updateCart();
                step = 0;
                originalText.style.display = 'flex';
                controleHover.style.display = 'none';
                button.classList.remove('ativo');
                numberSpan.textContent = 1;
            }
        });
    });

    document.querySelector('.confirm-btn').addEventListener('click', () => {
        alert('Pedido confirmado! 🎉');
        cart = [];
        updateCart();
    });
 
});
