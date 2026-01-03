// ===== ПРОВЕРКА И ЗАГРУЗКА ФОТО =====
function initPhotoLoading() {
    console.log('Начинаем загрузку фото...');
    
    const photoPaths = [
        '/assets/images/proposal-bg.jpg',
        '/assets/images/invitation-bg.jpg',
        '/assets/images/child-kristalina.jpg',
        '/assets/images/child-alexander.jpg'
    ];
    
    let loadedCount = 0;
    
    photoPaths.forEach(path => {
        const img = new Image();
        img.onload = function() {
            loadedCount++;
            console.log(`✅ Фото загружено: ${path}`);
            
            // Если это детские фото, обновляем их
            if (path.includes('child-kristalina')) {
                const kristalinaPhoto = document.querySelector('.photo-inner.kristalina');
                if (kristalinaPhoto) {
                    kristalinaPhoto.style.backgroundImage = `url('${path}')`;
                }
            }
            
            if (path.includes('child-alexander')) {
                const alexanderPhoto = document.querySelector('.photo-inner.alexander');
                if (alexanderPhoto) {
                    alexanderPhoto.style.backgroundImage = `url('${path}')`;
                }
            }
            
            // Если все фото загружены
            if (loadedCount === photoPaths.length) {
                console.log('✅ Все фото успешно загружены!');
            }
        };
        
        img.onerror = function() {
            console.log(`❌ Ошибка загрузки: ${path}`);
            loadedCount++;
            
            // Используем заглушки из Unsplash при ошибке
            if (path.includes('proposal-bg')) {
                document.querySelector('.hero-section').style.backgroundImage = 
                    "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')";
            }
            
            if (path.includes('invitation-bg')) {
                document.querySelector('.welcome-section').style.backgroundImage = 
                    "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')";
            }
            
            if (path.includes('child-kristalina')) {
                const kristalinaPhoto = document.querySelector('.photo-inner.kristalina');
                if (kristalinaPhoto) {
                    kristalinaPhoto.style.backgroundImage = 
                        "url('https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')";
                }
            }
            
            if (path.includes('child-alexander')) {
                const alexanderPhoto = document.querySelector('.photo-inner.alexander');
                if (alexanderPhoto) {
                    alexanderPhoto.style.backgroundImage = 
                        "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')";
                }
            }
        };
        
        // Начинаем загрузку
        img.src = path;
    });
}

// Добавьте вызов этой функции в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... ваш существующий код ...
    initPhotoLoading(); // Добавьте эту строку
});
