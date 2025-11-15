if(!localStorage.getItem('user')) location='login.html';
let cart=JSON.parse(localStorage.getItem('cart')||"[]");
function addToCart(i){cart.push(i);localStorage.setItem('cart',JSON.stringify(cart));}
function removeItem(i){cart.splice(i,1);localStorage.setItem('cart',JSON.stringify(cart));loadCart();}
function loadCart(){
 let b=document.getElementById('box'); if(!b)return;
 b.innerHTML=""; let t=0;
 fetch('prices.json').then(r=>r.json()).then(p=>{
  cart.forEach((c,i)=>{let price=p.commands[c]||p.money[c]||p.passes[c]||p.ranks[c]||0;
   t+=price;
   b.innerHTML+=`<div class='card'><h3>${c}</h3><p>$${price}</p>
   <button onclick='removeItem(${i})'>Remove</button></div>`;
  });
  b.innerHTML+=`<h2>Total: $${t}</h2><button onclick='checkout()'>Checkout</button>`;
 });
}
function checkout(){cart=[];localStorage.setItem('cart',JSON.stringify(cart));alert('Purchased!');loadCart();}
