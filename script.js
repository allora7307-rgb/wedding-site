// Таймер до свадьбы
function updateCountdown() {
    const weddingDate = new Date('2026-02-08T18:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div class="time-unit"><span class="number">🎉</span><span class="label">Свадьба сегодня!</span></div>';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Анимация обновления цифр
    animateNumber('days', days);
    animateNumber('hours', hours);
    animateNumber('minutes', minutes);
    animateNumber('seconds', seconds);
}

function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent);
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ff6b8b';
        
        setTimeout(() => {
            element.textContent = newValue.toString().padStart(2, '0');
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 150);
    } else {
        element.textContent = newValue.toString().padStart(2, '0');
    }
}

// Запуск таймера
updateCountdown();
setInterval(updateCountdown, 1000);

// Музыка
const music = document.getElementById('wedding-music');
const musicBtn = document.getElementById('music-toggle');

musicBtn.addEventListener('click', function() {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i><span>Выключить музыку</span>';
        musicBtn.classList.add('playing');
    } else {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Включить музыку</span>';
        musicBtn.classList.remove('playing');
    }
});

// Автовоспроизведение без звука (браузеры разрешают)
document.addEventListener('DOMContentLoaded', function() {
    music.volume = 0;
    music.play().then(() => {
        music.pause();
        music.currentTime = 0;
        music.volume = 1;
    }).catch(e => console.log('Автовоспроизведение заблокировано'));
});

// Форма RSVP
const form = document.getElementById('wedding-form');
const companionField = document.getElementById('companion-field');
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const formMessage = document.getElementById('form-message');

// Показать/скрыть поле для сопровождающих
attendanceRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'couple') {
            companionField.style.display = 'block';
        } else {
            companionField.style.display = 'none';
        }
    });
});

// Отправка формы в Telegram
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Собираем данные формы
    const message = `
🎉 НОВЫЙ ОТВЕТ НА ПРИГЛАШЕНИЕ

👤 Гость: ${data.name} ${data.surname}
✅ Присутствие: ${getAttendanceText(data.attendance)}
${data.attendance === 'couple' ? `👥 Сопровождающие: ${data.companion_names || 'не указаны'}` : ''}
🍸 Напитки: ${data.drinks || 'не указано'}
⚠️ Аллергии: ${data.allergies || 'нет'}
🍽️ Блюда: ${Array.isArray(data['food[]']) ? data['food[]'].join(', ') : data['food[]'] || 'не указано'}
🚗 Транспорт: ${data.transport || 'не указано'}
🚕 Помощь с трансфером: ${data.transfer_help === 'yes' ? 'Да' : 'Нет'}
💬 Комментарии: ${data.comments || 'нет'}
    `.trim();

    try {
        // Здесь нужно указать ваш Telegram Bot Token и Chat ID
        const botToken = 'ВАШ_BOT_TOKEN';
        const chatId = 'ВАШ_CHAT_ID';
        
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            showFormMessage('Ваш ответ успешно отправлен! Спасибо!', 'success');
            form.reset();
            companionField.style.display = 'none';
        } else {
            showFormMessage('Ошибка при отправке. Пожалуйста, попробуйте ещё раз.', 'error');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showFormMessage('Ошибка сети. Пожалуйста, проверьте подключение.', 'error');
    }
});

function getAttendanceText(value) {
    switch(value) {
        case 'alone': return 'один/одна';
        case 'couple': return 'с парой / семьёй';
        case 'no': return 'не смогу прийти';
        default: return 'не указано';
    }
}

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Анимация при скролле
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

// Наблюдаем за всеми анимируемыми элементами
document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
});

// Создание файла .ics для календаря
function createICSCalendar() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Свадьба Кристалины и Александра
DTSTART:20260208T180000
DTEND:20260208T230000
LOCATION:Место проведения будет уточнено
DESCRIPTION:Приглашение на свадьбу Кристалины и Александра
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = url;
    link.download = 'свадьба_кристалина_александр.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Привязываем создание .ics к кнопке календаря
document.querySelector('.calendar-btn').addEventListener('click', function(e) {
    if (!this.href || this.href === '#') {
        e.preventDefault();
        createICSCalendar();
    }
});

// Плавный скролл
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