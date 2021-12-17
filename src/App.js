import Entrance from './components/Entrance';
import Questions from './components/Questions';
import Result from './components/Result';
import NavigateToHome from './components/NavigateToHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainContext from './MainContext';

function App() {
	const [questions, setQuestions] = useState([]);
	const [token, setToken] = useState('');
	const [amountOfWrongAnswers, setAmountOfWrongAnswers] = useState(0);
	const [previousScores, setPreviousScores] = useState(
		JSON.parse(localStorage.getItem('previousScores')) || []
	);

	const data = {
		questions,
		setQuestions,
		token,
		amountOfWrongAnswers,
		setAmountOfWrongAnswers,
		previousScores,
		setPreviousScores,
	};

	useEffect(() => {
		axios
			.get('https://opentdb.com/api_token.php?command=request')
			.then((response) => setToken(response.data.token))
			.catch((err) => {
				alert(
					'An unexpected error occurred. \nCheck your internet connection please...'
				);
				console.log(err);
			});
	}, [token]);

	return (
		<>
			<MainContext.Provider value={data}>
				<Router>
					<Routes>
						<Route path="/" element={<Entrance />} />
						<Route path="questions" element={<Questions />} />
						<Route path="result" element={<Result />} />
						<Route path="*" element={<NavigateToHome />} />
					</Routes>
				</Router>
			</MainContext.Provider>
		</>
	);
}

export default App;
