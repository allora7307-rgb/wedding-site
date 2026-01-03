// ===== ЗАГРУЗКА САЙТА =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Свадебный сайт загружается...');
    
    // Скрыть лоадер через 1 секунду
    setTimeout(function() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                console.log('Сайт загружен!');
                
                // Инициализация всех функций после загрузки
                initCountdown();
                initRSVPForm();
                initMusicPlayer();
                initScrollAnimations();
            }, 500);
        }
    }, 1000);
    
    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== ТАЙМЕР ОБРАТНОГО ОТСЧЕТА =====
function initCountdown() {
    console.log('Таймер инициализирован');
    
    const weddingDate = new Date('2026-02-08T18:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        // Если свадьба уже прошла
        if (timeLeft < 0) {
            document.getElementById('days').textContent = '000';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Изменить заголовок
            const title = document.querySelector('.countdown-section h2');
            if (title) {
                title.textContent = 'Свадьба состоялась!';
            }
            return;
        }
        
        // Расчет времени
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Обновление с анимацией
        updateNumberWithAnimation('days', days, 3);
        updateNumberWithAnimation('hours', hours, 2);
        updateNumberWithAnimation('minutes', minutes, 2);
        updateNumberWithAnimation('seconds', seconds, 2);
    }
    
    function updateNumberWithAnimation(elementId, value, digits) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const currentValue = parseInt(element.textContent) || 0;
        
        if (currentValue !== value) {
            // Анимация изменения
            element.style.transform = 'scale(1.2)';
            element.style.opacity = '0.7';
            
            setTimeout(() => {
                element.textContent = value.toString().padStart(digits, '0');
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
            }, 150);
        }
    }
    
    // Запуск таймера
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== АНКЕТА ГОСТЯ =====
function initRSVPForm() {
    console.log('Форма анкеты инициализирована');
    
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const partnerField = document.getElementById('partner-field');
    
    // Показать/скрыть поле для имен спутников
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'with_partner' && partnerField) {
                partnerField.style.display = 'block';
                partnerField.style.animation = 'fadeIn 0.5s ease-out';
            } else if (partnerField) {
                partnerField.style.display = 'none';
            }
        });
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сбор данных формы
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            if (key === 'drinks') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });
        
        // Временное решение - сообщение об успехе
        showNotification('🎉 Спасибо! Ваша анкета отправлена. Мы будем ждать вас на нашей свадьбе! ❤️');
        
        // Сброс формы
        form.reset();
        if (partnerField) partnerField.style.display = 'none';
    });
}

// ===== МУЗЫКАЛЬНЫЙ ПЛЕЕР =====
function initMusicPlayer() {
    console.log('Музыкальный плеер инициализирован');
    
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;
    
    if (!musicBtn || !musicIcon) return;
    
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            // Пауза
            musicIcon.className = 'fas fa-volume-mute';
            showNotification('🔇 Музыка выключена');
        } else {
            // Воспроизведение
            musicIcon.className = 'fas fa-volume-up';
            showNotification('🎵 Музыка включена');
        }
        isPlaying = !isPlaying;
        
        // Анимация кнопки
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initScrollAnimations() {
    console.log('Анимации при скролле инициализированы');
    
    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll(
        '.story-item, .program-item, .detail-card, .contact-item, .child-photo, .love-equation'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animated {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animated:nth-child(2) { animation-delay: 0.1s; }
        .animated:nth-child(3) { animation-delay: 0.2s; }
        .animated:nth-child(4) { animation-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 30px;
            right: 30px;
            background: linear-gradient(135deg, #87CEEB, #D8BFD8);
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-out 3s forwards;
            max-width: 400px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .notification i {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                top: 20px;
                right: 20px;
                left: 20px;
                max-width: none;
            }
        }
    `;
    
    // Добавляем на страницу
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Удаляем через 3.5 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, 3500);
}

// ===== ПАРАЛЛАКС ЭФФЕКТ =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg, .hero-section');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
console.log('Свадебный сайт Кристалины и Александра');
console.log('Дата свадьбы: 8 февраля 2026 года');
console.log('Начало: 18:00');
