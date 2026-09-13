const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitButton = form.querySelector('button[type="submit"]');
let sending = false;

function setStatus(message, state = "") {
    status.textContent = message;
    status.dataset.state = state;
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (sending) return;
    if (!form.reportValidity()) return;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        setStatus("Please fill out all fields.", "error");
        return;
    }
    if (!window.emailjs) {
        setStatus("The email service could not load. Please refresh the page and try again. Your message has not been sent.", "error");
        return;
    }

    sending = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    form.setAttribute("aria-busy", "true");
    setStatus("Sending your message…");

    try {
        window.emailjs.init("kRaRtU310AHVw_Tyv");
        await window.emailjs.send("service_zehzb4c", "template_a0pwt5v", {
            from_name: name,
            reply_to: email,
            message: message
        });
        setStatus("Message sent successfully!", "success");
        form.reset();
    } catch (error) {
        setStatus("Your message could not be sent. Please try again. Your text has been kept below.", "error");
    } finally {
        sending = false;
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        form.removeAttribute("aria-busy");
    }
});
