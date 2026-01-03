// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Параллакс эффект для фона
    initParallax();
    
    // Инициализация календаря
    initMiniCalendar();
    
    // Инициализация таймера
    initCountdown();
    
    // Инициализация формы
    initForm();
    
    // Инициализация музыки
    initMusic();
    
    // Анимация по скроллу
    initScrollAnimations();
});

// Параллакс эффект
function initParallax() {
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroSection.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
}

// Мини-календарь
function initMiniCalendar() {
    const weddingDate = new Date(2026, 1, 8); // Февраль - 1 (0 - январь)
    const currentDate = new Date();
    
    // Если свадьба уже прошла, показываем прошедшую дату
    const displayDate = weddingDate < currentDate ? currentDate : weddingDate;
    
    const month = displayDate.getMonth();
    const year = displayDate.getFullYear();
    
    // Первый день месяца
    const firstDay = new Date(year, month, 1);
    // Последний день месяца
    const lastDay = new Date(year, month + 1, 0);
    // Количество дней в месяце
    const daysInMonth = lastDay.getDate();
    // День недели первого дня (0 - воскресенье, 1 - понедельник и т.д.)
    const firstDayIndex = firstDay.getDay();
    
    const calendarGrid = document.querySelector('.calendar-grid');
    calendarGrid.innerHTML = '';
    
    // Дни недели
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day week-day';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Пустые ячейки перед первым днем
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Отметить день свадьбы
        if (year === 2026 && month === 1 && day === 8) { // 8 февраля 2026
            dayElement.classList.add('wedding-day');
            dayElement.innerHTML = `${day} <i class="fas fa-heart"></i>`;
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Таймер обратного отсчета
function initCountdown() {
    const weddingDate = new Date('2026-02-08T18:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft < 0) {
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
        
        // Анимация изменения цифр
        animateValue('days', days, 3);
        animateValue('hours', hours, 2);
        animateValue('minutes', minutes, 2);
        animateValue('seconds', seconds, 2);
    }
    
    // Обновляем каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Анимация изменения цифр
function animateValue(elementId, value, digits) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue === value) return;
    
    // Добавляем ведущие нули
    const formattedValue = value.toString().padStart(digits, '0');
    
    // Простая анимация изменения
    element.style.transform = 'scale(1.1)';
    element.style.color = '#D8BFD8';
    
    setTimeout(() => {
        element.textContent = formattedValue;
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 150);
}

// Инициализация формы
function initForm() {
    const form = document.getElementById('guest-form');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const companionField = document.getElementById('companion-field');
    const foodOtherCheckbox = document.querySelector('input[name="food"][value="other"]');
    const foodOtherTextarea = document.getElementById('food-other');
    
    // Показать/скрыть поле для имен спутников
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'couple') {
                companionField.style.display = 'block';
            } else {
                companionField.style.display = 'none';
            }
        });
    });
    
    // Показать/скрыть текстовое поле для другого варианта еды
    foodOtherCheckbox.addEventListener('change', function() {
        foodOtherTextarea.style.display = this.checked ? 'block' : 'none';
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Здесь можно отправить данные на сервер или в Telegram бот
        // Пример для Telegram бота:
        // sendToTelegram(data);
        
        // Показываем сообщение об успехе
        alert('Спасибо! Ваша анкета отправлена. Мы будем ждать вас на нашей свадьбе! ❤️');
        form.reset();
        
        // Скрываем дополнительные поля
        companionField.style.display = 'none';
        foodOtherTextarea.style.display = 'none';
    });
}

// Инициализация музыки
function initMusic() {
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i');
    const backgroundMusic = document.getElementById('background-music');
    
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.className = 'fas fa-volume-mute';
        } else {
            // Воспроизводим с задержкой для обхода ограничений автоплея
            backgroundMusic.play().then(() => {
                musicIcon.className = 'fas fa-volume-up';
                isPlaying = true;
            }).catch(error => {
                console.log('Автовоспроизведение заблокировано:', error);
                alert('Нажмите на кнопку музыки еще раз, чтобы включить звук');
            });
        }
        isPlaying = !isPlaying;
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
                entry.target.classList.add('animate-in-view');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.timeline-item, .photo-circle, .color-circle');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Функция для отправки в Telegram (нужно настроить бота)
function sendToTelegram(data) {
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    
    const message = `
Новая анкета гостя:
Имя: ${data.name}
Фамилия: ${data.surname}
Присутствие: ${data.attendance}
${data.attendance === 'couple' ? `Спутники: ${data.companion}` : ''}
Напитки: ${data.drinks || 'не указано'}
Аллергии: ${data.allergies || 'нет'}
Горячее: ${data.food ? data.food.join(', ') : 'не указано'}
${data['food-other'] ? `Другой вариант: ${data['food-other']}` : ''}
Транспорт: ${data.transport || 'не указано'}
Помощь: ${data.help || 'не требуется'}
Комментарий: ${data.comment || 'нет'}
    `.trim();
    
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    });
}

// Добавляем стили для анимации при скролле
const style = document.createElement('style');
style.textContent = `
    .animate-in-view {
        animation: slideUp 0.8s ease-out forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
