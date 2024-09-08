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
									<div class='flex flex-row items-center justify-between'>
										<div class='flex flex-col gap-4 w-auto'>
											<h2 class='text-5xl font-bold'>{item.word}</h2>
											<p class='text-[#A345ED] font-normal text-xl'>{item.phonetic}</p>
										</div>
										<div>
											{item.phonetics.map((phonetic, index) => (
												phonetic.audio ? (
													<div key={index}>
														<img
															src="/icon-play.svg"
															alt="Play Audio"
															style={{ cursor: 'pointer' }}
															onClick={() => handlePlayAudio(phonetic.audio)}
														/>
														{playingAudio === phonetic.audio && (
															<audio class='hidden' controls autoPlay>
																<source src={phonetic.audio} type="audio/mpeg" />
																Your browser does not support the audio element.
															</audio>
														)}
													</div>
												) : null
											))}
										</div>
									</div>
									<div>
										{item.meanings.map((meaning, index) => (
											<div key={index}>
												<div class='w-full h-auto py-10 flex flex-row items-center gap-4'>
													<p class='font-bold text-xl'>{meaning.partOfSpeech}</p>
													<hr class='w-full' />
												</div>
												<div class='text-[#676767] mb-4'>Meanings: </div>
												{meaning.definitions.map((definition, defIndex) => (
													<div key={defIndex}>
														<p> <span class='text-[#A345ED] px-4'>&#8226;</span> {definition.definition}</p>
														{definition.example && <p>Example: {definition.example}</p>}
													</div>
												))}
											</div>
										))}
									</div>

									<div class='py-10'>
										<hr />
									</div>


									<div class='flex flex-row'>
										<h3 class='mr-6'>Source</h3>
										{item.sourceUrls.map((url, index) => (
											<p key={index} class='mr-2 underline'>
												<a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
											</p>
										))}
										<img src="/icon-new-window.svg" alt="new window" class='w-4 h-4' />
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