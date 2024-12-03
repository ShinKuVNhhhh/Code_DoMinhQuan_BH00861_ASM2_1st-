const cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-name');
    const productPrice = parseInt(button.getAttribute('data-price'));
    const productImage = button.getAttribute('data-image');

    // Thêm sản phẩm vào giỏ hàng
    cart.push({ name: productName, price: productPrice, image: productImage });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} Already added to the cart!`);
  });
});
