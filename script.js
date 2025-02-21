document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const options = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
