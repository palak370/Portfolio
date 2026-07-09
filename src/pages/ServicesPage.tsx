import Services from '../components/Services';
import NoticeAssistant from '../components/NoticeAssistant';

interface ServicesPageProps {
  onSelectNotice: (subject: string, message: string) => void;
}

export default function ServicesPage({ onSelectNotice }: ServicesPageProps) {
  return (
    <div className="subpage-wrapper">
      <Services />
      <NoticeAssistant onSelectNotice={onSelectNotice} />
    </div>
  );
}
