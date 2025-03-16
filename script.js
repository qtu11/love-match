// Hiệu ứng cho trang chủ và các phần tử khác
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiệu ứng cho section .hero khi hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseover', () => {
            hero.style.background = 'rgba(255, 255, 255, 0.1)';
            hero.style.transition = 'background 0.3s ease';
        });
        hero.addEventListener('mouseout', () => {
            hero.style.background = 'transparent';
        });

        // Hiệu ứng ánh sáng di theo chuột trong .hero
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.background = `radial-gradient(circle 100px at ${x}px ${y}px, rgba(255, 111, 97, 0.3), transparent)`;
        });
    }

    // 2. Hiệu ứng cho .member-card
    const memberCards = document.querySelectorAll('.member-card');
    if (memberCards.length > 0) {
        // Hiệu ứng cuộn: Fade In từ bên trái/phải
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const isLeft = entry.target.offsetLeft < window.innerWidth / 2;
                    entry.target.style.animation = isLeft 
                        ? `fadeInLeft 1s ease-out` 
                        : `fadeInRight 1s ease-out`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        memberCards.forEach(card => {
            observer.observe(card);

            // Hiệu ứng khi chuột lại gần: phóng to và rung
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
                
                if (distance < 150) { // Chuột trong phạm vi 150px
                    card.style.transform = 'scale(1.05) rotate(1deg)';
                    card.style.animation = 'shake 0.5s infinite';
                    createRippleEffect(card, e.clientX - rect.left, e.clientY - rect.top);
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) rotate(0deg)';
                card.style.animation = '';
            });
        });

        // Hiệu ứng avatar khi hover
        const avatars = document.querySelectorAll('.avatar-circle');
        avatars.forEach(avatar => {
            avatar.addEventListener('mouseover', () => {
                const randomAngle = Math.random() * 10 - 5;
                avatar.style.transform = `rotate(${randomAngle}deg) scale(1.1)`;
                avatar.querySelector('img').style.filter = `brightness(${110 + Math.random() * 10}%) sepia(${Math.random() * 15}%)`;
                createHeartEffect(avatar);
            });
            avatar.addEventListener('mouseout', () => {
                avatar.style.transform = 'rotate(0deg) scale(1)';
                avatar.querySelector('img').style.filter = 'brightness(100%) sepia(0%)';
            });
        });
    }

    // 3. Hiệu ứng cho .team-table và .assignment-table khi cuộn
    const tables = document.querySelectorAll('.team-table, .assignment-table');
    tables.forEach(table => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'spinIn 1s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(table);
    });

    // 4. Hiệu ứng nút khi chuột lại gần
    const buttons = document.querySelectorAll('.explore-button, .match-button, .detail-button');
    buttons.forEach(button => {
        button.classList.add('glow');
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const distance = Math.sqrt((e.clientX - (rect.left + rect.width / 2)) ** 2 + (e.clientY - (rect.top + rect.height / 2)) ** 2);
            if (distance < 100) {
                button.style.transform = 'scale(1.1)';
                button.style.animation = 'pulseGlow 0.8s infinite';
            }
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.animation = '';
        });
    });

    // 5. Hiệu ứng trái tim rơi ngẫu nhiên
    function createFallingHearts() {
        const heart = document.createElement('div');
        heart.classList.add('heart-falling');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.background = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.8)`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    setInterval(createFallingHearts, 800);

    // Hàm tạo sóng lan tỏa
    function createRippleEffect(element, x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    // Hàm tạo trái tim quanh avatar
    function createHeartEffect(element) {
        for (let i = 0; i < 7; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 120 + 'px';
            heart.style.animationDelay = Math.random() * 0.7 + 's';
            heart.style.background = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.8)`;
            element.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }
    }
});

// Các hàm hiển thị nội dung (giữ nguyên từ mã cũ)
function showPage(pageId) {
    const pages = document.querySelectorAll('#content section');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function showMemberDetail(name, avatarSrc, age, birthday, advantages, disadvantages) {
    document.getElementById('detail-name').textContent = name;
    document.getElementById('detail-avatar').src = avatarSrc;
    document.getElementById('detail-age').textContent = age;
    document.getElementById('detail-birthday').textContent = birthday;
    document.getElementById('detail-advantages').textContent = advantages;
    document.getElementById('detail-disadvantages').textContent = disadvantages;
    showPage('member-detail');
}

function showAssignmentDetail(name, role, avatarSrc) {
    const roleDescriptions = {
        'Lập trình Frontend': 'Phát triển giao diện web sử dụng HTML, CSS, JavaScript để tạo trải nghiệm người dùng mượt mà.',
        'Trưởng nhóm': 'Quản lý và điều phối công việc của nhóm, đảm bảo tiến độ và chất lượng dự án.',
        'Thiết kế giao diện (UI/UX Designer)': 'Thiết kế giao diện thân thiện, đẹp mắt và tối ưu trải nghiệm người dùng.',
        'Soạn nội dung': 'Viết và chỉnh sửa nội dung hấp dẫn, phù hợp với mục đích dự án.',
        'Kiểm thử (Tester)': 'Kiểm tra và đảm bảo website hoạt động ổn định, không có lỗi.',
        'Báo cáo và trình bày': 'Chuẩn bị tài liệu, slide trình bày và báo cáo tiến độ dự án.'
    };
    document.getElementById('assignment-name').textContent = name;
    document.getElementById('assignment-avatar').src = avatarSrc;
    document.getElementById('assignment-role').textContent = role;
    document.getElementById('assignment-description').textContent = roleDescriptions[role];
    showPage('assignment-detail');
}

function matchNow() {
    const name = document.getElementById('detail-name').textContent;
    alert(`Đã gửi yêu cầu ghép đôi với ${name}! Chúng tôi sẽ liên hệ sớm nhất.`);
}

