import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<title>Studyhub LMS & University NextJS Template</title>
				<meta name="author" content="themewant" />
				<meta name="description" content="StudyHub is a comprehensive educational platform designed to cater to the needs of both students and educators alike. This versatile template offers a range of features suitable for universities, colleges, and online learning platforms. Built with Bootstrap and Gulp, StudyHub combines robust functionality with a sleek, modern design to create an immersive learning experience." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/fav.png" />
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
