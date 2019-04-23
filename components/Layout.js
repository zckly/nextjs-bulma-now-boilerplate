import style from '../styles/style.scss'
import Head from 'next/head'

const Layout = function (props) {
    return (
        <div>
            <Head>
            <title>Heatseeker</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <style dangerouslySetInnerHTML={{ __html: style }} />
            {props.children}
        
        
      </div>
    )
}
export default Layout