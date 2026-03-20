const WHATSAPP_NUMBER = "8114848843";

const courses = [
  {
    id: 1,
    title: "Class 1-5 Foundation Program",
    filter: "school",
    category: "School",
    level: "Primary",
    duration: "12 Months",
    fullPrice: 12000,
    emiPrice: 1000,
    description: "A fundamentals-first coaching track for Mathematics and Science with simple explanations, worksheets, and regular support.",
    highlights: ["Concept clarity", "Worksheets + revision", "Parent updates"],
    syllabus: [
      "Arithmetic and number sense foundations",
      "Basic science explanations with examples",
      "Reading-friendly guided lessons",
      "Weekly practice sheets",
      "Monthly progress discussion"
    ]
  },
  {
    id: 2,
    title: "Class 6-8 Concept Builder",
    filter: "school",
    category: "School",
    level: "Middle",
    duration: "12 Months",
    fullPrice: 14400,
    emiPrice: 1200,
    description: "Focused school coaching for Mathematics and Science designed to strengthen conceptual understanding and testing confidence.",
    highlights: ["Doubt sessions", "Chapter tests", "Steady improvement"],
    syllabus: [
      "School-aligned concept planning",
      "Mathematics and Science coaching",
      "Weekly live doubt-solving",
      "Chapter tests with review notes",
      "Performance tracking support"
    ]
  },
  {
    id: 3,
    title: "Class 9-10 Boards Accelerator",
    filter: "boards",
    category: "Boards",
    level: "Secondary",
    duration: "12 Months",
    fullPrice: 18000,
    emiPrice: 1600,
    description: "Structured board preparation with revision planning, exam pattern practice, and mentor-led support across key subjects.",
    highlights: ["Board-focused strategy", "Revision plans", "Timed practice"],
    syllabus: [
      "Board syllabus planning and coverage",
      "Solved examples and concept revision",
      "Timed practice and analysis",
      "Doubt support on WhatsApp",
      "Exam readiness checkpoints"
    ]
  },
  {
    id: 4,
    title: "Class 11-12 PCM/PCB Mentorship",
    filter: "boards",
    category: "Boards",
    level: "Senior",
    duration: "12 Months",
    fullPrice: 21600,
    emiPrice: 1900,
    description: "A disciplined mentorship track for senior students with deeper concept support, tests, and revision structure.",
    highlights: ["Senior mentoring", "Score review", "Focused revision"],
    syllabus: [
      "Subject-specific learning roadmap",
      "Advanced concept explanation sessions",
      "Practice tests and score analysis",
      "Revision support before exams",
      "Mentor-led weak area improvement"
    ]
  },
  {
    id: 5,
    title: "Career Guidance and Stream Planning",
    filter: "career",
    category: "Career",
    level: "Mentorship",
    duration: "6 Weeks",
    fullPrice: 4500,
    emiPrice: 850,
    description: "A guided counseling program for stream selection, academic planning, and clearer career direction for students and families.",
    highlights: ["Career mapping", "Parent discussion", "Action plan"],
    syllabus: [
      "Interest and strength discussion",
      "Academic stream comparison",
      "Career roadmap planning",
      "Parent and student counseling session",
      "Next-step action planning"
    ]
  },
  {
    id: 6,
    title: "IT Solutions and Digital Skills Lab",
    filter: "technology",
    category: "Technology",
    level: "Professional",
    duration: "20 Weeks",
    fullPrice: 14999,
    emiPrice: 2800,
    description: "Project-led exposure to websites, digital systems, and practical IT problem solving in a student-friendly format.",
    highlights: ["Project-based learning", "Real workflows", "Digital exposure"],
    syllabus: [
      "Digital tools and project setup",
      "Website structure and design basics",
      "Automation and workflow thinking",
      "Client-style problem solving",
      "Presentation and delivery practice"
    ]
  }
];

const courseGrid = document.getElementById("courseGrid");
const filterChips = document.querySelectorAll(".chip");
const searchInput = document.getElementById("courseSearch");
const pricingToggle = document.getElementById("pricingToggle");
const syllabusDialog = document.getElementById("syllabusDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogList = document.getElementById("dialogList");
const closeDialogBtn = document.getElementById("closeDialogBtn");
const faqItems = document.querySelectorAll(".faq-item");
const supportForm = document.getElementById("supportForm");
const exploreCoursesBtn = document.getElementById("exploreCoursesBtn");
const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
const staticWhatsAppLinks = document.querySelectorAll(".wa-link");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeFilter = "all";
let useEmi = false;

document.body.classList.add("js-ready");

function formatCurrency(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function wireStaticWhatsAppLinks() {
  staticWhatsAppLinks.forEach((link) => {
    const message = link.getAttribute("data-message") || "Hello Shree Coaching Centre, I need support.";
    link.setAttribute("href", buildWhatsAppLink(message));
  });
}

function getVisibleCourses() {
  const query = searchInput.value.trim().toLowerCase();

  return courses.filter((course) => {
    const filterMatch = activeFilter === "all" || course.filter === activeFilter;
    const searchMatch =
      query.length === 0 ||
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.highlights.some((highlight) => highlight.toLowerCase().includes(query));

    return filterMatch && searchMatch;
  });
}

function renderCourses() {
  const visibleCourses = getVisibleCourses();

  if (!visibleCourses.length) {
    courseGrid.innerHTML = `
      <article class="course-card course-empty">
        <h3>No matching programs found</h3>
        <p>Try a different keyword or switch to another category.</p>
      </article>
    `;
    return;
  }

  courseGrid.innerHTML = visibleCourses
    .map((course) => {
      const currentPrice = useEmi ? course.emiPrice : course.fullPrice;
      const billingLabel = useEmi ? "per month" : "full program fee";
      const purchaseMessage = `Hello Shree Coaching Centre, I want to enroll in "${course.title}" on ${useEmi ? "the monthly plan" : "the full payment plan"}. Please share the next steps.`;

      return `
        <article class="course-card">
          <div class="course-top">
            <div class="course-badges">
              <span class="course-chip category">${course.category}</span>
              <span class="course-chip level">${course.level}</span>
            </div>
            <span class="course-duration">${course.duration}</span>
          </div>
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <ul class="course-highlights">
            ${course.highlights.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="course-price-row">
            <span class="course-price">${formatCurrency(currentPrice)}</span>
            <span class="course-note">${billingLabel}<br />${course.duration}</span>
          </div>
          <div class="card-actions">
            <button class="syllabus-btn" data-syllabus="${course.id}">View Syllabus</button>
            <a
              class="buy-btn"
              href="${buildWhatsAppLink(purchaseMessage)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy on WhatsApp
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

function openSyllabus(courseId) {
  const selected = courses.find((course) => course.id === courseId);

  if (!selected) {
    return;
  }

  dialogTitle.textContent = `${selected.title} - Syllabus`;
  dialogList.innerHTML = selected.syllabus.map((item) => `<li>${item}</li>`).join("");
  syllabusDialog.showModal();
}

function initializeReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function animateStats() {
  const counters = document.querySelectorAll(".count");

  if (!("IntersectionObserver" in window) || prefersReducedMotion.matches) {
    counters.forEach((counter) => {
      counter.textContent = Number(counter.getAttribute("data-target")).toLocaleString("en-IN");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;
        const target = Number(element.getAttribute("data-target"));
        const duration = 1200;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          element.textContent = value.toLocaleString("en-IN");

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            element.textContent = target.toLocaleString("en-IN");
          }
        }

        requestAnimationFrame(update);
        currentObserver.unobserve(element);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setMenuState(isOpen) {
  siteNav.classList.toggle("open", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((button) => button.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderCourses();
  });
});

searchInput.addEventListener("input", renderCourses);

pricingToggle.addEventListener("click", () => {
  useEmi = !useEmi;
  pricingToggle.classList.toggle("emi", useEmi);
  pricingToggle.setAttribute("aria-pressed", String(useEmi));
  pricingToggle.setAttribute(
    "aria-label",
    useEmi ? "Switch to full pricing" : "Switch to monthly pricing"
  );
  renderCourses();
});

courseGrid.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.matches("[data-syllabus]")) {
    openSyllabus(Number(target.getAttribute("data-syllabus")));
  }
});

closeDialogBtn.addEventListener("click", () => syllabusDialog.close());

syllabusDialog.addEventListener("click", (event) => {
  const rect = syllabusDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) {
    syllabusDialog.close();
  }
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (!(question instanceof HTMLButtonElement)) {
    return;
  }

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach((entry) => {
      entry.classList.remove("open");
      const entryQuestion = entry.querySelector(".faq-question");

      if (entryQuestion instanceof HTMLButtonElement) {
        entryQuestion.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

supportForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(supportForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const topic = formData.get("topic");
  const message = formData.get("message");

  const text = `Hello Shree Coaching Centre Support,

Name: ${name}
Email: ${email}
Topic: ${topic}
Message: ${message}

Please help me with this request.`;

  window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");
  supportForm.reset();
});

exploreCoursesBtn.addEventListener("click", () => {
  document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
});

menuBtn.addEventListener("click", () => {
  setMenuState(!siteNav.classList.contains("open"));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("click", (event) => {
  if (window.innerWidth > 860) {
    return;
  }

  const target = event.target;

  if (!(target instanceof Node)) {
    return;
  }

  if (!siteNav.contains(target) && !menuBtn.contains(target)) {
    setMenuState(false);
  }
});

document.getElementById("year").textContent = String(new Date().getFullYear());

wireStaticWhatsAppLinks();
initializeReveal();
renderCourses();
animateStats();
