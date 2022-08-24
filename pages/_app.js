import 'styles/globals.css'
import 'styles/tailwind.css'
import 'styles/docs/tree.css'
import 'antd/dist/antd.css';
import {Layout} from "components/Layout";
import { Toaster } from 'react-hot-toast';


function MyApp({ Component, pageProps }) {
  return <>
    <Layout>
      <Component  {...pageProps} />
    </Layout>
    <Toaster />
  </>

}

export default MyApp
