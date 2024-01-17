import React, {ReactNode} from 'react';
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

type PageLayoutProps = {
    children: ReactNode
}
const PageLayout: React.FC<PageLayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default PageLayout;