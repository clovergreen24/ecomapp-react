
const BackButton = ({text}: {text: string}) =>  {
    return (
        <button
				className="bg-pink-300 text-pink-600 font-semibold items-center mx-5"
				onClick={() => history.back()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					className="w-6 h-6 fill-current pb-1 text-pink-700 inline-block"
					clipRule="evenodd"
					fillRule="evenodd"
					strokeLinejoin="round"
					strokeMiterlimit="2"
				>
					<path
						d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z"
						fillRule="nonzero"
					/>
				</svg>
				{text}
			</button>
    )
}

export default BackButton;