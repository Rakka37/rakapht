const carousel = document.querySelector('.carousel');
const cards = Array.from(document.querySelectorAll('.card'));
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const cardWidth = cards[0].offsetWidth + 10; // Lebar kartu + jarak antar kartu
const visibleCards = 3; // Jumlah kartu yang terlihat dalam viewport
let currentIndex = visibleCards; // Mulai dari elemen pertama (setelah klon)
let interval;

// Klon elemen pertama dan terakhir untuk ilusi looping
const firstClones = cards.slice(0, visibleCards).map(card => card.cloneNode(true));
const lastClones = cards.slice(-visibleCards).map(card => card.cloneNode(true));

// Tambahkan klon ke carousel
firstClones.forEach(clone => carousel.appendChild(clone));
lastClones.reverse().forEach(clone => carousel.insertBefore(clone, carousel.firstChild));

// Perbarui daftar kartu
const allCards = Array.from(document.querySelectorAll('.card'));
const totalCards = allCards.length;

// Set posisi awal carousel
carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

function updateCarousel() {
    const offset = currentIndex * cardWidth;
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(-${offset}px)`;
}

function nextCard() {
    currentIndex++;
    updateCarousel();

    // Reset posisi tanpa animasi jika melewati elemen terakhir
    if (currentIndex === totalCards - visibleCards) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = visibleCards;
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }, 500); // Waktu yang sama dengan durasi transisi
    }
}

function prevCard() {
    currentIndex--;
    updateCarousel();

    // Reset posisi tanpa animasi jika melewati elemen pertama
    if (currentIndex === 0) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = totalCards - visibleCards * 2;
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }, 500); // Waktu yang sama dengan durasi transisi
    }
}

function startAutoSlide() {
    interval = setInterval(nextCard, 5000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

leftArrow.addEventListener('click', () => {
    prevCard();
    stopAutoSlide();
    startAutoSlide();
});

rightArrow.addEventListener('click', () => {
    nextCard();
    stopAutoSlide();
    startAutoSlide();
});

// Start auto-slide on page load
startAutoSlide();
