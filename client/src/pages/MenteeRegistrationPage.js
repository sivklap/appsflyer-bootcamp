import RegistrationForm from '../components/RegistrationForm';
import './MenteeRegistrationPage.css';

export default function MenteeRegistrationPage() {
  return (
    <div className="registration-page">
      <RegistrationForm type="mentee" />
    </div>
  );
}