import Header from './Header';
import { useEffect, useState, useContext } from 'react';
import { Progress } from 'semantic-ui-react';
import easy from '../images/easy.png';
import medium from '../images/medium.png';
import hard from '../images/hard.png';
import { useNavigate } from 'react-router-dom';
import MainContext from '../MainContext';
import shuffleArray from 'shuffle-array';

const Questions = () => {
	const { questions, amountOfWrongAnswers, setAmountOfWrongAnswers } =
		useContext(MainContext);

	const navigate = useNavigate();

	const [questionIndex, setQuestionIndex] = useState(0);
	const [allChoices, setAllChoices] = useState([]);
	const [clicked, setClicked] = useState(false);

	const toggleNextQuestion = () => {
		setQuestionIndex(questionIndex + 1);
	};

	const increaseWrong = (answer) => {
		questions[questionIndex].incorrect_answers.includes(answer) &&
			setAmountOfWrongAnswers(amountOfWrongAnswers + 1);
	};

	const isWrong = (answer) => {
		return (
			clicked && questions[questionIndex].incorrect_answers.includes(answer)
		);
	};

	useEffect(() => {
		questionIndex !== questions.length &&
			setAllChoices(
				shuffleArray([
					...questions[questionIndex].incorrect_answers,
					questions[questionIndex].correct_answer,
				])
			);
	}, [questionIndex, questions]);

	useEffect(() => {
		clicked &&
			setTimeout(() => {
				setClicked(false);
				toggleNextQuestion();
			}, 2000);
	}, [clicked]);

	return (
		<>
			{questions.length ? (
				<div className="main-box">
					{(window.onbeforeunload = () => '')}
					<Header />
					{questionIndex !== questions.length ? (
						<div className="question-box">
							<div id="top-part">
								<div id="question-number-background">
									<div id="question-number">
										{questionIndex + 1} / {questions.length}
									</div>
								</div>

								<span id="category">
									<p id="font-cat">CATEGORY</p>
									<p>{decodeURIComponent(questions[questionIndex].category)}</p>
								</span>
								<span id="difficulty">
									{(questions[questionIndex].difficulty === 'easy' && (
										<img className="image" src={easy} alt="easy" />
									)) ||
										(questions[questionIndex].difficulty === 'medium' && (
											<img className="image" src={medium} alt="medium" />
										)) ||
										(questions[questionIndex].difficulty === 'hard' && (
											<img className="image" src={hard} alt="hard" />
										))}
								</span>
							</div>
							<span id="question">
								<p>{decodeURIComponent(questions[questionIndex].question)}</p>
							</span>
							<div id="choices">
								{allChoices.map((choice, index) => (
									<button
										className={
											isWrong(choice)
												? `choice n${index} wrong`
												: `choice n${index}`
										}
										key={index}
										onClick={() => {
											!clicked && increaseWrong(choice);
											setClicked(true);
										}}
									>
										{decodeURIComponent(choice)}
									</button>
								))}
							</div>

							<Progress
								id="progress"
								percent={(questionIndex / questions.length) * 100}
								active
								size="tiny"
								color="green"
							/>
						</div>
					) : (
						navigate('/result')
					)}
				</div>
			) : (
				navigate('/')
			)}
		</>
	);
};

export default Questions;
