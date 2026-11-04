import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { personal, PLACEHOLDER } from '../data/content';
import { GitHubIcon, LinkedInIcon } from './Icons';
import Reveal from './Reveal';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * No backend is configured, so the form opens the visitor's own email client
 * with the message pre-filled. Nothing is stored or sent by this website itself.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');

  const update = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please add your name and a message.');
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError('Please enter a valid email address so I can reply.');
      return;
    }
    setError('');
    const subject = encodeURIComponent(form.subject.trim() || 'Message from portfolio');
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="container">
        <Reveal>
          <p className="eyebrow">07 · Contact</p>
          <h2 className="section-title">
            Have an idea? <span className="gradient-text">Let's create something.</span>
          </h2>
          <p className="section-lead">
            I'm always interested in learning, collaborating, exploring new ideas, and working on meaningful projects.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="glass contact-info">
            <div className="link-row">
              <Mail size={18} aria-hidden="true" />
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </div>
            <div className="link-row">
              <LinkedInIcon />
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn profile
              </a>
            </div>
            <div className="link-row">
              <GitHubIcon />
              {personal.github === PLACEHOLDER ? (
                <span className="placeholder-tag">GitHub link to be added</span>
              ) : (
                <a href={personal.github} target="_blank" rel="noopener noreferrer">
                  GitHub profile
                </a>
              )}
            </div>
            <p style={{ marginTop: 18, fontSize: '0.9rem' }}>Based in {personal.location}.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="glass contact-form" onSubmit={onSubmit} noValidate>
              <label>
                Name
                <input type="text" name="name" autoComplete="name" value={form.name} onChange={update('name')} required />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" value={form.email} onChange={update('email')} required />
              </label>
              <label>
                Subject
                <input type="text" name="subject" value={form.subject} onChange={update('subject')} />
              </label>
              <label>
                Message
                <textarea name="message" value={form.message} onChange={update('message')} required />
              </label>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <p className="form-hint">This opens your email app with the message ready to send. Nothing is stored on this website.</p>
              <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
