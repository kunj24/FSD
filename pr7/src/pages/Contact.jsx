import React from "react";
import "../App.css";

export default function Contact() {
  return (
    <section id="contact" className="page page-contact">
      <h2>Contact</h2>
      <p>You can reach out via email at <a href="mailto:example@example.com">example@example.com</a>.</p>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Message
          <textarea name="message" />
        </label>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
