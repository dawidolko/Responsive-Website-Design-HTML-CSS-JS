const productBgc = document.querySelector(".product__bgc");
const menuItems = document.querySelector(".product");

function showMenuItems(item) {
	productBgc.style.display = "block";
	menuItems.innerHTML = `
  <div class="product__body ">
  <div class="product__box">
    <i class="product__icon fa-solid fa-magnifying-glass"></i>
        <img
          src="${item.img}"
          alt="${item.alt}"
          class="product__img"
        />
  </div>
  
    <div class="product__content container">
      <div>
        <h2 class="product__title">${item.title}</h2>
        <h3 class="product__price">$${item.price}</h3>
      </div>
      <hr class="product__hr">
      <div class="product__description">
    <p class="product__text">Brand: <span class="product__text-span">${item.brand}</span></p>
    <p class="product__text">Product Code: <span class="product__text-span">${item.code}</span></p>
    <p class="product__text">Reward Points: <span class="product__text-span">${item.points}</span></p>
    <p class="product__text">Availability: <span class="product__text-span">${item.instock}</span></p>
      </div>
      <hr class="product__hr">
      <div class="product__button" onclick='addToCart(${item.id})'>Add To Cart</div>
			<i class="product__close fa-solid fa-x"></i>
    </div>
    </div>
  `;

	const closeBtn = document.querySelector(".product__close");

	const closeModal = (e) => {
		if (
			e.target === closeBtn ||
			e.key === "Escape" ||
			e.target === productBgc
		) {
			productBgc.style.display = "none";
		}
	};
	closeBtn.addEventListener("click", closeModal);
	productBgc.addEventListener("click", closeModal);
	window.addEventListener("keyup", closeModal);
}

const productView = document.querySelectorAll(".shoes__btn-view");

productView.forEach((image, index) => {
	image.addEventListener("click", () => {
		if (index < modalProduct.length) {
			showMenuItems(modalProduct[index]);
			const imgProduct = document.querySelector(".product__img");
			const imgContainer = document.querySelector(".product__box");

			const zoomImg = (e) => {
				const x = e.clientX - imgContainer.getBoundingClientRect().left;
				const y = e.clientY - imgContainer.getBoundingClientRect().top;

				const imgX = imgProduct.offsetLeft;
				const imgY = imgProduct.offsetTop;

				const newX = (imgX - x) * -1;
				const newY = (imgY - y) * -1;

				imgProduct.style.transformOrigin = `${newX}px ${newY}px`;
				imgProduct.classList.add("product__zoom");
			};

			const resetImg = () => {
				imgProduct.classList.remove("product__zoom");
			};

			imgProduct.addEventListener("mousemove", zoomImg);
			imgProduct.addEventListener("mouseout", resetImg);
		}
	});
});
