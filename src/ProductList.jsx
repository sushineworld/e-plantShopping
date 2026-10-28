
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity and helps improve indoor air quality.', cost: '$20' },
      { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'An attractive plant that is easy to care for.', cost: '$17' },
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'A low-maintenance succulent with soothing gel.', cost: '$14' }
    ]
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop', description: 'Known for its calming fragrance.', cost: '$20' },
      { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop', description: 'Produces sweet-smelling flowers.', cost: '$18' },
      { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'A fragrant herb often used in cooking.', cost: '$15' },
      { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'A refreshing aromatic herb used in teas and cooking.', cost: '$12' },
      { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'A lemon-scented herb with fresh green leaves.', cost: '$14' },
      { name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'A flowering plant known for its fragrance.', cost: '$22' }
    ]
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      { name: 'Oregano', image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg', description: 'A fragrant herb used in cooking.', cost: '$10' },
      { name: 'Marigold', image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg', description: 'A colorful flowering plant for the garden.', cost: '$8' },
      { name: 'Geraniums', image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg', description: 'A flowering plant with attractive blooms.', cost: '$20' },
      { name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg', description: 'A fragrant culinary herb.', cost: '$9' },
      { name: 'Catnip', image: 'https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg', description: 'An aromatic herb popular with cats.', cost: '$13' }
    ]
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'A flowering plant used in traditional herbal products.', cost: '$16' },
      { name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', description: 'An aromatic herb commonly used in teas.', cost: '$13' },
      { name: 'Chamomile', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'A flowering herb often used to make tea.', cost: '$15' },
      { name: 'Calendula', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'A colorful flowering plant.', cost: '$12' }
    ]
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop', description: 'Thrives in low light and needs little watering.', cost: '$25' },
      { name: 'Pothos', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'A hardy plant that grows in varied conditions.', cost: '$10' },
      { name: 'Cast Iron Plant', image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg', description: 'Tolerates low light and requires little care.', cost: '$20' },
      { name: 'Succulents', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', description: 'Drought-tolerant plants with varied shapes.', cost: '$18' },
      { name: 'Aglaonema', image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg', description: 'An easy-care plant with decorative foliage.', cost: '$22' }
    ]
  }
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const handleHomeClick = (event) => {
    event.preventDefault();
    setShowCart(false);
    if (onHomeClick) onHomeClick();
  };

  const handleCartClick = (event) => {
    event.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (event) => {
    event.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (event) => {
    if (event) event.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (plant, category) => {
    dispatch(addItem({ ...plant, category }));
  };

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="tag">
          <a href="/" onClick={handleHomeClick} className="nursery-brand">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="Paradise Nursery logo"
            />
            <div>
              <h3>Paradise Nursery</h3>
              <i>Where Green Meets Serenity</i>
            </div>
          </a>
        </div>

        <div className="nav-links">
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a
            href="#cart"
            onClick={handleCartClick}
            className="cart-link"
            aria-label={`Shopping cart with ${totalCartItems} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="42"
              height="42"
              aria-hidden="true"
            >
              <circle cx="80" cy="216" r="12" fill="currentColor" />
              <circle cx="184" cy="216" r="12" fill="currentColor" />
              <path
                d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 179.9 176H84.1a15.9 15.9 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
              />
            </svg>
            <span className="cart-count">{totalCartItems}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <main className="product-grid" id="plants">
          {plantsArray.map((category) => (
            <section className="plant-category" key={category.category}>
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant) => {
                  const isAdded = cartItems.some(
                    (item) =>
                      item.name === plant.name &&
                      item.category === category.category
                  );

                  return (
                    <article
                      className="plant-card"
                      key={`${category.category}-${plant.name}`}
                    >
                      <img
                        className="plant-image"
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                      />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="plant-price">{plant.cost}</p>
                      <button
                        type="button"
                        className="add-to-cart-button"
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant, category.category)}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
