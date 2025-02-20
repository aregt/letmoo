// Modal functionality
const modal = {
  init() {
    this.modal = document.createElement('div');
    this.modal.className = 'fixed inset-0 bg-black/50 hidden z-50';
    this.modal.innerHTML = `
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl max-w-6xl w-full modal-content relative">
          <button class="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors">
            <i class="ri-close-line text-3xl"></i>
          </button>
          <div class="grid md:grid-cols-2 gap-8 p-8">
            <div class="modal-gallery">
              <div class="swiper-container aspect-square mb-4 max-h-[80vh]">
                <div class="swiper-wrapper"></div>
                <div class="swiper-pagination"></div>
              </div>
              <p class="text-sm text-gray-500 text-center">Görselleri kaydırarak inceleyebilirsiniz</p>
            </div>
            <div class="modal-info">
              <h2 class="text-3xl font-cormorant mb-4"></h2>
              <p class="text-gray-600 mb-6"></p>
              <div class="flex flex-wrap gap-4">
                <a data-store="etsy" class="store-link bg-primary text-white px-6 py-2 rounded-button hover:bg-opacity-90 flex items-center gap-2">
                  <i class="ri-store-2-fill"></i>
                  ETSY'de Gör
                </a>
                <a data-store="amazon" class="store-link bg-orange-500 text-white px-6 py-2 rounded-button hover:bg-opacity-90 flex items-center gap-2">
                  <i class="ri-amazon-fill"></i>
                  Amazon'da İncele
                </a>
                <a data-store="ebay" class="store-link bg-blue-600 text-white px-6 py-2 rounded-button hover:bg-opacity-90 flex items-center gap-2">
                  <i class="ri-shopping-bag-fill"></i>
                  eBay'de Keşfet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.modal);
    this.bindEvents();
  },

  bindEvents() {
    this.modal.querySelector('button').addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  },

  open({ title, description, images, stores }) {
    this.modal.querySelector('.modal-info h2').textContent = title;
    this.modal.querySelector('.modal-info p').textContent = description.long;
    this.modal.querySelectorAll('.store-link').forEach(link => {
      link.href = stores[link.dataset.store];
    });
    this.initGallery(images);
    this.modal.classList.remove('hidden');
  },

  close() {
    this.modal.classList.add('hidden');
  },

  initGallery(images) {
    const wrapper = this.modal.querySelector('.swiper-wrapper');
    wrapper.innerHTML = images.map(img => 
      `<div class="swiper-slide">
        <img src="${img}" class="w-full h-full object-cover" />
      </div>`
    ).join('');

    new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
};

// Initialize modal on DOM load
document.addEventListener('DOMContentLoaded', () => modal.init());

// Collection item click handler
document.querySelectorAll('#collections .bg-white').forEach(card => {
  card.addEventListener('click', function(event) {
    if(event.target.tagName === 'IMG') {
      const collection = {
        title: this.querySelector('h3').textContent,
        description: {
          short: this.querySelector('p').textContent,
          long: `Bu koleksiyon ${this.querySelector('h3').textContent}...` // Detailed description
        },
        images: [
          this.querySelector('img').src,
          'https://public.readdy.ai/ai/img_res/273ea874f613a156732309ea763ddf86.jpg',
          'https://public.readdy.ai/ai/img_res/913a622a86b6f25f4e856776b02946b2.jpg'
        ],
        stores: {
          etsy: 'https://www.etsy.com/shop/letmootr',
          amazon: 'https://www.amazon.com.tr/letmootr',
          ebay: 'https://www.ebay.com/usr/letmootr'
        }
      };
      modal.open(collection);
    }
  });
});

document.querySelectorAll('#collections button').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.group');
    const collection = {
      title: card.querySelector('h3').textContent,
      description: card.querySelector('p').textContent,
      images: [card.querySelector('img').src, ...],
      stores: { ... }
    };
    modal.open(collection);
  });
});

// Collection button click handler
const handleCollectionClick = (collectionData) => {
  modal.open({
    title: collectionData.title,
    description: collectionData.description,
    images: collectionData.images,
    stores: collectionData.stores
  });
};

// Initialize collection buttons
document.querySelectorAll('.collection-button').forEach(button => {
  button.addEventListener('click', () => {
    const collectionData = {
      title: button.dataset.title,
      description: button.dataset.description,
      images: JSON.parse(button.dataset.images),
      stores: JSON.parse(button.dataset.stores)
    };
    handleCollectionClick(collectionData);
  });
});
