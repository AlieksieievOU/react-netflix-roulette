import '../src/App.scss';

//👇 Import Open Sans font
import {Montserrat} from 'next/font/google'
import MovieListPage from "../components/MovieListPage/MovieListPage";
import Header from "../components/Header/Header";

//👇 Configure our font object
const montSerrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    title: 'Netflix Roulette',
    description: 'Web site created with Next.js.',
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className={montSerrat.className}>
        <body>
        <div id="root" className={"App"}>
            {children}
        </div>
        </body>
        </html>
    )
}
