// script.js (Объединенный)

document.addEventListener("DOMContentLoaded", function () {
  // Код для новой секции "Услуги" (из 1script.txt) - ховер на кнопках
  const serviceButtons = document.querySelectorAll(".service-card__button");
  serviceButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.opacity = "0.8";
    });
    button.addEventListener("mouseleave", () => {
      button.style.opacity = "1";
    });
  });

  // Код из reviews.js (горизонтальный скролл)
  const reviewsList = document.querySelector(".reviews__list");
  if (reviewsList) {
    let isReviewScrolling = false;
    let reviewStartX;
    let reviewScrollLeft;

    reviewsList.addEventListener("mousedown", (e) => {
      isReviewScrolling = true;
      reviewsList.classList.add('active-scroll');
      reviewStartX = e.pageX - reviewsList.offsetLeft;
      reviewScrollLeft = reviewsList.scrollLeft;
    });
    reviewsList.addEventListener("mouseleave", () => {
      isReviewScrolling = false;
      reviewsList.classList.remove('active-scroll');
    });
    reviewsList.addEventListener("mouseup", () => {
      isReviewScrolling = false;
      reviewsList.classList.remove('active-scroll');
    });
    reviewsList.addEventListener("mousemove", (e) => {
      if (!isReviewScrolling) return;
      e.preventDefault();
      const x = e.pageX - reviewsList.offsetLeft;
      const walk = (x - reviewStartX) * 2;
      reviewsList.scrollLeft = reviewScrollLeft - walk;
    });
  }

  // Обработчик кнопки "Бесплатная консультация" (старая, из tech-stack__info) - ЕСЛИ ЕЩЕ ЕСТЬ В HTML
  const consultationBtnOld = document.querySelector(".tech-stack__info .consultation-btn");
  if (consultationBtnOld) {
    consultationBtnOld.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Кнопка 'Бесплатная консультация' (старая, из tech-stack__info) нажата");
    });
  }

  // Выбор тегов в секции "Технологический стек" (старая, из tech-stack__info) - ЕСЛИ ЕЩЕ ЕСТЬ В HTML
  const techTagsOld = document.querySelectorAll(".tech-stack__tags .tag");
  if (techTagsOld.length > 0) {
    techTagsOld.forEach((tag) => {
      tag.addEventListener("click", () => {
        techTagsOld.forEach((t) => {
            t.classList.remove("tag--active");
            t.classList.add("tag--inactive");
        });
        tag.classList.add("tag--active");
        tag.classList.remove("tag--inactive");
        console.log("Выбран тег (старый, из tech-stack__info):", tag.textContent.trim());
      });
    });
  }

  // Код из старого script.js (для слайдера testimonials, который, возможно, был в другом HTML)
  // ОСТАВЛЕН НА СЛУЧАЙ, ЕСЛИ ОН НУЖЕН ДЛЯ ДРУГОЙ, НЕПРЕДОСТАВЛЕННОЙ ЧАСТИ СТРАНИЦЫ
  const sliderTestimonials = document.querySelector(".testimonials__slider");
  const cardsTestimonials = document.querySelectorAll(".testimonial-card");
  const navButtonsTestimonials = document.querySelectorAll(".testimonials__nav path");

  if (sliderTestimonials && cardsTestimonials.length > 0 && navButtonsTestimonials.length > 0) {
    let currentIndexTestimonials = 0;
    let cardWidthTestimonials;

    function updateCardWidthTestimonials() {
        if(cardsTestimonials[0]) {
             cardWidthTestimonials = cardsTestimonials[0].offsetWidth + parseInt(getComputedStyle(cardsTestimonials[0].parentElement).gap || "0");
        }
    }
    window.addEventListener('resize', updateCardWidthTestimonials);
    updateCardWidthTestimonials();

    if(navButtonsTestimonials[0] && navButtonsTestimonials[0].parentElement) {
        navButtonsTestimonials[0].parentElement.addEventListener("click", () => {
            if (currentIndexTestimonials > 0) {
              currentIndexTestimonials--;
              sliderTestimonials.scrollTo({ left: currentIndexTestimonials * cardWidthTestimonials, behavior: "smooth" });
            }
        });
    }
    if(navButtonsTestimonials[1] && navButtonsTestimonials[1].parentElement) {
        navButtonsTestimonials[1].parentElement.addEventListener("click", () => {
            if (currentIndexTestimonials < cardsTestimonials.length - 1) {
              currentIndexTestimonials++;
              sliderTestimonials.scrollTo({ left: currentIndexTestimonials * cardWidthTestimonials, behavior: "smooth" });
            }
        });
    }
    sliderTestimonials.addEventListener("scroll", () => {
      const scrollPosition = sliderTestimonials.scrollLeft;
      const maxScroll = sliderTestimonials.scrollWidth - sliderTestimonials.clientWidth;
      if (navButtonsTestimonials[0]) navButtonsTestimonials[0].style.opacity = scrollPosition <= 1 ? "0.3" : "1";
      if (navButtonsTestimonials[1]) navButtonsTestimonials[1].style.opacity = scrollPosition >= maxScroll -1 ? "0.3" : "1";
    });
    if (navButtonsTestimonials[0]) navButtonsTestimonials[0].style.opacity = "0.3";
    if (navButtonsTestimonials[1] && cardsTestimonials.length <=1 ) navButtonsTestimonials[1].style.opacity = "0.3";
  }

  // =====================================================
  // JavaScript для "липкой" шапки
  // =====================================================
  const header = document.querySelector(".site-header");
  if (header) {
    // let headerHeight = 0; // Не используется напрямую в текущей логике
    function updateHeaderState() {
        // headerHeight = header.offsetHeight; // Не используется напрямую
        handleScroll();
    }
    function handleScroll() {
        if (window.scrollY > 50) {
            if (!header.classList.contains("scrolled")) {
                header.classList.add("scrolled");
            }
        } else {
            if (header.classList.contains("scrolled")) {
                header.classList.remove("scrolled");
                // document.body.style.paddingTop = '0'; // Эта строка может быть не нужна, если нет явного смещения контента
            }
        }
    }
    updateHeaderState();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeaderState);
  }

  // =====================================================
  // JavaScript для диаграммы "Технологический стек"
  // =====================================================
  const svgDiagram = document.getElementById('connector-lines');
  const flowchartContainer = document.getElementById('flowchart');

  if (flowchartContainer && svgDiagram) {
    const techStackTagsDiagram = document.querySelectorAll(".tech-stack-left-content .tech-tag");
    const allDiagramNodes = flowchartContainer.querySelectorAll(".node");

    const tagToNodesMap = {
        'frontend': ['frontend', 'ui-architecture', 'core-dev-frontend', 'code-review-frontend'],
        'backend': ['backend', 'api-design', 'db-architecture', 'core-dev-backend', 'services-integration', 'code-review-backend'],
        'full-stack': [
            'frontend', 'ui-architecture', 'core-dev-frontend', 'code-review-frontend',
            'backend', 'api-design', 'db-architecture', 'core-dev-backend', 'services-integration', 'code-review-backend'
        ],
        'devops': ['ci-cd-setup', 'infrastructure-review', 'infrastructure', 'monitoring', 'deployment'],
        'team lead': ['product-planning', 'system-design'],
        'qa': []
    };

    function setActiveNodesDiagram(selectedTagText) {
        allDiagramNodes.forEach(node => node.classList.remove('active'));
        const nodesToActivate = tagToNodesMap[selectedTagText.toLowerCase()] || [];
        nodesToActivate.forEach(nodeId => {
            const nodeElement = document.getElementById(nodeId);
            if (nodeElement) nodeElement.classList.add('active');
        });
    }

    if (techStackTagsDiagram.length > 0) {
        techStackTagsDiagram.forEach((tag) => {
            tag.addEventListener("click", () => {
                techStackTagsDiagram.forEach((t) => t.classList.remove("active-tech-tag"));
                tag.classList.add("active-tech-tag");
                const selectedTagText = tag.textContent.trim();
                // console.log("Выбран тег (диаграмма):", selectedTagText);
                setActiveNodesDiagram(selectedTagText);
            });
        });
        const initiallyActiveTagDiagram = document.querySelector(".tech-stack-left-content .tech-tag.active-tech-tag");
        if (initiallyActiveTagDiagram) {
            setActiveNodesDiagram(initiallyActiveTagDiagram.textContent.trim());
        } else if (techStackTagsDiagram.length > 0) {
             setActiveNodesDiagram(techStackTagsDiagram[0].textContent.trim());
             techStackTagsDiagram[0].classList.add("active-tech-tag");
        }
    }

    function getElementConnectionPointsDiagram(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const containerRect = flowchartContainer.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top + flowchartContainer.scrollTop;
        const relativeLeft = rect.left - containerRect.left + flowchartContainer.scrollLeft;
        return {
            top: { x: relativeLeft + rect.width / 2, y: relativeTop },
            bottom: { x: relativeLeft + rect.width / 2, y: relativeTop + rect.height },
            left: { x: relativeLeft, y: relativeTop + rect.height / 2 },
            right: { x: relativeLeft + rect.width, y: relativeTop + rect.height / 2 },
        };
    }

    function drawLineDiagram(p1, p2, elbowOptions = {}) {
        const { isElbow = false, yOffset = 20 } = elbowOptions;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let d;
        if (!isElbow) {
            d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
        } else {
            let midY1 = p1.y + yOffset;
            d = `M ${p1.x} ${p1.y} V ${midY1} H ${p2.x} V ${p2.y}`;
        }
        path.setAttribute('d', d);
        path.setAttribute('stroke', '#888');
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '4 2');
        svgDiagram.appendChild(path);
    }

    function connectNodesDiagram() {
        if (!flowchartContainer || !svgDiagram) return;
        svgDiagram.innerHTML = '';
        const connections = [
            { from: 'product-planning', fromPort: 'bottom', to: 'system-design', toPort: 'top' },
            { from: 'system-design', fromPort: 'bottom', to: 'frontend', toPort: 'top', elbow: { isElbow: true, yOffset: 20 } },
            { from: 'system-design', fromPort: 'bottom', to: 'backend', toPort: 'top', elbow: { isElbow: true, yOffset: 20 } },
            { from: 'frontend', fromPort: 'bottom', to: 'ui-architecture', toPort: 'top' },
            { from: 'ui-architecture', fromPort: 'bottom', to: 'core-dev-frontend', toPort: 'top' },
            { from: 'core-dev-frontend', fromPort: 'bottom', to: 'code-review-frontend', toPort: 'top' },
            { from: 'backend', fromPort: 'bottom', to: 'api-design', toPort: 'top', elbow: { isElbow: true, yOffset: 5 } },
            { from: 'backend', fromPort: 'bottom', to: 'db-architecture', toPort: 'top', elbow: { isElbow: true, yOffset: 5 } },
            { from: 'api-design', fromPort: 'bottom', to: 'core-dev-backend', toPort: 'top', forceStrictVertical: true },
            { from: 'db-architecture', fromPort: 'bottom', to: 'services-integration', toPort: 'top', forceStrictVertical: true },
            { from: 'core-dev-backend', fromPort: 'bottom', to: 'code-review-backend', toPort: 'top', elbow: { isElbow: true, yOffset: 5 } },
            { from: 'services-integration', fromPort: 'bottom', to: 'code-review-backend', toPort: 'top', elbow: { isElbow: true, yOffset: 5 } },
            { from: 'code-review-frontend', fromPort: 'bottom', to: 'ci-cd-setup', toPort: 'top', elbow: { isElbow: true, yOffset: 20 } },
            { from: 'code-review-backend', fromPort: 'bottom', to: 'ci-cd-setup', toPort: 'top', elbow: { isElbow: true, yOffset: 20 } },
            { from: 'ci-cd-setup', fromPort: 'bottom', to: 'infrastructure-review', toPort: 'top' },
            { from: 'infrastructure-review', fromPort: 'bottom', to: 'infrastructure', toPort: 'top', elbow: { isElbow: true, yOffset: 20 } },
            { from: 'infrastructure-review', fromPort: 'bottom', to: 'monitoring', toPort: 'top', forceStrictVertical: true },
            { from: 'infrastructure-review', fromPort: 'bottom', to: 'deployment', toPort: 'top', elbow: { isElbow: true, yOffset: 20 } },
        ];
        connections.forEach(conn => {
            const p1el = getElementConnectionPointsDiagram(conn.from);
            const p2el = getElementConnectionPointsDiagram(conn.to);
            if (!p1el || !p2el) {
                // console.warn(`Diagram connection elements not found: ${conn.from} or ${conn.to}`); // Закомментировано, чтобы не засорять консоль при штатной работе
                return;
            }
            let p1_coord = p1el[conn.fromPort];
            let p2_coord = p2el[conn.toPort];
            if (conn.forceStrictVertical && (!conn.elbow || !conn.elbow.isElbow)) {
                p2_coord = { x: p1_coord.x, y: p2_coord.y };
            }
            drawLineDiagram(p1_coord, p2_coord, conn.elbow);
        });
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(connectNodesDiagram);
    });

    let resizeTimeoutDiagram;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeoutDiagram);
        resizeTimeoutDiagram = setTimeout(() => {
             requestAnimationFrame(connectNodesDiagram);
        }, 100);
    });
    const newCtaButtonDiagram = document.querySelector(".tech-stack-left-content .tech-cta-button");
    if (newCtaButtonDiagram) {
        newCtaButtonDiagram.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Кнопка 'Бесплатная консультация' (диаграмма) нажата");
        });
    }
  }

  // =====================================================
  // JavaScript для мобильной навигации (гамбургер-меню)
  // =====================================================
  const primaryNav = document.querySelector(".main-nav"); // Можно использовать и ID: document.getElementById("primary-navigation");
  const navToggle = document.querySelector(".mobile-nav-toggle");

  if (navToggle && primaryNav) {
    const hamburgerIcon = navToggle.querySelector(".hamburger-icon");
    const closeIcon = navToggle.querySelector(".close-icon");

    navToggle.addEventListener("click", () => {
        const visibility = primaryNav.getAttribute("data-visible");

        if (visibility === "false" || visibility === null) {
            primaryNav.setAttribute("data-visible", "true");
            navToggle.setAttribute("aria-expanded", "true");
            if (hamburgerIcon) hamburgerIcon.style.display = "none";
            if (closeIcon) closeIcon.style.display = "block";
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        } else {
            primaryNav.setAttribute("data-visible", "false");
            navToggle.setAttribute("aria-expanded", "false");
            if (hamburgerIcon) hamburgerIcon.style.display = "block";
            if (closeIcon) closeIcon.style.display = "none";
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        }
    });

    // Закрытие меню при клике на ссылку (если это необходимо для одностраничника)
    const navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const visibility = primaryNav.getAttribute("data-visible");
            if (visibility === "true") { // Закрываем только если меню открыто
                primaryNav.setAttribute("data-visible", "false");
                navToggle.setAttribute("aria-expanded", "false");
                if (hamburgerIcon) hamburgerIcon.style.display = "block";
                if (closeIcon) closeIcon.style.display = "none";
                document.body.style.overflow = ''; // Восстанавливаем прокрутку
            }
        });
    });
  }

}); // Конец основного обработчика DOMContentLoaded
const reviewsList = document.querySelector(".reviews__list"); // Этот reviewsList будет использоваться и для стрелок
  if (reviewsList) {
    let isReviewScrolling = false;
    let reviewStartX;
    let reviewScrollLeft;

    reviewsList.addEventListener("mousedown", (e) => {
      isReviewScrolling = true;
      reviewsList.classList.add('active-scroll');
      reviewStartX = e.pageX - reviewsList.offsetLeft;
      reviewScrollLeft = reviewsList.scrollLeft;
    });
    reviewsList.addEventListener("mouseleave", () => {
      isReviewScrolling = false;
      reviewsList.classList.remove('active-scroll');
    });
    reviewsList.addEventListener("mouseup", () => {
      isReviewScrolling = false;
      reviewsList.classList.remove('active-scroll');
    });
    reviewsList.addEventListener("mousemove", (e) => {
      if (!isReviewScrolling) return;
      e.preventDefault();
      const x = e.pageX - reviewsList.offsetLeft;
      const walk = (x - reviewStartX) * 2; // Умножаем на 2 для более быстрой прокрутки
      reviewsList.scrollLeft = reviewScrollLeft - walk;
      // Событие "scroll" будет вызвано, что обновит состояние кнопок навигации
    });

    // Код для навигации по отзывам с помощью стрелок
        // Код для навигации по отзывам с помощью стрелок
    const reviewCards = reviewsList.querySelectorAll(".review-card");
    // Получаем группы и пути отдельно
    const navLeftReviewGroup = document.getElementById("reviews-nav-left-group");
    const navRightReviewGroup = document.getElementById("reviews-nav-right-group");
    const navLeftReviewPath = document.getElementById("reviews-nav-left");
    const navRightReviewPath = document.getElementById("reviews-nav-right");


    if (reviewCards.length > 0 && navLeftReviewGroup && navRightReviewGroup && navLeftReviewPath && navRightReviewPath) {
        let reviewCardWidth;
        let reviewListGap;

        function updateReviewCardAndGap() {
            if (reviewCards[0]) {
                const gapStyle = getComputedStyle(reviewsList).gap;
                reviewListGap = parseFloat(gapStyle) || 30;
                reviewCardWidth = reviewCards[0].offsetWidth + reviewListGap;
            }
        }

        function updateReviewNavButtonsState() {
            if (!reviewsList || !navLeftReviewPath || !navRightReviewPath || !navLeftReviewGroup || !navRightReviewGroup) return;

            const scrollPosition = reviewsList.scrollLeft;
            const maxScroll = reviewsList.scrollWidth - reviewsList.clientWidth;

            const atStart = scrollPosition <= 1;
            navLeftReviewPath.style.opacity = atStart ? "0.3" : "1";
            navLeftReviewGroup.style.cursor = atStart ? "default" : "pointer";

            const allCardsVisible = reviewsList.scrollWidth <= reviewsList.clientWidth + 1;
            const atEnd = scrollPosition >= maxScroll - 1;

            navRightReviewPath.style.opacity = (atEnd || allCardsVisible) ? "0.3" : "1";
            navRightReviewGroup.style.cursor = (atEnd || allCardsVisible) ? "default" : "pointer";
        }

        navLeftReviewGroup.addEventListener("click", () => { // Слушаем клик на группе
            if (parseFloat(navLeftReviewPath.style.opacity || 1) > 0.3) { // Проверяем opacity пути
                reviewsList.scrollBy({ left: -reviewCardWidth, behavior: "smooth" });
            }
        });

        navRightReviewGroup.addEventListener("click", () => { // Слушаем клик на группе
            if (parseFloat(navRightReviewPath.style.opacity || 1) > 0.3) { // Проверяем opacity пути
                reviewsList.scrollBy({ left: reviewCardWidth, behavior: "smooth" });
            }
        });

        reviewsList.addEventListener("scroll", updateReviewNavButtonsState);
        window.addEventListener('resize', () => {
            updateReviewCardAndGap();
            updateReviewNavButtonsState();
        });

        // Инициализация
        updateReviewCardAndGap();
        updateReviewNavButtonsState();
    }
  }
// Конец основного обработчика DOMContentLoaded