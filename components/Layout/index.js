import {Header} from "./Header";
export const Layout =  ({children}) => {
    return (
            <div>
                <Header title='YuHuaBlog'/>
                <div>{children}</div>
            </div>

    )
}