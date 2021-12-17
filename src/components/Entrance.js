import Header from './Header';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import hello from '../images/hello.gif';
import MainContext from '../MainContext';
import { Button } from 'semantic-ui-react';

const Entrance = () => {
	const { questions, setQuestions, token } = useContext(MainContext);

	const navigate = useNavigate();
	const [numberOfQuestions, setNumberOfQuestions] = useState('10');
	const [selectedOtherOption, setSelectedOtherOpen] = useState(false);

	useEffect(() => {
		questions.length && navigate('/questions');
	}, [questions, navigate]);

	const getTheData = async () => {
		await axios
			.get(
				`https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}&encode=url3986`
			)
			.then((response) => setQuestions(response.data.results))
			.catch((err) => {
				alert(
					'An unexpected error occurred. \nCheck your internet connection please...'
				);
				console.log(err);
			});
	};

	return (
		<div className="main-box">
			<Header />
			<div className="feed">
				<div className="gif-box">
					<img className="gif" src={hello} alt="hello" />
				</div>
				<p id="entry">Answer the questions and see your score at the end!</p>
				<div className="number-of-questions">
					<label>Number of Questions</label>
					<Button.Group
						size="mini"
						onClick={(e) => setNumberOfQuestions(e.target.value)}
					>
						{selectedOtherOption ? (
							<Button
								className="btn-sel"
								value="10"
								content="10"
								onClick={() => setSelectedOtherOpen(false)}
							/>
						) : (
							<Button className="btn-sel" value="10" content="10" active />
						)}
						<Button.Or />
						<Button
							className="btn-sel"
							value="20"
							content="20"
							onClick={() => setSelectedOtherOpen(true)}
						/>
						<Button.Or />
						<Button
							className="btn-sel"
							value="50"
							content="50"
							onClick={() => setSelectedOtherOpen(true)}
						/>
					</Button.Group>
				</div>
				<button className="start" onClick={getTheData}>
					START
				</button>
			</div>
		</div>
	);
};

export default Entrance;
