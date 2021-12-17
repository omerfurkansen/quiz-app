import { useNavigate } from 'react-router-dom';

const NavigateToHome = () => {
	const navigate = useNavigate();
	return <>{navigate('/')}</>;
};

export default NavigateToHome;
