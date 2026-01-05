// ===== ОСНОВНАЯ ЗАГРУЗКА САЙТА =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Свадебный сайт Кристалины и Александра загружается...');
    console.log('Дата свадьбы: 8 февраля 2026');
    console.log('Начало: 18:00');
    
    // Скрыть лоадер через 1.5 секунды
    setTimeout(function() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                console.log('✅ Сайт полностью загружен!');
                
                // Инициализация всех функций после загрузки
                initPhotoLoading();
                initCountdown();
                initRSVPForm();
                initMusicPlayer();
                initScrollAnimations();
                initParallax();
                initChatButton();
            }, 500);
        }
    }, 1500);
    
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
    
    // Анимация стрелочки скролла
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const welcomeSection = document.querySelector('.welcome-section');
            if (welcomeSection) {
                window.scrollTo({
                    top: welcomeSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// ===== ЗАГРУЗКА ФОТОГРАФИЙ =====
function initPhotoLoading() {
    console.log('🔍 Проверка загрузки фотографий...');
    
    // Массив путей к фотографиям (с абсолютными путями)
    const photoPaths = [
        '/assets/images/proposal-bg.jpg',
        '/assets/images/invitation-bg.jpg',
        '/assets/images/child-kristalina.jpg',
        '/assets/images/child-alexander.jpg'
    ];
    
    let loadedPhotos = 0;
    const totalPhotos = photoPaths.length;
    
    // Функция для проверки загрузки фото
    function checkPhoto(path) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                console.log(`✅ Фото загружено: ${path}`);
                resolve({ path: path, status: 'success' });
            };
            img.onerror = function() {
                console.log(`❌ Ошибка загрузки: ${path}`);
                resolve({ path: path, status: 'error' });
            };
            img.src = path;
        });
    }
    
    // Проверяем все фото
    photoPaths.forEach(async (path) => {
        const result = await checkPhoto(path);
        loadedPhotos++;
        
        // Применяем фото или ставим заглушку
        applyPhoto(result.path, result.status);
        
        // Когда все фото проверены
        if (loadedPhotos === totalPhotos) {
            console.log('✅ Все фотографии проверены');
            // Показываем уведомление если есть ошибки
            const photoPaths = [
    '/assets/images/proposal-bg.jpg',      // верхнее фото
    '/assets/images/invitation-bg.jpg',    // фото фона
    '/assets/images/child-bride.jpg',      // Кристалина (используйте правильное имя)
    '/assets/images/child-groom.jpg'       // Александр (используйте правильное имя)
];
        }

// Применение фотографий на сайт
function applyPhoto(path, status) {
    // Главная фотография (герой)
    if (path.includes('proposal-bg')) {
        if (status === 'success') {
            document.querySelector('.hero-section').style.backgroundImage = 
                `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${path}')`;
        } else {
            document.querySelector('.hero-section').style.backgroundImage = 
                "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')";
        }
    }
    
    // Фон пригласительного блока
    if (path.includes('invitation-bg')) {
        if (status === 'success') {
            document.querySelector('.welcome-section').style.backgroundImage = 
                `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${path}') center/cover fixed`;
        } else {
            document.querySelector('.welcome-section').style.backgroundImage = 
                "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80') center/cover fixed";
        }
    }
    
   // Фото Кристалины
if (path.includes('child-kristalina') || path.includes('child-bride')) {
    const kristalinaPhoto = document.getElementById('photo-kristalina');
    if (kristalinaPhoto) {
        if (status === 'success') {
            kristalinaPhoto.style.backgroundImage = `url('${path}')`;
            kristalinaPhoto.style.backgroundSize = 'cover';
            kristalinaPhoto.style.backgroundPosition = 'center';
            console.log('✅ Фото Кристалины установлено');
        } else {
            kristalinaPhoto.style.backgroundImage = "url('https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')";
            kristalinaPhoto.style.backgroundSize = 'cover';
            kristalinaPhoto.style.backgroundPosition = 'center';
            console.log('⚠️ Для Кристалины использована заглушка');
        }
    }
}

// Фото Александра
if (path.includes('child-alexander') || path.includes('child-groom')) {
    const alexanderPhoto = document.getElementById('photo-alexander');
    if (alexanderPhoto) {
        if (status === 'success') {
            alexanderPhoto.style.backgroundImage = `url('${path}')`;
            alexanderPhoto.style.backgroundSize = 'cover';
            alexanderPhoto.style.backgroundPosition = 'center';
            console.log('✅ Фото Александра установлено');
        } else {
            alexanderPhoto.style.backgroundImage = "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')";
            alexanderPhoto.style.backgroundSize = 'cover';
            alexanderPhoto.style.backgroundPosition = 'center';
            console.log('⚠️ Для Александра использована заглушка');
        }
    }
}
// ===== ТАЙМЕР ОБРАТНОГО ОТСЧЕТА =====
function initCountdown() {
    console.log('⏳ Инициализация таймера...');
    
    const weddingDate = new Date('2026-02-08T18:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Проверяем наличие элементов
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('❌ Элементы таймера не найдены!');
        return;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        // Если свадьба уже прошла
        if (timeLeft < 0) {
            daysElement.textContent = '000';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Изменить заголовок
            const title = document.querySelector('.countdown-section h2');
            if (title) {
                title.textContent = 'Свадьба состоялась!';
                title.style.color = '#D8BFD8';
            }
            return;
        }
        
        // Расчет времени
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Обновление с анимацией
        updateWithAnimation(daysElement, days, 3);
        updateWithAnimation(hoursElement, hours, 2);
        updateWithAnimation(minutesElement, minutes, 2);
        updateWithAnimation(secondsElement, seconds, 2);
    }
    
    function updateWithAnimation(element, value, digits) {
        const currentValue = parseInt(element.textContent) || 0;
        
        if (currentValue !== value) {
            // Анимация изменения
            element.style.transform = 'scale(1.15)';
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
    console.log('✅ Таймер запущен');
}

// ===== АНКЕТА ГОСТЯ =====
function initRSVPForm() {
    console.log('📝 Инициализация формы RSVP...');
    
    const form = document.getElementById('rsvp-form');
    if (!form) {
        console.error('❌ Форма RSVP не найдена!');
        return;
    }
    
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
    
    // Валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка обязательных полей
        const name = document.getElementById('name');
        const surname = document.getElementById('surname');
        
        if (!name.value.trim()) {
            showNotification('Пожалуйста, введите ваше имя', 'error');
            name.focus();
            return;
        }
        
        if (!surname.value.trim()) {
            showNotification('Пожалуйста, введите вашу фамилию', 'error');
            surname.focus();
            return;
        }
        
        // Сбор данных формы
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        console.log('📨 Данные формы:', data);
        
        // Показываем успешное сообщение
        showNotification('🎉 Спасибо! Ваша анкета отправлена. Мы будем ждать вас на нашей свадьбе! ❤️', 'success');
        
        // Анимация отправки
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Сброс формы через 2 секунды
        setTimeout(() => {
            form.reset();
            if (partnerField) partnerField.style.display = 'none';
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #87CEEB, #D8BFD8)';
        }, 2000);
    });
    
    // Анимация при фокусе на полях
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.boxShadow = '0 5px 15px rgba(135, 206, 235, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.parentElement.style.boxShadow = 'none';
        });
    });
}

// ===== МУЗЫКАЛЬНЫЙ ПЛЕЕР =====
function initMusicPlayer() {
    console.log('🎵 Инициализация музыкального плеера...');
    
    const musicBtn = document.getElementById('music-toggle');
    if (!musicBtn) {
        console.error('❌ Кнопка музыки не найдена!');
        return;
    }
    
    const musicIcon = musicBtn.querySelector('i');
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            // Пауза
            musicIcon.className = 'fas fa-volume-mute';
            showNotification('🔇 Музыка выключена', 'info');
        } else {
            // Воспроизведение
            musicIcon.className = 'fas fa-volume-up';
            showNotification('🎵 Музыка включена', 'info');
        }
        isPlaying = !isPlaying;
        
        // Анимация кнопки
        this.style.transform = 'scale(1.15)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    console.log('✅ Музыкальный плеер готов');
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initScrollAnimations() {
    console.log('✨ Инициализация анимаций при скролле...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Особые анимации для разных элементов
                if (entry.target.classList.contains('story-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll(
        '.welcome-card, .story-item, .program-item, .detail-card, ' +
        '.child-photo, .love-equation, .countdown-item, .contact-item, ' +
        '.rsvp-form, .chat-card, .final-message'
    );
    
    animatedElements.forEach(element => {
        // Начальное состояние
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(element);
    });
    
    // Добавляем стили для анимаций
    addAnimationStyles();
    console.log('✅ Анимации при скролле активированы');
}

function addAnimationStyles() {
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
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .animated {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .story-item:nth-child(1) { animation-delay: 0.1s; }
        .story-item:nth-child(2) { animation-delay: 0.2s; }
        .story-item:nth-child(3) { animation-delay: 0.3s; }
        .story-item:nth-child(4) { animation-delay: 0.4s; }
        
        .program-item:nth-child(1) { animation-delay: 0.1s; }
        .program-item:nth-child(2) { animation-delay: 0.2s; }
        .program-item:nth-child(3) { animation-delay: 0.3s; }
        .program-item:nth-child(4) { animation-delay: 0.4s; }
        
        .detail-card:nth-child(1) { animation-delay: 0.1s; }
        .detail-card:nth-child(2) { animation-delay: 0.2s; }
        
        .countdown-item:nth-child(1) { animation-delay: 0.1s; }
        .countdown-item:nth-child(2) { animation-delay: 0.2s; }
        .countdown-item:nth-child(3) { animation-delay: 0.3s; }
        .countdown-item:nth-child(4) { animation-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

// ===== ПАРАЛЛАКС ЭФФЕКТ =====
function initParallax() {
    console.log('🌀 Инициализация параллакс эффекта...');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Герой секция - медленный параллакс
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Пригласительная секция - средний параллакс
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            const welcomeBg = welcomeSection.style.backgroundPositionY;
            welcomeSection.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
        
        // Фоновые элементы - быстрый параллакс
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== КНОПКА ЧАТА =====
function initChatButton() {
    console.log('💬 Инициализация кнопки чата...');
    
    const chatBtn = document.querySelector('.chat-btn');
    if (!chatBtn) return;
    
    chatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification(
            'Чат гостей будет доступен ближе к дате свадьбы. Следите за обновлениями в Telegram! 💌\n\n' +
            'Для связи: @Kristalina_and_Alexander',
            'info'
        );
        
        // Анимация кнопки
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'success') {
    // Удаляем предыдущие уведомления
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Цвета для разных типов уведомлений
    const colors = {
        success: 'linear-gradient(135deg, #87CEEB, #D8BFD8)',
        error: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
        info: 'linear-gradient(135deg, #4d96ff, #6bc5ff)',
        warning: 'linear-gradient(135deg, #ffa726, #ffb74d)'
    };
    
    // Иконки для разных типов
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type] || icons.success}"></i>
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
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-out 3.5s forwards;
            max-width: 400px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            font-family: 'Montserrat', sans-serif;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .notification i {
            font-size: 1.3rem;
            flex-shrink: 0;
            margin-top: 2px;
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
                transform: translateX(100%);
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
    
    // Применяем цвет
    notification.style.background = colors[type] || colors.success;
    
    // Добавляем на страницу
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Удаляем через 4 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, 4000);
    
    // Возможность закрыть уведомление
    notification.addEventListener('click', function() {
        this.remove();
        if (style.parentNode) {
            style.remove();
        }
    });
}

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====

// Анимация сердечек
function animateHearts() {
    const hearts = document.querySelectorAll('.fa-heart, .heart-pulse');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = `${index * 0.2}s`;
    });
}

// Подсветка активного раздела при скролле
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('a[href^="#"]').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Анимация наведения на карточки
function initHoverEffects() {
    const cards = document.querySelectorAll('.detail-card, .program-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(135, 206, 235, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(135, 206, 235, 0.1)';
        });
    });
}

// Инициализация дополнительных функций
function initAdditionalFeatures() {
    animateHearts();
    initActiveSection();
    initHoverEffects();
    
    // Анимация наведения на кнопки
    const buttons = document.querySelectorAll('button, .chat-btn, .tg-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Скрыть/показать кнопку музыки при скролле
    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Скролл вниз - скрыть кнопку
                musicBtn.style.opacity = '0.5';
                musicBtn.style.transform = 'translateY(100px)';
            } else {
                // Скролл вверх - показать кнопку
                musicBtn.style.opacity = '1';
                musicBtn.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Запуск всех функций при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('🚀 Все ресурсы загружены!');
    initAdditionalFeatures();
    
    // Показать итоговую информацию в консоли
    console.log('🎊 Свадебный сайт Кристалины и Александра готов к работе!');
    console.log('📅 Дата свадьбы: 8 февраля 2026');
    console.log('⏰ Начало: 18:00');
    console.log('❤️ Желаем счастливой свадьбы!');
    
    // Автоматическое сообщение в консоли через 5 секунд
    setTimeout(() => {
        console.log('💡 Подсказка: Нажмите F12 для просмотра консоли разработчика');
    }, 5000);
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('❌ Произошла ошибка:', e.message);
    console.error('📌 В файле:', e.filename);
    console.error('📝 Строка:', e.lineno);
});

// Предотвращение контекстного меню на изображениях
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('photo-inner')) {
        e.preventDefault();
        showNotification('Фотографии защищены авторским правом 💙', 'info');
    }
});

// Экспорт функций для глобального использования
window.WeddingSite = {
    showNotification,
    initCountdown,
    initRSVPForm,
    initPhotoLoading,
    initMusicPlayer
};

console.log('🎉 Свадебный скрипт инициализирован!');
