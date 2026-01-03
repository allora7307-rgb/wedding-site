rm script.js
cat > script.js << 'EOF'
// Таймер до свадьбы
function updateCountdown() {
    const weddingDate = new Date('2026-02-08T18:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = 
            '<div class="time-unit"><span class="number">🎉</span><span class="label">Сегодня свадьба!</span></div>';
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

if (music && musicBtn) {
    musicBtn.addEventListener('click', function() {
        if (music.paused) {
            music.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i><span>Выключить музыку</span>';
                musicBtn.classList.add('playing');
            }).catch(e => {
                console.log('Автовоспроизведение заблокировано');
                musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Нажмите для включения</span>';
            });
        } else {
            music.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Включить музыку</span>';
            musicBtn.classList.remove('playing');
        }
    });
    
    // Автовоспроизведение без звука
    music.volume = 0;
    music.play().then(() => {
        music.pause();
        music.currentTime = 0;
        music.volume = 1;
    }).catch(e => {
        console.log('Автовоспроизведение заблокировано');
    });
}

// Форма RSVP
const form = document.getElementById('wedding-form');
const partnerField = document.getElementById('partner-field');
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const formMessage = document.getElementById('form-message');

if (form && attendanceRadios.length > 0) {
    // Показать/скрыть поле для сопровождающих
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'with-partner') {
                partnerField.style.display = 'block';
            } else {
                partnerField.style.display = 'none';
            }
        });
    });
    
    // Отправка формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Собираем сообщение для Telegram
        const message = `
🎉 НОВЫЙ ОТВЕТ НА ПРИГЛАШЕНИЕ

👤 Гость: ${data.name} ${data.surname}
✅ Присутствие: ${getAttendanceText(data.attendance)}
${data.attendance === 'with-partner' ? `👥 Сопровождающие: ${data.partner || 'не указаны'}` : ''}
💬 Пожелания: ${data.wishes || 'нет'}
        `.trim();
        
        // Здесь будет отправка в Telegram
        // Нужно указать ваш токен бота и chat_id
        const botToken = 'ВАШ_BOT_TOKEN'; // Замените на ваш
        const chatId = 'ВАШ_CHAT_ID'; // Замените на ваш
        
        if (botToken === 'ВАШ_BOT_TOKEN') {
            // Демо-режим - показываем сообщение
            showFormMessage('Форма работает! Для реальной отправки настройте Telegram бота.', 'success');
            console.log('Сообщение для Telegram:', message);
            
            // Очищаем форму через 3 секунды
            setTimeout(() => {
                form.reset();
                partnerField.style.display = 'none';
                showFormMessage('', '');
            }, 3000);
        } else {
            // Реальная отправка в Telegram
            try {
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
                    partnerField.style.display = 'none';
                    
                    // Скрываем сообщение через 5 секунд
                    setTimeout(() => {
                        showFormMessage('', '');
                    }, 5000);
                } else {
                    showFormMessage('Ошибка при отправке. Пожалуйста, попробуйте ещё раз.', 'error');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                showFormMessage('Ошибка сети. Пожалуйста, проверьте подключение.', 'error');
            }
        }
    });
}

function getAttendanceText(value) {
    switch(value) {
        case 'yes': return 'Да, с удовольствием!';
        case 'with-partner': return 'Да, с парой/семьёй';
        case 'no': return 'К сожалению, не смогу';
        default: return 'не указано';
    }
}

function showFormMessage(text, type) {
    if (!formMessage) return;
    
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = text ? 'block' : 'none';
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

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#!') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
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
LOCATION:Ресторан "Лазурный", ул. Тверская, 15, Москва
DESCRIPTION:Приглашение на свадьбу Кристалины и Александра\\n\\nСбор гостей в 18:00\\n\\nС любовью, Кристалина и Александр
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'свадьба_кристалина_александр.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Привязываем создание .ics к кнопке календаря
const calendarBtn = document.querySelector('.calendar-btn');
if (calendarBtn) {
    calendarBtn.addEventListener('click', function(e) {
        if (!this.href || this.href.endsWith('#')) {
            e.preventDefault();
            createICSCalendar();
        }
    });
}

// Загрузка изображений с заглушками
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            // Если фото не загрузилось, оставляем как есть (уже есть заглушки в HTML)
            console.log('Изображение не загрузилось:', img.src);
        };
    });
    
    // Инициализация
    console.log('Свадебный сайт загружен!');
});
EOF