import Header from './Header';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import excellent from '../images/excellent.gif';
import goodJob from '../images/goodjob.gif';
import notEnough from '../images/notenough.gif';
import sad from '../images/sad.gif';
import MainContext from '../MainContext';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const Result = () => {
	const {
		questions,
		setQuestions,
		amountOfWrongAnswers,
		setAmountOfWrongAnswers,
		previousScores,
		setPreviousScores,
	} = useContext(MainContext);

	const navigate = useNavigate();

	const [percentageOfWrongAnswers] = useState(
		(amountOfWrongAnswers / questions.length) * 100
	);

	const [amountOfCorrectAnswers] = useState(
		questions.length - amountOfWrongAnswers
	);

	const [score] = useState((100 - percentageOfWrongAnswers) / 10);

	useEffect(() => {
		(score || amountOfWrongAnswers === questions.length) &&
			setPreviousScores([...previousScores, score]);
	}, []);

	useEffect(() => {
		localStorage.setItem('previousScores', JSON.stringify(previousScores));
	}, [previousScores]);

	return (
		<>
			{questions.length || score ? (
				<div className="main-box">
					{(window.onbeforeunload = null)}
					<Header />
					<div className="feed">
						<span id="score-box">Your score is {score} out of 10.</span>
						<span id="correct-box">
							{amountOfCorrectAnswers === 0 ? `None` : amountOfCorrectAnswers}{' '}
							of your answers are correct.
						</span>
						<div className="gif-box">
							{(percentageOfWrongAnswers <= 100 &&
								percentageOfWrongAnswers >= 70 && (
									<img className="gif" src={sad} alt="sad" />
								)) ||
								(percentageOfWrongAnswers < 70 &&
									percentageOfWrongAnswers > 50 && (
										<img className="gif" src={notEnough} alt="notEnough" />
									)) ||
								(percentageOfWrongAnswers <= 50 &&
									percentageOfWrongAnswers > 0 && (
										<img className="gif" src={goodJob} alt="goodJob" />
									)) ||
								(percentageOfWrongAnswers === 0 && (
									<img className="gif" src={excellent} alt="excellent" />
								))}
						</div>
						<button
							id="play-again"
							onClick={() => {
								setQuestions([]);
								setAmountOfWrongAnswers(0);
								navigate('/');
							}}
						>
							PLAY AGAIN
						</button>
						<div className="share">
							<span id="txt-share">SHARE:</span>
							<div id="share-btns">
								<FacebookShareButton
									className="btn-share fb"
									url={window.location.hostname}
									quote={`I got ${score} out of 10... Try to beat me!`}
								>
									<FaFacebookF />
								</FacebookShareButton>
								<TwitterShareButton
									className="btn-share tw"
									url={window.location.hostname}
									title={`I got ${score} out of 10... Try to beat me!`}
								>
									<FaTwitter />
								</TwitterShareButton>
							</div>
						</div>
					</div>
				</div>
			) : (
				navigate('/')
			)}
		</>
	);
};

export default Result;
