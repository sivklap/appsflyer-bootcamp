//##########################
import RegistrationForm from '../components/RegistrationForm';
import './MentorRegistrationPage.css';

export default function MentorRegistrationPage() {
  return (
    <div className="registration-page">
      <RegistrationForm type="mentor" />
    </div>
  );
}
