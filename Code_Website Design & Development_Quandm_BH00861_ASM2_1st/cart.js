const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartElement = document.getElementById('cart');
const totalElement = document.getElementById('total');

function updateCart() {
  cartElement.innerHTML = ''; // Xóa danh sách cũ

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.marginBottom = '10px';

    // Kiểm tra xem có thuộc tính image hay không
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.marginRight = '10px';
      li.appendChild(img);
    }

    // Tạo thông tin sản phẩm
    const info = document.createElement('div');
    info.textContent = `${item.name} - ${item.price.toLocaleString()} VND`;
    li.appendChild(info);

    // Thêm nút xóa
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Xóa';
    deleteButton.style.marginLeft = 'auto';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.cursor = 'pointer';

    // Xử lý sự kiện khi nhấn nút xóa
    deleteButton.addEventListener('click', () => {
      cart.splice(index, 1); // Xóa sản phẩm khỏi mảng
      localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật lại localStorage
      updateCart(); // Cập nhật giao diện giỏ hàng
    });

    li.appendChild(deleteButton);
    cartElement.appendChild(li);

    total += item.price; // Cộng giá vào tổng
  });

  totalElement.textContent = `Tổng cộng: ${total.toLocaleString()} VND`;
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price, image }); // Thêm sản phẩm với hình ảnh vào mảng
  localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage
  alert('The product has been added to the cart!');
  updateCart(); // Cập nhật hiển thị giỏ hàng
}

// Xử lý sự kiện nút thanh toán
document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your shopping cart is empty!');
    return;
  }

  alert('Successful payment! Thank you for shopping.');
  localStorage.removeItem('cart'); // Xóa giỏ hàng sau khi thanh toán
  cart.length = 0; // Xóa tất cả sản phẩm trong mảng
  updateCart(); // Cập nhật lại giỏ hàng
});

updateCart(); // Gọi hàm để hiển thị giỏ hàng ban đầu
