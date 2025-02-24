import Image from "next/image";
import loader from './assets/loader.gif'

function LoadingPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100vh', width: '100vw' }}>
            <Image src={loader} height={150} width={150} alt='Loading...' />
        </div>
    );
}

export default LoadingPage;