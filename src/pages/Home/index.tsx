import { h } from 'preact';
import { useState } from 'preact/hooks';
import './style.css';
import { Button } from '@/components/button/Button';

export function Home() {
	const apiUrl = import.meta.env.VITE_API_URL;

	const [theme, setTheme] = useState(false);
	const [font, setfont] = useState('serif');
	const [word, setWord] = useState('');
	const [wordMeaning, setWordMeaning] = useState([]);

	const toggleTheme = () => {
		setTheme(prevTheme => !prevTheme);
	};

	const handleInputChange = (e: any) => {
		setWord(e.target.value);
	};

	const fetchData = () => {
		fetch(`${apiUrl}/${word}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setWordMeaning(data);
			});
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
					<pre>{JSON.stringify(wordMeaning, null, 2)}</pre>
				</div>

			</div>
		</div>
	);
}