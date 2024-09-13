export function NotFound() {
	return (
		<section class="w-full md:h-screen h-auto flex md:flex-row flex-col items-center justify-center">
			<div class="flex md:w-1/2 w-full min-h-full flex-col justify-between bg-white">
				<div class="text-left p-10">
					<a href="/">
						<img src="/tail.svg" alt="" class='w-12 h-12 mb-24' />
					</a>
					<p class="text-base font-semibold text-indigo-600">404</p>
					<h1 class="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
					<p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
					<div class="mt-10 flex items-center justify-start gap-x-6">
						<a href="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
						<a href="/contact" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
					</div>
				</div>
				<div class='bg-[#f9fafb] h-20 bottom-0 border-t border-t-[#e5e7eb] flex items-center justify-start gap-8 px-10 text-[#4b5563]'>
					<a href="/contact">Contact Support</a>
					<a href="/contact">Status</a>
				</div>
			</div>
			<img src={'/404.jpeg'} alt={''} class='md:w-1/2 h-full object-cover' />
		</section>
	);
}
