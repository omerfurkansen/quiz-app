import { useContext, useState } from 'react';
import MainContext from '../MainContext';
import logo from '../images/logo.png';
import { Modal } from 'semantic-ui-react';
import { GoLogoGithub } from 'react-icons/go';

const Header = () => {
	const { previousScores } = useContext(MainContext);

	const [showPreviousScores, setShowPrev] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<div className="header">
			<Modal
				dimmer="blurring"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				size="tiny"
				trigger={<button>ABOUT</button>}
			>
				<Modal.Content>
					<p>
						This web application is created to improve general knowledge and
						have fun while playing it. The questions have taken from
						<a href="https://opentdb.com" target="_blank" rel="noreferrer">
							{' '}
							Open Trivia Database
						</a>
						. Some questions have 4 multiple choices and some just have 2
						choices which are true and false. You can see your previous scores,
						beyond you can share your result with your friend!
					</p>
					<p style={{ display: 'flex', alignItems: 'center' }}>
						<em>
							This web application is created by{' '}
							<a
								href="https://github.com/omerfurkansen"
								target="_blank"
								rel="noreferrer"
							>
								Ömer Furkan
							</a>
						</em>
						.
						<GoLogoGithub
							style={{ marginLeft: '0.5em', height: 20, width: 20 }}
						/>
					</p>
				</Modal.Content>
			</Modal>
			<a href="/">
				<div className="logo-background">
					<img className="logo" src={logo} alt="logo" />
				</div>
			</a>
			<button
				id="btn-prev-scores"
				onClick={() => setShowPrev(!showPreviousScores)}
			>
				PREVIOUS SCORES
			</button>
			{showPreviousScores && (
				<div id="show-prev-scores">
					{previousScores.length ? (
						previousScores
							.slice(0)
							.reverse()
							.map((score, index) => (
								<span key={index}>
									{index + 1}. <b>{score}/10</b>
								</span>
							))
					) : (
						<span>NO SCORE YET</span>
					)}
				</div>
			)}
		</div>
	);
};

export default Header;
