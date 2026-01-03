document.addEventListener('DOMContentLoaded', function() {
    // Параллакс эффект
    initParallax();
    
    // Таймер обратного отсчета
    initCountdown();
    
    // Обработка формы
    initForm();
    
    // Управление музыкой
    initMusic();
    
    // Анимация при скролле
    initScrollAnimations();
    
    // Инициализация календаря
    initMiniCalendar();
});

// Параллакс эффект для фона
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector('.parallax-bg');
        
        if (parallaxBg) {
            const rate = scrolled * 0.3;
            parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Анимация самолетиков
        const planes = document.querySelectorAll('.fas.fa-plane');
        planes.forEach((plane, index) => {
            const speed = 0.5 + (index * 0.1);
            const yOffset = scrolled * speed * 0.1;
            plane.style.transform = `translateY(${yOffset}px) rotate(${yOffset}deg)`;
        });
    });
}

// Таймер до свадьбы
function initCountdown() {
    const weddingDate = new Date('2025-09-27T15:30:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft < 0) {
            // Свадьба уже прошла
            document.getElementById('days').textContent = '000';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Анимация цифр
        animateNumber('days', days, 3);
        animateNumber('hours', hours, 2);
        animateNumber('minutes', minutes, 2);
        animateNumber('seconds', seconds, 2);
    }
    
    function animateNumber(elementId, value, digits) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;
        
        if (currentValue !== value) {
            element.style.transform = 'scale(1.2)';
            element.style.color = '#FFFFFF';
            
            setTimeout(() => {
                element.textContent = value.toString().padStart(digits, '0');
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 150);
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Обработка формы
function initForm() {
    const form = document.getElementById('rsvp-form');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const partnerField = document.getElementById('partner-field');
    
    // Показать/скрыть поле для имени спутника
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'with_partner') {
                partnerField.style.display = 'block';
            } else {
                partnerField.style.display = 'none';
            }
        });
    });
    
    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Здесь будет отправка данных в Telegram или на сервер
        // Временное решение - показываем сообщение
        showNotification('Спасибо! Ваш ответ сохранен. Ждем вас на свадьбе! ❤️');
        
        // Сброс формы
        form.reset();
        partnerField.style.display = 'none';
    });
}

// Управление музыкой
function initMusic() {
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = musicBtn.querySelector('i');
    const backgroundMusic = document.getElementById('background-music');
    
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.className = 'fas fa-volume-mute';
            musicBtn.style.transform = 'scale(1)';
        } else {
            // Пытаемся воспроизвести
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicIcon.className = 'fas fa-volume-up';
                    isPlaying = true;
                    musicBtn.style.transform = 'scale(1.1)';
                }).catch(error => {
                    console.log('Автовоспроизведение заблокировано:', error);
                    // Показываем сообщение, что нужно кликнуть еще раз
                    musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                    musicBtn.style.animation = 'pulse 1s infinite';
                    
                    // Сбрасываем состояние через 3 секунды
                    setTimeout(() => {
                        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                        musicBtn.style.animation = '';
                    }, 3000);
                });
            }
        }
        isPlaying = !isPlaying;
    });
    
    // Автопауза при скролле (опционально)
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (isPlaying) {
            clearTimeout(scrollTimer);
            backgroundMusic.volume = 0.3;
            
            scrollTimer = setTimeout(() => {
                if (isPlaying) {
                    backgroundMusic.volume = 1;
                }
            }, 500);
        }
    });
}

// Анимация при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за анимируемыми элементами
    const animatedElements = document.querySelectorAll(
        '.story-item, .program-item, .detail-card, .color-item, .contact-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            animation: slideUp 0.8s ease-out forwards;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Мини-календарь
function initMiniCalendar() {
    const weddingDate = new Date(2025, 8, 27); // Сентябрь 27, 2025
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    // Можно добавить календарь позже, если нужно
    console.log('Дата свадьбы:', weddingDate.toLocaleDateString());
}

// Всплывающее уведомление
function showNotification(message) {
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
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-lilac));
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-out 3s forwards;
            max-width: 400px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .notification i {
            font-size: 1.5rem;
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
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3.5 секунды
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3500);
}

// Добавление видео позже
function addVideoLater(videoUrl) {
    // Эта функция будет добавлена позже, когда у вас будет видео
    const videoSection = `
        <section class="video-section wave-section">
            <div class="wave-top"></div>
            <div class="container">
                <div class="section-header">
                    <h2>Наше видео</h2>
                    <div class="plane-divider">
                        <i class="fas fa-plane"></i>
                        <div class="line"></div>
                        <i class="fas fa-video"></i>
                        <div class="line"></div>
                        <i class="fas fa-plane"></i>
                    </div>
                </div>
                <div class="video-container">
                    <video controls playsinline preload="metadata">
                        <source src="${videoUrl}" type="video/mp4">
                        Ваш браузер не поддерживает видео.
                    </video>
                </div>
            </div>
        </section>
    `;
    
    // Вставить перед секцией таймера
    const countdownSection = document.querySelector('.countdown-section');
    countdownSection.insertAdjacentHTML('beforebegin', videoSection);
}
