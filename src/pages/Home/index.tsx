import { useState } from 'preact/hooks';
import './style.css';
import { Button } from '@/components/button/Button';
import { data } from './data';

export function Home() {
	const apiUrl = import.meta.env.VITE_API_URL;

	const [theme, setTheme] = useState(false);
	const [font, setfont] = useState('serif');
	const [word, setWord] = useState('');
	const [wordMeaning, setWordMeaning] = useState([]);

	const [playingAudio, setPlayingAudio] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const toggleTheme = () => {
		setTheme(prevTheme => !prevTheme);
	};

	const handleInputChange = (e: any) => {
		setWord(e.target.value);
	};

	const fetchData = () => {
		fetch(`${apiUrl}/${word}`)
			.then((res) => {
				if (!res.ok) {
					if (res.status === 404) {
						setIsError(!isError);
						throw new Error('Word not found (404)');
					}
					throw new Error(`Error: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				setIsError(false);
				setWordMeaning(data);
			});
	};

	const handlePlayAudio = (audio: string) => {
		setPlayingAudio(audio);
	};

	return (
		<div class={`flex flex-col items-center w-full min-h-screen py-14 ${theme ? 'bg-black text-white' : 'bg-white text-black'} ${font === 'serif' && 'serif'} ${font === 'sans' && 'sans'} ${font === 'mono' && 'mono'}`}>
			<div class='w-1/2 h-auto flex flex-col items-start justify-start'>

				{/* Navbar is placed here */}
				<nav class='w-full h-auto flex flex-row justify-between mb-14'>

					<img src='/logo.svg' alt='' class='w-8 h-8' />

					<div class='flex flex-row gap-2 items-center justify-center'>

						<select name="font" id="font" class={`${theme ? 'bg-black text-white' : 'bg-white text-black'} outline-none`} onChange={(e: any) => setfont(e.target.value)}>
							<option value="serif" class='px-3 border-r border-r-[#cfcfcf]'>Serif</option>
							<option value="sans" class='px-3 border-r border-r-[#cfcfcf]'>Sans Serif</option>
							<option value="mono" class='px-3 border-r border-r-[#cfcfcf]'>Mono</option>
						</select>

						<Button theme={theme} toggleTheme={toggleTheme} />

						<img src="/icon-moon.svg" alt="moon icon" />
					</div>

				</nav>

				<div class='w-full h-auto relative mb-14'>
					<input
						type="text"
						class={`w-full h-16 rounded-2xl ${theme ? 'bg-[#1F1F1F]' : 'bg-[#F4F4F4]'} outline-none indent-6 text-xl font-semibold`} onChange={handleInputChange}
					/>
					<img src="/icon-search.svg" alt="" class='absolute right-6 top-6 cursor-pointer' onClick={fetchData} />
				</div>

				<div className='my-4'>
					{wordMeaning.length > 0 ? (
						<pre>{JSON.stringify(wordMeaning, null, 2)}</pre>
					) : (
						<div>
							{data.map(item => (
								<div key={item.word}>
									<h2>Word: {item.word}</h2>
									<p>Phonetic: {item.phonetic}</p>
									<div>
										<h3>Phonetics:</h3>
										{item.phonetics.map((phonetic, index) => (
											phonetic.audio ? (
												<div key={index}>
													<p>Text: {phonetic.text}</p>
													<img
														src="/icon-play.svg"
														alt="Play Audio"
														style={{ cursor: 'pointer' }}
														onClick={() => handlePlayAudio(phonetic.audio)}
													/>
													{playingAudio === phonetic.audio && (
														<audio controls autoPlay>
															<source src={phonetic.audio} type="audio/mpeg" />
															Your browser does not support the audio element.
														</audio>
													)}
												</div>
											) : null
										))}
									</div>
									<div>
										<h3>Meanings:</h3>
										{item.meanings.map((meaning, index) => (
											<div key={index}>
												<p>Part of Speech: {meaning.partOfSpeech}</p>
												{meaning.definitions.map((definition, defIndex) => (
													<div key={defIndex}>
														<p>Definition: {definition.definition}</p>
														{definition.example && <p>Example: {definition.example}</p>}
													</div>
												))}
											</div>
										))}
									</div>
									<div>
										<h3>License:</h3>
										<p>
											<a href={item.license.url} target="_blank" rel="noopener noreferrer">{item.license.name}</a>
										</p>
									</div>
									<div>
										<h3>Source URLs:</h3>
										{item.sourceUrls.map((url, index) => (
											<p key={index}>
												<a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
											</p>
										))}
									</div>
								</div>
							))}
						</div>
					)}
					{isError && (
						<div>No meaning found!</div>
					)}
				</div>

			</div>
		</div>
	);
}