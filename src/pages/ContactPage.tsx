import Contact from '../components/Contact';

interface ContactPageProps {
  prefilledSubject: string;
  prefilledMessage: string;
}

export default function ContactPage({ prefilledSubject, prefilledMessage }: ContactPageProps) {
  return (
    <div className="subpage-wrapper">
      <Contact prefilledSubject={prefilledSubject} prefilledMessage={prefilledMessage} />
    </div>
  );
}
